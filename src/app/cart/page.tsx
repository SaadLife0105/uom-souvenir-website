'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Minus, Plus, Info, Receipt, Loader2, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { submitReservation } from './actions';
import { darkBlueHex, whiteHex, goldHex, creamHex, redHex, blackHex } from '@/constants/variables';

const PLACEHOLDER_IMAGE = 'https://placehold.co/200x200/e6f1fb/0c447c?text=UOM';

const MUTED = '#5b6b86'; // shared muted slate used across the rebuilt shop pages

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const itemCount = cartItems.reduce((count, item) => count + item.selectedQuantity, 0);
  const subtotal = getTotalPrice();
  const subtleBorder = `color-mix(in srgb, ${darkBlueHex} 12%, transparent)`;

  const [paymentRef, setPaymentRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insufficient, setInsufficient] = useState<
    { productId: string; name: string; available: number; requested: number }[]
  >([]);

  const handleGenerateReceipt = async () => {
    if (submitting) return; // disabled-on-click double-submit guard
    setSubmitting(true);
    setError(null);
    setInsufficient([]);

    const result = await submitReservation({
      items: cartItems.map((item) => ({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        selectedQuantity: item.selectedQuantity,
      })),
      paymentReferenceNumber: paymentRef.trim() || undefined,
    });

    if (result.ok) {
      // ponytail: clearCart() happens on the receipt page (ClearCartOnMount), not
      // here — clearing before navigation re-renders this page as an empty cart
      // for a frame before the route swap, which flashes the empty state.
      router.push(`/shop/receipt/${result.reservationId}`);
      return; // leave the button disabled through navigation
    }

    setError(result.error);
    setInsufficient(result.insufficientItems ?? []);
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col" style={{ ["--ink"]: blackHex } as React.CSSProperties}>
      <Navbar />

      <main className="flex-1 pb-20 pt-28" style={{ backgroundColor: creamHex }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: darkBlueHex }}>
            Your Cart
          </h1>
          <p className="mt-2 text-base" style={{ color: MUTED }}>
            Review your items before checkout.
          </p>

          {cartItems.length === 0 ? (
            /* Empty state */
            <div className="mt-10 rounded-3xl p-12 text-center shadow-md" style={{ backgroundColor: whiteHex }}>
              <ShoppingBag className="mx-auto h-10 w-10" style={{ color: goldHex }} />
              <p className="mt-4 text-lg font-semibold" style={{ color: darkBlueHex }}>Your cart is empty.</p>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>
                Browse the UoM souvenir collection and add items to begin.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: darkBlueHex, color: whiteHex, outlineColor: goldHex }}
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Items header */}
              <div className="mt-8 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" style={{ color: darkBlueHex }} />
                <h2 className="text-lg font-bold" style={{ color: darkBlueHex }}>
                  Cart Items ({itemCount})
                </h2>
              </div>

              {/* Item rows */}
              <ul className="mt-4 flex flex-col gap-4">
                {cartItems.map((item) => {
                  const meta = [item.selectedColor, item.selectedSize && `Size ${item.selectedSize}`]
                    .filter(Boolean)
                    .join(' • ');
                  const imageSrc =
                    item.image && item.image.startsWith('http') ? item.image : PLACEHOLDER_IMAGE;
                  const priceLabel = item.price === null ? 'Contact Finance' : `Rs ${item.price.toLocaleString()}`;

                  return (
                    <li
                      key={`${item.id}-${item.selectedColor ?? 'default'}-${item.selectedSize ?? 'default'}`}
                      className="flex flex-col gap-4 rounded-3xl p-4 shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-5"
                      style={{ backgroundColor: whiteHex }}
                    >
                      {/* Thumbnail + identity */}
                      <div className="flex flex-1 items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl" style={{ backgroundColor: creamHex }}>
                          <Image
                            src={imageSrc}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-semibold" style={{ color: darkBlueHex }}>{item.name}</p>
                          {meta && <p className="mt-0.5 text-sm" style={{ color: MUTED }}>{meta}</p>}
                          <p className="mt-1 text-base font-bold" style={{ color: darkBlueHex }}>{priceLabel}</p>
                        </div>
                      </div>

                      {/* Unit price */}
                      <div className="hidden w-28 shrink-0 lg:block">
                        <p className="text-xs" style={{ color: MUTED }}>Unit Price</p>
                        <p className="mt-0.5 text-base font-bold" style={{ color: darkBlueHex }}>{priceLabel}</p>
                      </div>

                      {/* Stepper + delete */}
                      <div className="flex shrink-0 items-center gap-4">
                        <div className="inline-flex items-center rounded-xl border" style={{ borderColor: subtleBorder }}>
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() => updateQuantity(item.id, item.selectedQuantity - 1, item.selectedColor, item.selectedSize)}
                            disabled={item.selectedQuantity <= 1}
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-xl transition hover:bg-[var(--ink)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                            style={{ color: darkBlueHex, outlineColor: goldHex }}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2.5rem] text-center text-sm font-semibold" style={{ color: darkBlueHex }}>
                            {item.selectedQuantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() => updateQuantity(item.id, item.selectedQuantity + 1, item.selectedColor, item.selectedSize)}
                            disabled={item.selectedQuantity >= item.quantity}
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-xl transition hover:bg-[var(--ink)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                            style={{ color: darkBlueHex, outlineColor: goldHex }}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition hover:bg-[var(--ink)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
                          style={{ color: MUTED, outlineColor: goldHex }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Secondary actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:bg-[var(--ink)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ borderColor: darkBlueHex, color: darkBlueHex, outlineColor: goldHex }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:bg-[var(--ink)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ borderColor: subtleBorder, color: MUTED, outlineColor: goldHex }}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </button>
              </div>

              {/* Disclaimer + checkout */}
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-start">
                <div className="flex gap-3 rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteHex }}>
                  <Info className="mt-0.5 h-5 w-5 shrink-0" style={{ color: goldHex }} />
                  <div className="text-sm leading-6" style={{ color: MUTED }}>
                    <p className="font-bold" style={{ color: darkBlueHex }}>Disclaimer</p>
                    {/* ponytail: static copy — not DB-backed. */}
                    <p className="mt-1">All products are official UOM souvenirs. Colors may vary slightly from images.</p>
                    <p>We are not responsible for any delays caused by delivery partners.</p>
                    <p>
                      By proceeding, you agree to our{' '}
                      <Link href="#" className="cursor-pointer font-semibold underline underline-offset-2" style={{ color: darkBlueHex }}>
                        Terms &amp; Conditions
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteHex }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: MUTED }}>Subtotal</span>
                    <span className="text-2xl font-bold" style={{ color: darkBlueHex }}>Rs {subtotal.toLocaleString()}</span>
                  </div>

                  {/* Payment reference — optional */}
                  <div>
                    <label htmlFor="payment-ref" className="block text-sm font-medium" style={{ color: darkBlueHex }}>
                      Payment Reference Number <span style={{ color: MUTED }}>(optional)</span>
                    </label>
                    <input
                      id="payment-ref"
                      type="text"
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      disabled={submitting}
                      placeholder="e.g. bank transfer reference"
                      className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
                      style={{ borderColor: subtleBorder, color: darkBlueHex, outlineColor: goldHex }}
                    />
                    <p className="mt-1 text-xs" style={{ color: MUTED }}>Leave blank if paying on collection.</p>
                  </div>

                  {/* Error / insufficient-stock surface */}
                  {error && (
                    <div
                      role="alert"
                      className="flex gap-2 rounded-xl border p-3 text-sm"
                      style={{
                        borderColor: `color-mix(in srgb, ${redHex} 40%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${redHex} 8%, transparent)`,
                        color: darkBlueHex,
                      }}
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: redHex }} />
                      <div>
                        <p className="font-semibold">{error}</p>
                        {insufficient.length > 0 && (
                          <ul className="mt-1 list-disc pl-4">
                            {insufficient.map((it) => (
                              <li key={it.productId}>
                                Only {it.available} left of {it.name} (you requested {it.requested}).
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleGenerateReceipt}
                    disabled={submitting}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    style={{ backgroundColor: redHex, color: whiteHex, outlineColor: goldHex }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        <Receipt className="h-5 w-5" />
                        Generate Receipt
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs" style={{ color: MUTED }}>
                    Taxes and delivery fees will be calculated on the next step.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
