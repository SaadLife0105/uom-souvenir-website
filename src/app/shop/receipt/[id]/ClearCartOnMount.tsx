'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

// Renders nothing — fires clearCart() once the receipt page has actually
// mounted, so /cart never re-renders empty before the route swap (see the
// ponytail note in cart/page.tsx's handleGenerateReceipt).
export default function ClearCartOnMount() {
  const { clearCart } = useCart();

  // ponytail: intentionally mount-once. clearCart isn't memoized in CartContext,
  // so depending on it would re-fire this effect on every cart state change
  // (clearCart -> setCartItems -> new context value -> new clearCart reference).
  useEffect(() => {
    clearCart();
  }, []);

  return null;
}
