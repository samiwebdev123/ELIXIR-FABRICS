import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS, STORE_PHONE, STORE_WHATSAPP } from '../data/mockData';
import { Button } from '../components/common/Button';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  XCircle,
  Search,
  ChevronRight,
  Calendar,
  MapPin,
  Tag
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { isSupabaseConfigured } from '../lib/supabase';

export const OrdersPage: React.FC = () => {
  const { navigate, params } = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      try {
        const fetchedOrders = await orderService.getOrders();
        setOrders(fetchedOrders);
      } catch (e) {
        console.error('Failed to load orders', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      activeStatusFilter === 'all' || o.status.toLowerCase() === activeStatusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return {
          label: 'Pending Verification',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          dotClass: 'bg-amber-500',
        };
      case 'Confirmed':
        return {
          label: 'Order Confirmed',
          badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
          dotClass: 'bg-blue-500',
        };
      case 'Preparing':
        return {
          label: 'Preparing in Atelier',
          badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          dotClass: 'bg-indigo-500',
        };
      case 'Dispatched':
        return {
          label: 'Dispatched via Courier',
          badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
          dotClass: 'bg-purple-500',
        };
      case 'Delivered':
        return {
          label: 'Delivered',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dotClass: 'bg-emerald-500',
        };
      case 'Cancelled':
        return {
          label: 'Cancelled',
          badgeClass: 'bg-red-50 text-red-800 border-red-200',
          dotClass: 'bg-red-500',
        };
      default:
        return {
          label: status,
          badgeClass: 'bg-stone-50 text-stone-800 border-stone-200',
          dotClass: 'bg-stone-500',
        };
    }
  };

  // Status index for timeline mapping:
  // 1: Pending, 2: Confirmed, 3: Preparing, 4: Dispatched, 5: Delivered
  const getTimelineStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Confirmed':
        return 2;
      case 'Preparing':
        return 3;
      case 'Dispatched':
        return 4;
      case 'Delivered':
        return 5;
      case 'Cancelled':
        return 0;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-14 bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              Customer Tracking
            </span>
            <h1 className="font-brand text-3xl sm:text-4xl text-neutral-900 font-medium mt-1">
              Your Orders &amp; Timeline
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Live fulfillment status across Pakistan for ELIXIR bespoke and ready-to-wear orders.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/shop')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Explore Catalog
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-2xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order number (e.g. ELX-948210), customer name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'pending', label: 'Pending' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'preparing', label: 'Preparing' },
              { id: 'dispatched', label: 'Dispatched' },
              { id: 'delivered', label: 'Delivered' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  activeStatusFilter === tab.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-stone-50 text-neutral-600 hover:bg-stone-100 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
            <Package className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="font-brand text-xl text-neutral-900">No Orders Found</h3>
            <p className="text-xs text-neutral-500">
              {searchQuery
                ? 'No orders match your search query.'
                : 'You have not placed any orders yet.'}
            </p>
            <Button variant="primary" size="md" onClick={() => navigate('/shop')}>
              Browse Collection
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              const stepIndex = getTimelineStepIndex(order.status);
              const isCancelled = order.status === 'Cancelled';

              const orderWhatsAppMsg = encodeURIComponent(
                `Hello ELIXIR, I would like an update on my order #${order.id} (${order.shippingAddress.fullName}, ${order.shippingAddress.city}).`
              );

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-6"
                >
                  {/* Top Bar of Order Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-brand text-lg font-bold text-neutral-900">
                          {order.id}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {order.date}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {order.shippingAddress.city}, {order.shippingAddress.province}
                        </span>
                        <span>·</span>
                        <span>Payment: <strong className="text-neutral-700">{order.paymentMethod}</strong></span>
                      </div>
                    </div>

                    {/* WhatsApp Inquiries button for this order */}
                    <a
                      href={`https://wa.me/${STORE_WHATSAPP}?text=${orderWhatsAppMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl font-semibold transition-colors self-start sm:self-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Status ({STORE_PHONE})</span>
                    </a>
                  </div>

                  {/* VISUAL ORDER TIMELINE */}
                  {!isCancelled ? (
                    <div className="py-2 bg-stone-50/70 p-4 rounded-2xl border border-stone-200/70">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                        Fulfillment Timeline
                      </p>

                      <div className="grid grid-cols-5 gap-1 relative text-center">
                        {/* Connecting background line */}
                        <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-stone-200 -z-0" />

                        {/* Step 1: Pending */}
                        <div className="relative z-10 space-y-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs transition-all ${
                              stepIndex >= 1
                                ? 'bg-neutral-900 text-white shadow-xs'
                                : 'bg-stone-200 text-neutral-400'
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                          </div>
                          <p
                            className={`text-[11px] font-semibold ${
                              stepIndex >= 1 ? 'text-neutral-900' : 'text-neutral-400'
                            }`}
                          >
                            Pending
                          </p>
                          <p className="text-[10px] text-neutral-400 hidden sm:block">Registered</p>
                        </div>

                        {/* Step 2: Confirmed */}
                        <div className="relative z-10 space-y-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs transition-all ${
                              stepIndex >= 2
                                ? 'bg-neutral-900 text-white shadow-xs'
                                : 'bg-stone-200 text-neutral-400'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <p
                            className={`text-[11px] font-semibold ${
                              stepIndex >= 2 ? 'text-neutral-900' : 'text-neutral-400'
                            }`}
                          >
                            Confirmed
                          </p>
                          <p className="text-[10px] text-neutral-400 hidden sm:block">Order Approved</p>
                        </div>

                        {/* Step 3: Preparing */}
                        <div className="relative z-10 space-y-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs transition-all ${
                              stepIndex >= 3
                                ? 'bg-neutral-900 text-white shadow-xs'
                                : 'bg-stone-200 text-neutral-400'
                            }`}
                          >
                            <Package className="w-4 h-4" />
                          </div>
                          <p
                            className={`text-[11px] font-semibold ${
                              stepIndex >= 3 ? 'text-neutral-900' : 'text-neutral-400'
                            }`}
                          >
                            Preparing
                          </p>
                          <p className="text-[10px] text-neutral-400 hidden sm:block">Atelier Tailoring</p>
                        </div>

                        {/* Step 4: Dispatched */}
                        <div className="relative z-10 space-y-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs transition-all ${
                              stepIndex >= 4
                                ? 'bg-neutral-900 text-white shadow-xs'
                                : 'bg-stone-200 text-neutral-400'
                            }`}
                          >
                            <Truck className="w-4 h-4" />
                          </div>
                          <p
                            className={`text-[11px] font-semibold ${
                              stepIndex >= 4 ? 'text-neutral-900' : 'text-neutral-400'
                            }`}
                          >
                            Dispatched
                          </p>
                          <p className="text-[10px] text-neutral-400 hidden sm:block">Courier Transit</p>
                        </div>

                        {/* Step 5: Delivered */}
                        <div className="relative z-10 space-y-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs transition-all ${
                              stepIndex >= 5
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-stone-200 text-neutral-400'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <p
                            className={`text-[11px] font-semibold ${
                              stepIndex >= 5 ? 'text-emerald-700 font-bold' : 'text-neutral-400'
                            }`}
                          >
                            Delivered
                          </p>
                          <p className="text-[10px] text-neutral-400 hidden sm:block">Doorstep Delivered</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-center gap-3 text-xs text-red-700">
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <div>
                        <strong className="block font-semibold">Order Cancelled</strong>
                        <span>
                          This order was cancelled by request or due to incomplete payment verification.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="divide-y divide-stone-100 border-t border-stone-100 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 pb-2">
                      Garments in Order ({order.items.length})
                    </p>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-16 rounded-xl object-cover bg-stone-100 shrink-0 cursor-pointer"
                            onClick={() => navigate(`/product/${item.product.slug || item.product.id}`)}
                          />
                          <div>
                            <p
                              className="font-semibold text-neutral-900 hover:text-neutral-600 cursor-pointer line-clamp-1"
                              onClick={() => navigate(`/product/${item.product.slug || item.product.id}`)}
                            >
                              {item.product.title}
                            </p>
                            <p className="text-neutral-500 text-[11px] mt-0.5">
                              Size: <strong className="text-neutral-800">{item.size}</strong> · Color:{' '}
                              <strong className="text-neutral-800">{item.color}</strong> · Qty:{' '}
                              <strong className="text-neutral-800">{item.quantity}</strong>
                            </p>
                            <p className="text-neutral-400 text-[10px]">
                              Unit Price: ₨ {item.product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-neutral-900 tabular-nums text-xs">
                            ₨ {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address & Summary */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-neutral-400 uppercase text-[10px] tracking-wider block font-semibold">
                        Shipping Recipient
                      </span>
                      <p className="font-semibold text-neutral-900 mt-0.5">
                        {order.shippingAddress.fullName} ({order.shippingAddress.phone})
                      </p>
                      <p className="text-neutral-600 text-[11px] mt-0.5">
                        {order.shippingAddress.completeAddress}, {order.shippingAddress.area},{' '}
                        {order.shippingAddress.city}, {order.shippingAddress.province}
                      </p>
                    </div>

                    <div className="sm:text-right space-y-1 sm:border-l sm:border-stone-200 sm:pl-4">
                      <div className="flex justify-between sm:justify-end gap-4 text-neutral-500 text-[11px]">
                        <span>Subtotal:</span>
                        <span className="font-medium text-neutral-800 tabular-nums">
                          ₨ {order.subtotal.toLocaleString()}
                        </span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between sm:justify-end gap-4 text-emerald-700 text-[11px]">
                          <span>Discount:</span>
                          <span className="font-medium tabular-nums">- ₨ {order.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between sm:justify-end gap-4 text-neutral-500 text-[11px]">
                        <span>Delivery Fee:</span>
                        <span className="font-medium text-neutral-800">
                          {order.shippingFee === 0 ? 'Complimentary' : `₨ ${order.shippingFee}`}
                        </span>
                      </div>
                      <div className="flex justify-between sm:justify-end gap-4 text-neutral-900 font-bold text-sm pt-1 border-t border-stone-200">
                        <span>Grand Total:</span>
                        <span className="font-brand tabular-nums">₨ {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
