'use client';

import { useState } from 'react';
import { Ruler, Check, ShoppingBag, Minus, Plus, AlertTriangle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useReserveGate } from '@/context/ReserveGateContext';
import type { ShopProductData } from '@/db/queries';
import type { ShopProduct } from '@/data/store-data';
import { camelHex, whiteSmokeHex, racingRedHex } from '@/constants/variables';

// ponytail: sizes are UI-only — the schema has no sizes table/column. Standard
// apparel run, hardcoded client-side. A real sizes table would be needed to vary
// per product or track stock by size.
const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

// Below this stock count, show urgent ("Only N left") styling instead of plain text.
const LOW_STOCK_THRESHOLD = 5;

export default function ProductBuyPanel({ product }: { product: ShopProductData }) {
  const { cartItems, addToCart } = useCart();
  const { requireAuth } = useReserveGate();
  const isApparel = product.category === 'Apparel';
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(isApparel ? 'M' : undefined);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [stockWarning, setStockWarning] = useState(false);

  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock < LOW_STOCK_THRESHOLD;

  const inCartQuantity = cartItems.find(
    (item) => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
  )?.selectedQuantity ?? 0;
  const cartAtMax = !outOfStock && inCartQuantity >= product.stock;
  const remainingForCart = Math.max(product.stock - inCartQuantity, 0);

  const handleIncrement = () => {
    if (quantity >= remainingForCart) {
      setStockWarning(true);
      return;
    }
    setStockWarning(false);
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    if (cartAtMax) {
      setStockWarning(true);
      return;
    }

    // Map the DB shape onto the cart's ShopProduct shape (price in whole rupees).
    const cartProduct: ShopProduct = {
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      colors: product.colors.map((color) => color.name),
      price: product.priceCents / 100,
      quantity: product.stock,
      isDisplayOnly: product.isDisplayItem,
      image: product.imageUrl ?? '',
    };
    addToCart(cartProduct, quantity, selectedColor, selectedSize);
    setAdded(true);
    setStockWarning(false);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  };

  const subtleBorder = `color-mix(in srgb, ${camelHex} 12%, transparent)`;

  return (
    <div className="flex flex-col gap-6 border-t pt-6" style={{ borderColor: subtleBorder }}>
      {/* Color */}
      {product.colors.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: camelHex }}>Color</span>
            {selectedColor && <span className="text-sm text-[#5b6b86]">{selectedColor}</span>}
          </div>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => {
              const active = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  aria-label={color.name}
                  aria-pressed={active}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setQuantity(1);
                    setStockWarning(false);
                  }}
                  className="h-9 w-9 cursor-pointer rounded-full border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: color.hexCode,
                    borderColor: active ? camelHex : 'transparent',
                    boxShadow: active ? `0 0 0 2px ${whiteSmokeHex} inset` : undefined,
                    outlineColor: camelHex,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Size — apparel only (drinkware/stationery have no sizes) */}
      {isApparel && (
        <div>
          <p className="mb-3 text-sm font-semibold" style={{ color: camelHex }}>Size</p>
          <div className="flex flex-wrap gap-2">
            {APPAREL_SIZES.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setSelectedSize(size);
                    setQuantity(1);
                    setStockWarning(false);
                  }}
                  className="inline-flex h-11 min-w-[2.75rem] cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: active ? camelHex : `color-mix(in srgb, ${camelHex} 25%, transparent)`,
                    backgroundColor: active ? camelHex : 'transparent',
                    color: active ? whiteSmokeHex : camelHex,
                    outlineColor: camelHex,
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {/* ponytail: no size-guide content/page yet — static affordance, non-interactive */}
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: camelHex }}>
            <Ruler className="h-4 w-4" />
            Size Guide
          </span>
        </div>
      )}

      {/* Stock level */}
      {!product.isDisplayItem && (
        <p className="text-sm font-semibold" style={{ color: outOfStock || lowStock ? racingRedHex : '#5b6b86' }}>
          {outOfStock ? 'Out of stock' : lowStock ? `Only ${product.stock} left` : `${product.stock} in stock`}
        </p>
      )}

      {/* Quantity stepper */}
      {!product.isDisplayItem && !outOfStock && (
        <div>
          <p className="mb-3 text-sm font-semibold" style={{ color: camelHex }}>Quantity</p>
          <div className="inline-flex items-center gap-3 rounded-full border px-2 py-1.5" style={{ borderColor: subtleBorder }}>
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ color: camelHex, outlineColor: camelHex }}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold" style={{ color: camelHex }}>
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={handleIncrement}
              disabled={quantity >= remainingForCart}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ color: camelHex, outlineColor: camelHex }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stock warning */}
      {stockWarning && (
        <div
          className="flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-medium"
          style={{
            borderColor: `color-mix(in srgb, ${racingRedHex} 40%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${racingRedHex} 8%, transparent)`,
            color: racingRedHex,
          }}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Only {product.stock} {product.name} left in stock.</span>
        </div>
      )}

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.isDisplayItem || outOfStock || cartAtMax}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: camelHex, color: whiteSmokeHex, outlineColor: camelHex }}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Added to Cart
          </>
        ) : product.isDisplayItem ? (
          'Display Only'
        ) : outOfStock ? (
          'Out of Stock'
        ) : cartAtMax ? (
          'Max Stock in Cart'
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
