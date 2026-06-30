'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { darkBlueHex, whiteHex, goldHex, creamHex } from '@/constants/variables';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/200x200/e6f1fb/0c447c?text=UOM';

export default function CartSummary() {
  const { cartItems, getTotalPrice } = useCart();
  const itemCount = cartItems.reduce((count, item) => count + item.selectedQuantity, 0);

  return (
    <div className="overflow-hidden rounded-3xl shadow-md" style={{ backgroundColor: whiteHex }}>
      <div
        className="flex items-center gap-2 px-5 py-4"
        style={{ backgroundColor: darkBlueHex, color: whiteHex }}
      >
        <ShoppingBag className="h-5 w-5" />
        <p className="font-semibold">Your Cart ({itemCount})</p>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {cartItems.length === 0 ? (
          <p className="text-sm text-[#5b6b86]">Your cart is empty.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.selectedColor ?? 'default'}-${item.selectedSize ?? 'default'}`} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={{ backgroundColor: creamHex }}>
                  <Image
                    src={item.image && item.image.startsWith('http') ? item.image : PLACEHOLDER_IMAGE}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold" style={{ color: darkBlueHex }}>
                    {item.name}
                  </p>
                  {(item.selectedColor || item.selectedSize) && (
                    <p className="text-xs text-[#5b6b86]">
                      {[item.selectedColor, item.selectedSize].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium" style={{ color: darkBlueHex }}>
                  x{item.selectedQuantity}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: `color-mix(in srgb, ${darkBlueHex} 12%, transparent)` }}>
          <span className="text-sm font-medium" style={{ color: darkBlueHex }}>Subtotal</span>
          <span className="text-lg font-bold" style={{ color: darkBlueHex }}>Rs {getTotalPrice().toLocaleString()}</span>
        </div>

        <Link
          href="/cart"
          className="cursor-pointer text-center text-sm font-semibold underline-offset-4 transition hover:underline"
          style={{ color: goldHex }}
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
