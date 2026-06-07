'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ShopProduct } from '@/components/store-data';

export interface CartItem extends ShopProduct {
  selectedQuantity: number;
  selectedColor?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ShopProduct, quantity: number, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('uom_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('uom_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product: ShopProduct, quantity: number, color?: string) => {
    if (product.isDisplayOnly || quantity <= 0) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.selectedColor === color
      );

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.selectedQuantity + quantity,
          product.quantity
        );
        return prevItems.map((item) =>
          item.id === product.id && item.selectedColor === color
            ? { ...item, selectedQuantity: newQuantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          selectedQuantity: Math.min(quantity, product.quantity),
          selectedColor: color || (product.colors[0] ?? undefined),
        },
      ];
    });
  };

  const removeFromCart = (productId: string, color?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId || item.selectedColor !== color
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    color?: string
  ) => {
    setCartItems((prevItems) =>
      prevItems.flatMap((item) => {
        if (item.id !== productId || item.selectedColor !== color) {
          return [item];
        }

        if (quantity <= 0) {
          return [];
        }

        return [
          {
            ...item,
            selectedQuantity: Math.min(quantity, item.quantity),
          },
        ];
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.price === null) return total;
      return total + item.price * item.selectedQuantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
