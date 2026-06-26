'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { shopProducts, type ShopProduct } from '@/data/store-data';
import { useCart } from '@/context/CartContext';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/400x400?text=UOM+Souvenir&bg=0d1f33&fg=ffffff';

export default function ShopPage() {
  const router = useRouter();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        shopProducts.map((product) => [product.id, product.colors[0] ?? ''])
      )
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return shopProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const cartCount = cartItems.reduce(
    (count, item) => count + item.selectedQuantity,
    0
  );

  const cartTotal = cartItems.reduce((total, item) => {
    if (item.price === null) return total;
    return total + item.price * item.selectedQuantity;
  }, 0);

  const getCartQuantity = (productId: string, color: string) => {
    return (
      cartItems.find(
        (item) => item.id === productId && item.selectedColor === color
      )?.selectedQuantity ?? 0
    );
  };

  const getImageSource = (image: string) => {
    if (!image || image.includes('/images/placeholder.png')) {
      return PLACEHOLDER_IMAGE;
    }
    return image;
  };

  const handleColorChange = (productId: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const handleIncrease = (product: ShopProduct, color: string) => {
    if (product.isDisplayOnly) return;
    addToCart(product, 1, color);
  };

  const handleDecrease = (product: ShopProduct, color: string) => {
    const currentQuantity = getCartQuantity(product.id, color);
    updateQuantity(product.id, currentQuantity - 1, color);
  };

  const handleGenerateReceipt = () => {
    router.push('/cart');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#D7F2FF] text-[#1f2937]">
      <Navbar />

      <main className="flex-1 pb-32">
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border-2 border-[#C82520] bg-white p-8 shadow-xl sm:p-10">
              <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E99C19]">Browse & Shop</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#7F0906]">
                  Complete UoM Souvenir Collection
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[#1f2937]">
                  Explore the full range of UoM souvenirs, search by name or description, and add your favorites to the cart for easy pickup at the Finance Office.
                </p>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by product name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border-2 border-[#C82520] bg-[#D7F2FF] px-6 py-4 text-[#1f2937] placeholder-[#7F0906] focus:outline-none focus:ring-2 focus:ring-[#E99C19]"
                  />
                  <svg
                    className="absolute right-4 top-4 h-6 w-6 text-[#7F0906]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <p className="text-sm text-[#7F0906]">
                  Showing {filteredProducts.length} of {shopProducts.length} products
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[3fr_1fr]">
              <div className="space-y-6">
                {filteredProducts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => {
                      const currentColor = selectedColors[product.id] ?? product.colors[0] ?? '';
                      const currentQuantity = getCartQuantity(product.id, currentColor);
                      const imageSrc = getImageSource(product.image);

                      return (
                        <div
                          key={`${product.id}-${currentColor}`}
                          className="flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-[#C82520] bg-white shadow-xl transition hover:-translate-y-1"
                        >
                          <div className="relative h-72 overflow-hidden bg-[#D7F2FF]">
                            <img
                              src={imageSrc}
                              alt={product.name}
                              loading="lazy"
                              onError={(event) => {
                                if (event.currentTarget.src !== PLACEHOLDER_IMAGE) {
                                  event.currentTarget.src = PLACEHOLDER_IMAGE;
                                }
                              }}
                              className="h-full w-full object-cover"
                            />
                            {product.isDisplayOnly && (
                              <div className="absolute top-3 right-3 inline-flex items-center rounded-full bg-[#E99C19] px-3 py-1">
                                <span className="text-xs font-semibold text-[#7F0906]">Display Item</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col flex-grow p-6">
                            <div className="space-y-3">
                              <div>
                                <p className="text-lg font-semibold text-[#7F0906]">{product.name}</p>
                                <p className="text-sm text-[#1f2937] mt-2">{product.description}</p>
                              </div>

                              <div>
                                {product.price === null ? (
                                  <p className="text-sm font-semibold text-[#E99C19]">Price: Contact Finance</p>
                                ) : (
                                  <p className="text-lg font-bold text-[#C82520]">Rs {product.price}</p>
                                )}
                              </div>

                              {product.colors.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-[#7F0906] mb-2">Color:</p>
                                  <select
                                    value={currentColor}
                                    onChange={(e) => handleColorChange(product.id, e.target.value)}
                                    className="w-full rounded-xl border-2 border-[#C82520] bg-[#D7F2FF] px-3 py-2 text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#E99C19]"
                                  >
                                    {product.colors.map((color) => (
                                      <option key={color} value={color}>
                                        {color}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}

                              <div className="grid gap-3">
                                <div className="flex items-center justify-between text-sm text-[#7F0906]">
                                  <span>In cart</span>
                                  <span>{currentQuantity}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => handleDecrease(product, currentColor)}
                                    disabled={currentQuantity === 0 || product.isDisplayOnly}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E99C19] text-xl font-semibold text-[#7F0906] transition hover:bg-[#C82520] disabled:cursor-not-allowed disabled:opacity-40"
                                  >
                                    −
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleIncrease(product, currentColor)}
                                    disabled={product.isDisplayOnly}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E99C19] text-xl font-semibold text-[#7F0906] transition hover:bg-[#C82520] disabled:cursor-not-allowed disabled:opacity-40"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <button
                                type="button"
                                onClick={() => handleIncrease(product, currentColor)}
                                disabled={product.isDisplayOnly}
                                className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                                  product.isDisplayOnly
                                    ? 'bg-[#D7F2FF] text-[#7F0906] cursor-not-allowed border-2 border-[#C82520]'
                                    : 'bg-[#C82520] text-white hover:bg-[#7F0906]'
                                }`}
                              >
                                {product.isDisplayOnly ? 'Display Only' : 'Add to Cart'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[2rem] border-2 border-[#C82520] bg-white p-12 text-center">
                    <p className="text-lg text-[#7F0906]">No products found matching your search.</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 inline-flex rounded-full bg-[#C82520] px-6 py-2 text-sm font-semibold text-white hover:bg-[#7F0906]"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6 rounded-[2rem] border-2 border-[#C82520] bg-white p-6 shadow-xl">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E99C19]">Cart Summary</p>
                    <p className="text-xs text-[#7F0906]">{cartCount} item{cartCount === 1 ? '' : 's'} selected</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#7F0906]">Estimated total</span>
                    <span className="text-xl font-semibold text-[#7F0906]">Rs {cartTotal}</span>
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-[#C82520] bg-[#D7F2FF] p-6 text-center text-sm text-[#7F0906]">
                    <p>Your cart is empty.</p>
                    <p className="mt-2">Add items from the shop to review them here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.selectedColor ?? 'default'}`} className="rounded-3xl border-2 border-[#C82520] bg-[#D7F2FF] p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-[#7F0906]">{item.name}</p>
                            {item.selectedColor ? (
                              <p className="text-xs text-[#7F0906]">Color: {item.selectedColor}</p>
                            ) : null}
                            <p className="text-xs text-[#7F0906] mt-2">Available {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.selectedQuantity - 1, item.selectedColor)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E99C19] text-lg font-semibold text-[#7F0906] transition hover:bg-[#C82520] disabled:cursor-not-allowed disabled:opacity-40"
                              disabled={item.selectedQuantity <= 1}
                            >
                              −
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-semibold text-[#7F0906]">
                              {item.selectedQuantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.selectedQuantity + 1, item.selectedColor)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E99C19] text-lg font-semibold text-[#7F0906] transition hover:bg-[#C82520]"
                              disabled={item.selectedQuantity >= item.quantity}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-[#7F0906]">
                          <span>{item.price === null ? 'Contact Finance' : `Rs ${item.price} each`}</span>
                          <span>
                            {item.price === null
                              ? 'Contact Finance'
                              : `Rs ${item.price * item.selectedQuantity}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleGenerateReceipt}
                  disabled={cartItems.length === 0}
                  className="mt-4 w-full rounded-full bg-[#C82520] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7F0906] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Proceed to Generate Receipt
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 inline-flex items-center justify-center rounded-full bg-[#C82520] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7F0906]/20 transition hover:bg-[#7F0906]"
      >
        View Cart ({cartCount})
      </button>

      {isCartOpen ? (
        <div className="fixed inset-0 z-50 flex bg-[#7F0906]/20 p-4 lg:hidden">
          <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto rounded-[2rem] border-2 border-[#C82520] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E99C19]">Your Cart</p>
                <p className="text-xs text-[#7F0906]">{cartCount} item{cartCount === 1 ? '' : 's'}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F2FF] text-[#7F0906] transition hover:bg-[#E99C19]"
                aria-label="Close cart drawer"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="rounded-3xl border-2 border-[#C82520] bg-[#D7F2FF] p-6 text-sm text-[#7F0906]">
                <p>Your cart is empty.</p>
                <p className="mt-2">Add items from the shop to review them here.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor ?? 'default'}`} className="rounded-3xl border-2 border-[#C82520] bg-[#D7F2FF] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#7F0906]">{item.name}</p>
                        {item.selectedColor ? (
                          <p className="text-xs text-[#7F0906]">Color: {item.selectedColor}</p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.selectedQuantity - 1, item.selectedColor)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E99C19] text-lg font-semibold text-[#7F0906] transition hover:bg-[#C82520] disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={item.selectedQuantity <= 1}
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold text-[#7F0906]">
                          {item.selectedQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.selectedQuantity + 1, item.selectedColor)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E99C19] text-lg font-semibold text-[#7F0906] transition hover:bg-[#C82520]"
                          disabled={item.selectedQuantity >= item.quantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-3xl border-2 border-[#C82520] bg-[#D7F2FF] p-4">
                  <div className="flex items-center justify-between text-sm text-[#7F0906]">
                    <span>Total</span>
                    <span className="font-semibold text-[#7F0906]">Rs {cartTotal}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      handleGenerateReceipt();
                    }}
                    className="mt-4 w-full rounded-full bg-[#C82520] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7F0906]"
                  >
                    Proceed to Generate Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
