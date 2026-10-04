import React from 'react';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const BottomNavigation: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistIds } = useWishlist();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      isActive: currentPath === '/',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Grid,
      path: '/categories',
      isActive: currentPath === '/categories',
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      path: '/wishlist',
      isActive: currentPath === '/wishlist',
      badge: wishlistIds.length > 0 ? wishlistIds.length : undefined,
    },
    {
      id: 'bag',
      label: 'Bag',
      icon: ShoppingBag,
      path: '/cart',
      isActive: currentPath === '/cart' || currentPath === '/checkout',
      badge: totalItems > 0 ? totalItems : undefined,
      onClickOverride: () => setIsCartOpen(true),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      isActive: currentPath === '/profile' || currentPath === '/orders',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[92%] max-w-sm"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.14)] border border-stone-200/90 px-3 py-2 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.onClickOverride) {
                  item.onClickOverride();
                } else {
                  navigate(item.path);
                }
              }}
              className={`relative flex items-center justify-center transition-all duration-200 ${
                active
                  ? 'bg-neutral-900 text-white w-11 h-11 rounded-full shadow-sm scale-105'
                  : 'text-neutral-500 hover:text-neutral-900 w-11 h-11 rounded-full hover:bg-stone-100'
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="w-5 h-5" />

              {/* Badge indicator */}
              {item.badge !== undefined && (
                <span
                  className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs ${
                    active
                      ? 'bg-white text-neutral-900 border border-neutral-900'
                      : 'bg-neutral-900 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
