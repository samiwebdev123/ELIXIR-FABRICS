import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRouter, Link } from '../../context/RouterContext';
import { SearchBar } from './SearchBar';
import { STORE_PHONE, STORE_WHATSAPP_LINK } from '../../data/mockData';

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const { currentPath, navigate } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Men', href: '/men' },
    { label: 'Women', href: '/women' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Categories', href: '/categories' },
    { label: 'Orders', href: '/orders' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar with WhatsApp Phone Link */}
      <div className="bg-neutral-900 text-stone-300 text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 tracking-wide font-sans">
            <span className="hidden sm:inline">Complimentary Express Shipping Across Pakistan on Orders ₨ 5,000+</span>
            <span className="sm:hidden">Free Express Delivery in PK on ₨ 5,000+</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Phone behavior: clicking opens WhatsApp chat */}
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 font-medium group"
              title="Click to WhatsApp concierge"
            >
              <span className="text-emerald-400">WhatsApp:</span>
              <span className="tabular-nums font-semibold text-white underline underline-offset-2">
                {STORE_PHONE}
              </span>
            </a>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-400">Cash on Delivery (COD)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Toggle & Desktop Nav */}
            <div className="flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-neutral-800 hover:text-neutral-900 rounded-lg"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <nav className="hidden md:flex items-center gap-5 lg:gap-6">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs uppercase tracking-[0.14em] font-medium transition-colors relative py-1 ${
                        isActive
                          ? 'text-neutral-900 font-bold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Brand Identity Logo */}
            <div className="flex-1 flex justify-center md:flex-none">
              <Logo size="md" />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-stone-100 rounded-full transition-colors"
                aria-label="Search garments"
                title="Search garments"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-stone-100 rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

              {/* Cart / Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-stone-100 rounded-full transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Profile Link (desktop) */}
              <Link
                href="/profile"
                className="hidden sm:flex p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-stone-100 rounded-full transition-colors"
                aria-label="Account Profile"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 z-10">
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <Logo size="sm" isLink={false} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-6 space-y-4 overflow-y-auto">
              <p className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                Explore Collections
              </p>
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-neutral-800 hover:text-neutral-950 py-1"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}

              <div className="pt-6 border-t border-stone-200 space-y-3">
                <p className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                  Client Services
                </p>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-neutral-600 hover:text-neutral-950"
                >
                  My Profile & Measurements
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-neutral-600 hover:text-neutral-950"
                >
                  Track My Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-neutral-600 hover:text-neutral-950"
                >
                  Wishlist ({wishlistIds.length})
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <a
                href={STORE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#075E54] hover:bg-[#128C7E] p-3 rounded-xl transition-colors shadow-xs"
              >
                <span>WhatsApp Concierge: {STORE_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Instant Search Dialog */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
