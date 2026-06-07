'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartNoticeBanner from '@/components/CartNoticeBanner';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const hasContactFinance = cartItems.some((item) => item.price === null);
  const totalPrice = getTotalPrice();

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1f33] text-[#eef3fb]">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Cart</p>
              <h1 className="text-4xl font-semibold tracking-tight">Your reserved items</h1>
              <p className="text-sm leading-7 text-[#99a7c0]">
                Review your selected souvenirs, adjust quantities, or remove items before generating your receipt for UoM Finance Office collection.
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="mt-10 rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-10 text-center">
                <p className="text-lg font-semibold text-[#eef3fb]">Your cart is empty.</p>
                <p className="mt-3 text-sm text-[#99a7c0]">
                  Browse the UoM souvenir collection and add items to your cart to begin.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex rounded-full bg-[#faa153] px-6 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedColor ?? 'default'}`}
                      className="rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-[#eef3fb]">{item.name}</p>
                          {item.selectedColor ? (
                            <p className="text-xs text-[#99a7c0]">Color: {item.selectedColor}</p>
                          ) : null}
                          <p className="text-xs text-[#99a7c0]">Available: {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedQuantity - 1,
                                item.selectedColor
                              )
                            }
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0d1f33] text-xl font-semibold text-[#faa153] transition hover:bg-[#1a2d42] disabled:cursor-not-allowed disabled:opacity-40"
                            disabled={item.selectedQuantity <= 0}
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] text-center text-lg font-semibold text-[#eef3fb]">
                            {item.selectedQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedQuantity + 1,
                                item.selectedColor
                              )
                            }
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0d1f33] text-xl font-semibold text-[#faa153] transition hover:bg-[#1a2d42]"
                            disabled={item.selectedQuantity >= item.quantity}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div className="space-y-2">
                          {item.price === null ? (
                            <p className="text-sm font-semibold text-[#faa153]">Price: Contact Finance</p>
                          ) : (
                            <p className="text-sm text-[#99a7c0]">Unit price: Rs {item.price}</p>
                          )}
                          <p className="text-sm font-semibold text-[#eef3fb]">
                            Subtotal:{' '}
                            {item.price === null
                              ? 'Contact Finance'
                              : `Rs ${item.price * item.selectedQuantity}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedColor)}
                          className="inline-flex items-center justify-center rounded-full bg-[#e74c3c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c0392b]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-8 shadow-sm">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Order summary</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#99a7c0]">Total</span>
                      <span className="text-3xl font-semibold text-[#eef3fb]">Rs {totalPrice}</span>
                    </div>
                    {hasContactFinance && (
                      <p className="text-sm leading-6 text-[#faa153]">
                        One or more items require finance pricing. Contact UoM Finance for the final receipt.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-full bg-[#faa153] px-6 py-4 text-base font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]"
                  >
                    Generate Receipt
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full rounded-full border border-[#3f5a80] bg-transparent px-6 py-4 text-sm font-semibold text-[#eef3fb] transition hover:border-[#faa153]"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10">
              <CartNoticeBanner />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
