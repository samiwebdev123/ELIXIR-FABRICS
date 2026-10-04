import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/layout/Header';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { LoadingScreen } from './components/common/LoadingScreen';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MenPage } from './pages/MenPage';
import { WomenPage } from './pages/WomenPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const [isLoadingActive, setIsLoadingActive] = useState(true);

  // Normalize path without query string for routing match
  const basePath = currentPath.split('?')[0];

  const renderCurrentRoute = () => {
    if (basePath === '/') return <HomePage />;
    if (basePath === '/shop') return <ShopPage />;
    if (basePath === '/men') return <MenPage />;
    if (basePath === '/women') return <WomenPage />;
    if (basePath.startsWith('/product/')) return <ProductDetailPage />;
    if (basePath === '/categories') return <CategoriesPage />;
    if (basePath === '/wishlist') return <WishlistPage />;
    if (basePath === '/cart') return <CartPage />;
    if (basePath === '/checkout') return <CheckoutPage />;
    if (basePath === '/orders') return <OrdersPage />;
    if (basePath === '/profile') return <ProfilePage />;
    if (basePath === '/contact') return <ContactPage />;
    if (basePath === '/admin') return <AdminPage />;

    // Dedicated Luxury 404 page for any unhandled routes
    return <NotFoundPage />;
  };

  // Dedicated full-viewport layout for /admin and /admin/* (Desktop sidebar + responsive mobile dashboard)
  if (basePath === '/admin' || basePath.startsWith('/admin/')) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
        {isLoadingActive && (
          <LoadingScreen onFinish={() => setIsLoadingActive(false)} minDuration={1200} />
        )}
        <AdminPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Required ELIXIR Loading Screen on every load/reload */}
      {isLoadingActive && (
        <LoadingScreen onFinish={() => setIsLoadingActive(false)} minDuration={1800} />
      )}

      {/* Main App Layout */}
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentRoute()}
      </main>

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer />

      {/* Floating Bottom Navigation (Mobile) */}
      <BottomNavigation />

      {/* Full Luxury Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </RouterProvider>
  );
}
