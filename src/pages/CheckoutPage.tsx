import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { PAKISTANI_CITIES, PAKISTANI_PROVINCES, STORE_PHONE, STORE_WHATSAPP } from '../data/mockData';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Button } from '../components/common/Button';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Banknote,
  Smartphone,
  MessageSquare,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  Info,
  AlertCircle
} from 'lucide-react';
import { Order, PaymentMethod } from '../types';
import { orderService } from '../services/orderService';
import { isSupabaseConfigured } from '../lib/supabase';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, shippingFee, discount, grandTotal, clearCart } = useCart();
  const { navigate } = useRouter();

  // Form states matching Pakistani ecommerce checkout requirements
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Karachi'); // City default: Karachi
  const [province, setProvince] = useState('Sindh');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment methods: Cash on Delivery, JazzCash, Easypaisa
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');

  // Mobile payment fields for JazzCash & Easypaisa
  const [senderMobile, setSenderMobile] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen px-4 py-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-neutral-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-brand text-2xl text-neutral-900 font-medium">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-neutral-500">
            Please add garments to your bag before proceeding to checkout.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/shop')}>
            Return to Shop
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');
    setFormError(null);

    if (!fullName.trim() || !mobileNumber.trim() || !completeAddress.trim() || !area.trim()) {
      setFormError('Please complete all required fields (Full Name, Mobile Number, Complete Address, and Area).');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    // Validation for digital wallet payments without pretending automated debit
    if (paymentMethod !== 'Cash on Delivery') {
      if (!senderMobile.trim() || !transactionId.trim()) {
        const msg = `Please provide your ${paymentMethod} sender mobile number and Transaction ID (TID) after transferring funds.`;
        setPaymentError(msg);
        setFormError(msg);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Create order safely in Supabase (orders + order_items tables)
      const newOrder = await orderService.createOrder({
        shippingAddress: {
          fullName: fullName.trim(),
          phone: mobileNumber.trim(),
          email: email.trim(),
          completeAddress: completeAddress.trim(),
          area: area.trim(),
          city,
          province,
          postalCode: postalCode.trim(),
          orderNotes: orderNotes.trim()
        },
        items: [...items],
        subtotal,
        deliveryFee: shippingFee,
        discount,
        total: grandTotal,
        paymentMethod,
        paymentDetails:
          paymentMethod !== 'Cash on Delivery'
            ? {
                mobileAccount: senderMobile.trim(),
                transactionId: transactionId.trim()
              }
            : undefined
      });

      clearCart();
      setOrderComplete(newOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setFormError(
        err?.message ||
          `Failed to record your order in the atelier database. Please verify your internet connection or reach our atelier WhatsApp directly at ${STORE_PHONE}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ORDER CONFIRMATION SCREEN
  if (orderComplete) {
    const confirmationWhatsAppMessage = encodeURIComponent(
      `Hello ELIXIR Atelier,
I have placed Order #${orderComplete.id}.
Customer: ${orderComplete.shippingAddress.fullName}
Phone: ${orderComplete.shippingAddress.phone}
Total: PKR ${orderComplete.total.toLocaleString()}
Payment Method: ${orderComplete.paymentMethod}${
        orderComplete.paymentDetails?.transactionId
          ? ` (TID: ${orderComplete.paymentDetails.transactionId})`
          : ''
      }
Destination: ${orderComplete.shippingAddress.area}, ${orderComplete.shippingAddress.city}, ${orderComplete.shippingAddress.province}
Please confirm dispatch schedule.`
    );

    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex items-center justify-center bg-stone-50/60">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-lg space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-stone-100">
            <span className="font-brand tracking-[0.25em] text-xs uppercase font-bold text-neutral-400 block">
              ELIXIR
            </span>
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto my-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="font-brand text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              ORDER CONFIRMED
            </h1>
            <p className="text-xs text-neutral-500">
              Thank you for choosing ELIXIR. Your order has been registered in our atelier system.
            </p>
          </div>

          {/* Key Order Meta Card */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/70">
              <div>
                <span className="text-neutral-400 uppercase text-[10px] tracking-wider font-semibold block">
                  Order Number
                </span>
                <span className="font-brand text-lg font-bold text-neutral-900 tracking-wide">
                  {orderComplete.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 uppercase text-[10px] tracking-wider font-semibold block">
                  Order Date &amp; Status
                </span>
                <span className="font-semibold text-neutral-800">
                  {orderComplete.date} ·{' '}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      orderComplete.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {orderComplete.status}
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase tracking-wider block font-medium">
                  Customer Name
                </span>
                <span className="font-semibold text-neutral-900 text-xs">
                  {orderComplete.shippingAddress.fullName}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase tracking-wider block font-medium">
                  Phone Number
                </span>
                <span className="font-semibold text-neutral-900 text-xs">
                  {orderComplete.shippingAddress.phone}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-neutral-400 text-[10px] uppercase tracking-wider block font-medium">
                  Delivery Address
                </span>
                <span className="font-medium text-neutral-800 text-xs leading-relaxed">
                  {orderComplete.shippingAddress.completeAddress}, {orderComplete.shippingAddress.area},{' '}
                  {orderComplete.shippingAddress.city}, {orderComplete.shippingAddress.province}{' '}
                  {orderComplete.shippingAddress.postalCode && `(${orderComplete.shippingAddress.postalCode})`}
                </span>
                {orderComplete.shippingAddress.orderNotes && (
                  <p className="text-[11px] text-neutral-500 mt-1 italic">
                    Note: &ldquo;{orderComplete.shippingAddress.orderNotes}&rdquo;
                  </p>
                )}
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase tracking-wider block font-medium">
                    Payment Method
                  </span>
                  <span className="font-bold text-neutral-900 text-xs">
                    {orderComplete.paymentMethod}
                  </span>
                </div>
                {orderComplete.paymentDetails?.transactionId && (
                  <div className="text-right">
                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider block font-medium">
                      Provided Transaction ID
                    </span>
                    <span className="font-mono font-semibold text-neutral-800 text-xs">
                      {orderComplete.paymentDetails.transactionId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Ordered */}
          <div className="space-y-3">
            <h3 className="font-brand text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Ordered Products ({orderComplete.items.length})
            </h3>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl p-3 bg-white space-y-2">
              {orderComplete.items.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-neutral-900 text-xs truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      Size: <strong className="text-neutral-800">{item.size}</strong> · Color:{' '}
                      <strong className="text-neutral-800">{item.color}</strong> · Qty:{' '}
                      <strong className="text-neutral-800">{item.quantity}</strong>
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      ₨ {item.product.price.toLocaleString()} each
                    </p>
                  </div>
                  <div className="text-right font-bold text-xs text-neutral-900 tabular-nums">
                    ₨ {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 tabular-nums">
                ₨ {orderComplete.subtotal.toLocaleString()}
              </span>
            </div>

            {orderComplete.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Voucher Discount</span>
                <span className="tabular-nums">- ₨ {orderComplete.discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee (Pakistan Express)</span>
              <span className="font-medium text-neutral-900">
                {orderComplete.shippingFee === 0 ? (
                  <span className="text-emerald-700 font-semibold">Complimentary (₨ 0)</span>
                ) : (
                  `₨ ${orderComplete.shippingFee.toLocaleString()}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-stone-200">
              <span>Grand Total</span>
              <span className="tabular-nums font-brand text-base">
                ₨ {orderComplete.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Required Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* VIEW ORDER button */}
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => navigate(`/orders?highlight=${orderComplete.id}`)}
              >
                VIEW ORDER
              </Button>

              {/* CONTINUE SHOPPING button */}
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => navigate('/shop')}
              >
                CONTINUE SHOPPING
              </Button>
            </div>

            {/* CONTACT ON WHATSAPP button (Use 03112989025) */}
            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=${confirmationWhatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>CONTACT ON WHATSAPP ({STORE_PHONE})</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM SCREEN
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-14 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-4 border-b border-stone-200">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
            ELIXIR Checkout
          </span>
          <h1 className="font-brand text-3xl sm:text-4xl text-neutral-900 font-medium mt-1">
            Shipping &amp; Payment
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Deliveries dispatched across Pakistan via secure express courier.
          </p>
        </div>

        {/* 2-Column: Left Form, Right Order Summary */}
        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-8">
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-3xl text-xs text-red-800 space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{formError}</p>
                    <p className="text-[11px] text-red-600">
                      Need help checking out?{' '}
                      <a
                        href={`https://wa.me/${STORE_WHATSAPP}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold"
                      >
                        WhatsApp Atelier Concierge ({STORE_PHONE})
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Customer Contact & Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <Truck className="w-5 h-5 text-neutral-900" />
                <h3 className="font-brand text-lg font-semibold text-neutral-900">
                  1. Delivery Information (Pakistan)
                </h3>
              </div>

              {/* Full Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Khan"
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                  <span className="text-[10px] text-neutral-400 block">
                    Courier rider will call this number before delivery
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              {/* Complete Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Complete Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={completeAddress}
                  onChange={(e) => setCompleteAddress(e.target.value)}
                  placeholder="House / Flat No., Street, Building name"
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              {/* Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Area / Sector / Phase <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. DHA Phase 6, Clifton Block 4, Gulberg III, F-7/2"
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              {/* City & Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City (default: Karachi) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 cursor-pointer font-medium"
                  >
                    {PAKISTANI_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Province options: Sindh, Punjab, Balochistan, Khyber Pakhtunkhwa, Islamabad Capital Territory, Gilgit-Baltistan, Azad Kashmir */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 cursor-pointer font-medium"
                  >
                    {PAKISTANI_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Postal Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 75500"
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              {/* Order Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Order Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special tailoring notes, preferred delivery time, landmark near your location..."
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* Step 2: Payment Methods (Cash on Delivery, JazzCash, Easypaisa) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <ShieldCheck className="w-5 h-5 text-neutral-900" />
                <h3 className="font-brand text-lg font-semibold text-neutral-900">
                  2. Payment Method
                </h3>
              </div>

              {paymentError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {paymentError}
                </div>
              )}

              <div className="space-y-3">
                {/* 1. Cash on Delivery */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-neutral-900 bg-stone-50/80 ring-1 ring-neutral-900'
                      : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="mt-1 text-neutral-900 focus:ring-neutral-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-neutral-900">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                        Most Popular in Pakistan
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Pay cash to the TCS / Leopards courier rider when receiving the package. Inspect your garments at your doorstep before payment.
                    </p>
                  </div>
                </label>

                {/* 2. JazzCash */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'JazzCash'
                      ? 'border-neutral-900 bg-stone-50/80 ring-1 ring-neutral-900'
                      : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="JazzCash"
                    checked={paymentMethod === 'JazzCash'}
                    onChange={() => setPaymentMethod('JazzCash')}
                    className="mt-1 text-neutral-900 focus:ring-neutral-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-neutral-900">
                          JazzCash Mobile Account
                        </span>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded-full">
                        Instant Mobile Wallet
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Transfer directly from your JazzCash wallet. Enter your TID below after sending.
                    </p>

                    {/* JazzCash Instructions & Inputs */}
                    {paymentMethod === 'JazzCash' && (
                      <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-200 text-xs space-y-3">
                        <div className="flex items-start gap-2 text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                          <Info className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 text-[11px]">
                            <p><strong>JazzCash Account Number:</strong> {STORE_PHONE}</p>
                            <p><strong>Account Title:</strong> ELIXIR ATELIER</p>
                            <p className="text-neutral-500">
                              Send <strong>₨ {grandTotal.toLocaleString()}</strong> using the JazzCash App or *786#.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-neutral-800">
                              Your JazzCash Mobile No. <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={senderMobile}
                              onChange={(e) => setSenderMobile(e.target.value)}
                              placeholder="0300-XXXXXXX"
                              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-neutral-800">
                              Transaction ID (TID) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              placeholder="e.g. 02938475910"
                              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 font-mono"
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-400">
                          Note: Orders are set to Pending status until verified by our Karachi atelier finance desk.
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* 3. Easypaisa */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Easypaisa'
                      ? 'border-neutral-900 bg-stone-50/80 ring-1 ring-neutral-900'
                      : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Easypaisa"
                    checked={paymentMethod === 'Easypaisa'}
                    onChange={() => setPaymentMethod('Easypaisa')}
                    className="mt-1 text-neutral-900 focus:ring-neutral-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-neutral-900">
                          Easypaisa Mobile Account
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                        Instant Mobile Wallet
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Transfer directly from your Easypaisa app or dial code. Enter your TID below.
                    </p>

                    {/* Easypaisa Instructions & Inputs */}
                    {paymentMethod === 'Easypaisa' && (
                      <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-200 text-xs space-y-3">
                        <div className="flex items-start gap-2 text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                          <Info className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 text-[11px]">
                            <p><strong>Easypaisa Account Number:</strong> {STORE_PHONE}</p>
                            <p><strong>Account Title:</strong> ELIXIR ATELIER</p>
                            <p className="text-neutral-500">
                              Send <strong>₨ {grandTotal.toLocaleString()}</strong> using the Easypaisa App or *2262#.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-neutral-800">
                              Your Easypaisa Mobile No. <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={senderMobile}
                              onChange={(e) => setSenderMobile(e.target.value)}
                              placeholder="0333-XXXXXXX"
                              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-neutral-800">
                              Transaction ID (TID) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              placeholder="e.g. 1049283746"
                              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 font-mono"
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-400">
                          Note: Orders are marked Pending until payment is checked against the telecom ledger.
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-4">
            <OrderSummary />

            {formError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              {paymentMethod === 'Cash on Delivery'
                ? 'Confirm Order (Cash on Delivery)'
                : `Submit Order via ${paymentMethod}`}
            </Button>

            <div className="text-[11px] text-neutral-400 space-y-1 text-center">
              <p>Delivery across Pakistan within 2–3 business days via Express Courier.</p>
              <p>For instant order support, WhatsApp our Karachi atelier at <strong>{STORE_PHONE}</strong>.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
