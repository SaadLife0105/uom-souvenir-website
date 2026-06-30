'use client';

import { useState } from 'react';
import { Ruler, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { ShopProductData } from '@/db/queries';
import type { ShopProduct } from '@/data/store-data';
import { darkBlueHex, whiteHex, goldHex } from '@/constants/variables';

// ponytail: sizes are UI-only — the schema has no sizes table/column. Standard
// apparel run, hardcoded client-side. A real sizes table would be needed to vary
// per product or track stock by size.
const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductBuyPanel({ product }: { product: ShopProductData }) {
  const { addToCart } = useCart();
  const isApparel = product.category === 'Apparel';
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(isApparel ? 'M' : undefined);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
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
    addToCart(cartProduct, 1, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const subtleBorder = `color-mix(in srgb, ${darkBlueHex} 12%, transparent)`;

  return (
    <div className="flex flex-col gap-6 border-t pt-6" style={{ borderColor: subtleBorder }}>
      {/* Color */}
      {product.colors.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: darkBlueHex }}>Color</span>
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
                  onClick={() => setSelectedColor(color.name)}
                  className="h-9 w-9 cursor-pointer rounded-full border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: color.hexCode,
                    borderColor: active ? darkBlueHex : 'transparent',
                    boxShadow: active ? `0 0 0 2px ${whiteHex} inset` : undefined,
                    outlineColor: goldHex,
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
          <p className="mb-3 text-sm font-semibold" style={{ color: darkBlueHex }}>Size</p>
          <div className="flex flex-wrap gap-2">
            {APPAREL_SIZES.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedSize(size)}
                  className="inline-flex h-11 min-w-[2.75rem] cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: active ? darkBlueHex : `color-mix(in srgb, ${darkBlueHex} 25%, transparent)`,
                    backgroundColor: active ? darkBlueHex : 'transparent',
                    color: active ? whiteHex : darkBlueHex,
                    outlineColor: goldHex,
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {/* ponytail: no size-guide content/page yet — static affordance, non-interactive */}
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: darkBlueHex }}>
            <Ruler className="h-4 w-4" />
            Size Guide
          </span>
        </div>
      )}

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.isDisplayItem}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: darkBlueHex, color: whiteHex, outlineColor: goldHex }}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Added to Cart
          </>
        ) : product.isDisplayItem ? (
          'Display Only'
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
