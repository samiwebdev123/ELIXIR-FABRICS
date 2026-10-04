import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/common/Button';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, clearWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const { navigate } = useRouter();

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, p.sizes[0] || 'M', p.colorName, 1);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              Personal Curation
            </span>
            <h1 className="font-brand text-3xl sm:text-4xl text-neutral-900 font-medium mt-1">
              Your Saved Wishlist
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Garment' : 'Garments'} saved in your wardrobe
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddAllToCart}
                leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
              >
                Add All to Bag
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlistProducts.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-neutral-400 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-brand text-xl text-neutral-900 font-medium">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Explore our handcrafted collection of Pakistani raw silk kurtas, waistcoats, and blazers to save your favorites.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="md" onClick={() => navigate('/shop')}>
                Explore Collection
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
