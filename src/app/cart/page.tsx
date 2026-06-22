'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartNoticeBanner from '@/components/shop/CartNoticeBanner';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const hasContactFinance = cartItems.some((item) => item.price === null);
  const totalPrice = getTotalPrice();

  return (
    <div className="flex min-h-screen flex-col bg-[#D7F2FF] text-[#1f2937]">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border-2 border-[#C82520] bg-white p-8 shadow-xl">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E99C19]">Cart</p>
              <h1 className="text-4xl font-semibold tracking-tight text-[#7F0906]">Your reserved items</h1>
              <p className="text-sm leading-7 text-[#1f2937]">
                Review your selected souvenirs, adjust quantities, or remove items before generating your receipt for UoM Finance Office collection.
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="mt-10 rounded-[2rem] border-2 border-[#C82520] bg-[#D7F2FF] p-10 text-center">
                <p className="text-lg font-semibold text-[#7F0906]">Your cart is empty.</p>
                <p className="mt-3 text-sm text-[#7F0906]">
                  Browse the UoM souvenir collection and add items to your cart to begin.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex rounded-full bg-[#C82520] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7F0906]"
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
                      className="rounded-[2rem] border-2 border-[#C82520] bg-[#F8FCFF] p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-[#7F0906]">{item.name}</p>
                          {item.selectedColor ? (
                            <p className="text-xs text-[#7F0906]">Color: {item.selectedColor}</p>
                          ) : null}
                          <p className="text-xs text-[#7F0906]">Available: {item.quantity}</p>
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
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E99C19] text-xl font-semibold text-[#7F0906] transition hover:bg-[#C82520] disabled:cursor-not-allowed disabled:opacity-40"
                            disabled={item.selectedQuantity <= 0}
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] text-center text-lg font-semibold text-[#7F0906]">
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
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E99C19] text-xl font-semibold text-[#7F0906] transition hover:bg-[#C82520]"
                            disabled={item.selectedQuantity >= item.quantity}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div className="space-y-2">
                          {item.price === null ? (
                            <p className="text-sm font-semibold text-[#E99C19]">Price: Contact Finance</p>
                          ) : (
                            <p className="text-sm text-[#7F0906]">Unit price: Rs {item.price}</p>
                          )}
                          <p className="text-sm font-semibold text-[#7F0906]">
                            Subtotal:{' '}
                            {item.price === null
                              ? 'Contact Finance'
                              : `Rs ${item.price * item.selectedQuantity}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedColor)}
                          className="inline-flex items-center justify-center rounded-full bg-[#C82520] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7F0906]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 rounded-[2rem] border-2 border-[#C82520] bg-white p-8 shadow-xl">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E99C19]">Order summary</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#7F0906]">Total</span>
                      <span className="text-3xl font-semibold text-[#7F0906]">Rs {totalPrice}</span>
                    </div>
                    {hasContactFinance && (
                      <p className="text-sm leading-6 text-[#E99C19]">
                        One or more items require finance pricing. Contact UoM Finance for the final receipt.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-full bg-[#C82520] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#7F0906]"
                  >
                    Generate Receipt
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full rounded-full border-2 border-[#C82520] bg-transparent px-6 py-4 text-sm font-semibold text-[#7F0906] transition hover:bg-[#E99C19]/20"
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
