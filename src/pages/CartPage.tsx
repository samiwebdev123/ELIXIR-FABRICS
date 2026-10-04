import React from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { Button } from '../components/common/Button';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const { navigate } = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen px-4 py-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-neutral-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-brand text-2xl text-neutral-900 font-medium">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Discover our luxury Pakistani collection and elevate your wardrobe with hand-finished pieces.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="md" onClick={() => navigate('/shop')}>
              Explore Catalog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              ELIXIR Shopping Bag
            </span>
            <h1 className="font-brand text-3xl sm:text-4xl text-neutral-900 font-medium mt-1">
              Your Bag ({items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* 2-Column Layout: Left Item List, Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 sm:p-5 bg-white rounded-3xl border border-stone-200/90 shadow-2xs transition-all hover:shadow-xs"
              >
                {/* Product image */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-2xl bg-stone-100 shrink-0 cursor-pointer"
                  onClick={() => navigate(`/product/${item.product.slug || item.product.id}`)}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
                        {item.product.categoryLabel}
                      </span>
                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove from bag"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Product name */}
                    <h3
                      className="font-brand text-base sm:text-lg font-semibold text-neutral-900 mt-0.5 line-clamp-1 cursor-pointer hover:text-neutral-600"
                      onClick={() => navigate(`/product/${item.product.slug || item.product.id}`)}
                    >
                      {item.product.title}
                    </h3>

                    {/* Selected size and color */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-neutral-600">
                      <p>
                        Selected Size: <strong className="text-neutral-900 font-semibold">{item.size}</strong>
                      </p>
                      <p>
                        Selected Color: <strong className="text-neutral-900 font-semibold">{item.color}</strong>
                      </p>
                    </div>

                    {/* Unit price */}
                    <p className="text-xs text-neutral-500 mt-1">
                      Unit Price: <span className="font-semibold text-neutral-800">₨ {item.product.price.toLocaleString()}</span>
                    </p>

                    {item.customMeasurements && (
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Bespoke: Chest {item.customMeasurements.chest || '-'}, Waist {item.customMeasurements.waist || '-'}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-3">
                    {/* Quantity controls (+ and -) */}
                    <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-stone-200 text-neutral-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-neutral-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-stone-200 text-neutral-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total price */}
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block uppercase font-medium">Item Total</span>
                      <span className="font-brand text-base sm:text-lg font-bold text-neutral-900 tabular-nums">
                        ₨ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard Pakistan Express Delivery (2–3 working days)</span>
              </div>
              <span className="font-semibold text-neutral-900">COD Available</span>
            </div>
          </div>

          {/* Right: Order Summary & Checkout CTA */}
          <div className="lg:col-span-5 space-y-4">
            <OrderSummary />

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              PROCEED TO CHECKOUT
            </Button>

            <p className="text-[11px] text-center text-neutral-400">
              Complimentary nationwide exchange within 7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
