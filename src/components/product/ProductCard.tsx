import React, { useState } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { navigate } = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes.length > 1 && !showSizePicker) {
      setShowSizePicker(true);
      return;
    }

    setIsAdding(true);
    addToCart(product, selectedSize, product.colorName, 1);
    setTimeout(() => {
      setIsAdding(false);
      setShowSizePicker(false);
    }, 600);
  };

  const handleSelectSize = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    setSelectedSize(size);
    setIsAdding(true);
    addToCart(product, size, product.colorName, 1);
    setTimeout(() => {
      setIsAdding(false);
      setShowSizePicker(false);
    }, 600);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
    >
      {/* Image Container with Zero-Broken-Image Fallback */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F4F3EE]">
        {!imgError ? (
          <img
            src={product.images[0]}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-stone-100 text-neutral-400">
            <ShoppingBag className="w-10 h-10 stroke-1 text-stone-300 mb-2" />
            <span className="text-[11px] font-brand tracking-widest uppercase text-neutral-500 text-center">
              ELIXIR ATELIER
            </span>
            <span className="text-[10px] text-neutral-400 mt-1 text-center truncate max-w-full">
              {product.title}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-neutral-900 text-white shadow-md scale-105'
              : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Discount & Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-red-600 text-white shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}

          {product.isNew && !product.discountPercentage && (
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-neutral-900/90 text-white backdrop-blur-xs">
              New Arrival
            </span>
          )}

          {product.isTrending && !product.discountPercentage && !product.isNew && (
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-amber-600/90 text-white backdrop-blur-xs">
              Trending
            </span>
          )}
        </div>

        {/* Quick Size Overlay picker */}
        {showSizePicker && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-neutral-800 uppercase tracking-wider">
                Select Size:
              </span>
              <button
                onClick={() => setShowSizePicker(false)}
                className="text-[10px] text-neutral-400 hover:text-neutral-900"
              >
                Close
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => handleSelectSize(e, s)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-neutral-900 hover:text-white transition-colors text-neutral-800"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 tracking-wider uppercase font-medium">
            <span className="truncate">{product.categoryLabel}</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase">
              {product.gender}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mt-1 line-clamp-1 group-hover:text-neutral-700 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
            {product.fabric}
          </p>
        </div>

        {/* Price and Action Row */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-neutral-900 tabular-nums">
              ₨ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ₨ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 hover:bg-neutral-900 text-neutral-800 hover:text-white'
            }`}
            aria-label="Add to bag"
            title="Add to shopping bag"
          >
            {isAdding ? (
              <Check className="w-4 h-4 animate-scale-up" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
