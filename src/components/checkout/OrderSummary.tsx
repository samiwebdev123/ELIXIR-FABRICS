import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Tag } from 'lucide-react';

interface OrderSummaryProps {
  showPromo?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ showPromo = true }) => {
  const { items, subtotal, shippingFee } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'ELIXIR10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage({ text: '10% atelier inaugural discount applied!', type: 'success' });
    } else if (promoCode.trim().toUpperCase() === 'WELCOME') {
      const discount = 1000;
      setAppliedDiscount(discount);
      setPromoMessage({ text: '₨ 1,000 welcome voucher applied!', type: 'success' });
    } else {
      setAppliedDiscount(0);
      setPromoMessage({ text: 'Invalid voucher code. Try "ELIXIR10"', type: 'error' });
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingFee);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h3 className="font-brand text-lg font-semibold text-neutral-900">
          Order Summary
        </h3>
        <span className="text-xs text-neutral-500 font-medium">
          {items.length} {items.length === 1 ? 'Garment' : 'Garments'}
        </span>
      </div>

      {/* Item List */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3.5 items-center">
            <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-neutral-900 truncate">
                {item.product.title}
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Size: <span className="font-medium text-neutral-800">{item.size}</span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs font-bold text-neutral-900 tabular-nums">
                ₨ {(item.product.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      {showPromo && (
        <form onSubmit={handleApplyPromo} className="pt-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Voucher code (try ELIXIR10)"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-neutral-900 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-xs font-semibold rounded-xl transition-colors"
            >
              Apply
            </button>
          </div>
          {promoMessage && (
            <p
              className={`text-[11px] mt-2 font-medium ${
                promoMessage.type === 'success' ? 'text-emerald-700' : 'text-red-500'
              }`}
            >
              {promoMessage.text}
            </p>
          )}
        </form>
      )}

      {/* Calculations */}
      <div className="space-y-2 pt-4 border-t border-stone-100 text-xs">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span className="font-semibold text-neutral-900 tabular-nums">
            ₨ {subtotal.toLocaleString()}
          </span>
        </div>

        {appliedDiscount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Special Atelier Discount</span>
            <span className="tabular-nums">- ₨ {appliedDiscount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-neutral-600">
          <span>Express Delivery (Pakistan)</span>
          <span className="font-medium text-neutral-900">
            {shippingFee === 0 ? (
              <span className="text-emerald-700 font-semibold">Complimentary (Free)</span>
            ) : (
              `₨ ${shippingFee}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm sm:text-base font-bold text-neutral-900 pt-3 border-t border-stone-200">
          <span>Total Amount</span>
          <span className="tabular-nums">₨ {finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center gap-2.5 text-xs text-neutral-600">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Cash on Delivery (COD) · Inspection before payment accepted</span>
      </div>
    </div>
  );
};
