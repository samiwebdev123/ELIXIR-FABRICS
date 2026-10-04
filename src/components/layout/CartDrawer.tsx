import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { Button } from '../common/Button';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    shippingFee,
  } = useCart();
  const { navigate } = useRouter();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const amountNeededForFree = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="font-brand text-lg font-semibold tracking-wide text-neutral-900">
                Shopping Bag
              </h2>
              <span className="text-xs bg-stone-100 px-2 py-0.5 rounded-full text-neutral-600 font-medium">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone bar */}
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-100">
            <div className="flex items-center justify-between text-xs text-neutral-600 mb-1.5">
              <span>
                {amountNeededForFree === 0
                  ? '🎉 You unlocked Complimentary Express Shipping!'
                  : `Add ₨ ${amountNeededForFree.toLocaleString()} more for Free Delivery in Pakistan`}
              </span>
              <span className="font-semibold text-neutral-900">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 font-brand">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-[240px]">
                  Explore our handcrafted Pakistani kurtas, waistcoats, and fine menswear essentials.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-6"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                >
                  Explore Catalog
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-stone-50/70 rounded-2xl border border-stone-200/70"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-xl bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Size: <span className="font-semibold text-neutral-800">{item.size}</span>
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        {item.product.fabric}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/50">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-neutral-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-neutral-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-neutral-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-neutral-900 tabular-nums">
                        ₨ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-stone-200 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Bag Subtotal</span>
                  <span className="text-neutral-900 font-medium tabular-nums">
                    ₨ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Standard Delivery (PK)</span>
                  <span className="text-neutral-900 font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₨ ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-stone-100">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">₨ {(subtotal + shippingFee).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleCheckout}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Checkout (COD Available)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleViewCart}
                >
                  View Full Bag & Promo Code
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery across Pakistan · 7-Day Exchange</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
