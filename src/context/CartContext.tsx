import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    color?: string,
    quantity?: number,
    customMeasurements?: { chest?: string; waist?: string; length?: string }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  grandTotal: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'elixir_cart_v2';
const PROMO_STORAGE_KEY = 'elixir_promo_v2';
const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 250;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {}
  }, [promoCode]);

  const addToCart = (
    product: Product,
    size: string,
    color?: string,
    quantity: number = 1,
    customMeasurements?: { chest?: string; waist?: string; length?: string }
  ) => {
    const selectedColor = color || product.colorName || 'Standard';

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color.toLowerCase() === selectedColor.toLowerCase()
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${size}-${selectedColor.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          product,
          size,
          color: selectedColor,
          quantity,
          unitPrice: product.price,
          customMeasurements,
        };
        return [...prevItems, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Discount calculation
  let discount = 0;
  if (promoCode.trim().toUpperCase() === 'ELIXIR10') {
    discount = Math.round(subtotal * 0.1);
  } else if (promoCode.trim().toUpperCase() === 'WELCOME') {
    discount = Math.min(subtotal, 1000);
  }

  const shippingFee =
    subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ELIXIR10') {
      setPromoCode('ELIXIR10');
      return { success: true, message: '10% Inaugural atelier discount applied!' };
    } else if (cleanCode === 'WELCOME') {
      setPromoCode('WELCOME');
      return { success: true, message: '₨ 1,000 welcome voucher applied!' };
    } else {
      return { success: false, message: 'Invalid voucher code. Try "ELIXIR10"' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        shippingFee,
        discount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        grandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
