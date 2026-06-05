'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { shopProducts } from '@/components/store-data';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function ShopPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleAddToCart = (product: typeof shopProducts[0], color: string) => {
    const quantity = quantities[`${product.id}-${color}`] || 1;
    addToCart(product, quantity, color);
    // Reset quantity input
    setQuantities((prev) => ({ ...prev, [`${product.id}-${color}`]: 0 }));
  };

  const handleQuantityChange = (productId: string, color: string, value: number) => {
    const key = `${productId}-${color}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, value),
    }));
  };

  const handleGenerateReceipt = () => {
    router.push('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1f33] text-[#eef3fb]">
      <Navbar />

      <main className="flex-1 pt-16 md:pt-20 pb-32">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            {/* Section Header */}
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Browse & Shop</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#eef3fb]">
                Complete Collection
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#99a7c0]">
                Explore all 20 UOM souvenir items. Use the search bar to find your favorites, select your preferred color, and add to cart. Display items are shown for reference only.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by product name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-[#0d1f33] px-6 py-4 text-[#eef3fb] placeholder-[#99a7c0] border border-[#3f5a80] focus:outline-none focus:ring-2 focus:ring-[#faa153]"
                />
                <svg
                  className="absolute right-4 top-4 h-6 w-6 text-[#99a7c0]"
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
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-[#99a7c0]">
                Showing {filteredProducts.length} of {shopProducts.length} products
              </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.3)]"
                  >
                    {/* Product Image */}
                    <div className="relative h-72 overflow-hidden bg-[#0d1f33]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {/* Display Item Badge */}
                      {product.isDisplayOnly && (
                        <div className="absolute top-3 right-3 inline-flex items-center rounded-full bg-[#e67e22] px-3 py-1">
                          <span className="text-xs font-semibold text-white">Display Item</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-base font-semibold text-[#eef3fb]">{product.name}</p>
                          <p className="text-xs text-[#99a7c0] mt-1">{product.description}</p>
                        </div>

                        {/* Price */}
                        <div>
                          {product.price === null ? (
                            <p className="text-sm font-semibold text-[#faa153]">Price: Contact Finance</p>
                          ) : (
                            <p className="text-base font-semibold text-[#eef3fb]">Rs {product.price}</p>
                          )}
                        </div>

                        {/* Colors */}
                        {product.colors.length > 0 && !product.isDisplayOnly && (
                          <div>
                            <p className="text-xs font-medium text-[#99a7c0] mb-2">Color:</p>
                            <select className="w-full rounded-lg bg-[#0d1f33] px-3 py-2 text-sm text-[#eef3fb] border border-[#3f5a80] focus:outline-none focus:ring-2 focus:ring-[#faa153]">
                              {product.colors.map((color) => (
                                <option key={color} value={color}>
                                  {color}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Quantity Controls */}
                        {!product.isDisplayOnly && (
                          <div>
                            <p className="text-xs font-medium text-[#99a7c0] mb-2">Quantity:</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  const color = product.colors[0] || '';
                                  const key = `${product.id}-${color}`;
                                  const current = quantities[key] || 0;
                                  handleQuantityChange(product.id, color, current - 1);
                                }}
                                className="rounded-lg bg-[#0d1f33] px-3 py-2 text-[#faa153] font-semibold hover:bg-[#1a2d42] transition"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                max={product.quantity}
                                value={quantities[`${product.id}-${product.colors[0] || ''}`] || 0}
                                onChange={(e) => {
                                  const color = product.colors[0] || '';
                                  handleQuantityChange(product.id, color, parseInt(e.target.value) || 0);
                                }}
                                className="w-12 rounded-lg bg-[#0d1f33] px-2 py-2 text-center text-[#eef3fb] border border-[#3f5a80] focus:outline-none focus:ring-2 focus:ring-[#faa153]"
                              />
                              <button
                                onClick={() => {
                                  const color = product.colors[0] || '';
                                  const key = `${product.id}-${color}`;
                                  const current = quantities[key] || 0;
                                  handleQuantityChange(product.id, color, Math.min(current + 1, product.quantity));
                                }}
                                className="rounded-lg bg-[#0d1f33] px-3 py-2 text-[#faa153] font-semibold hover:bg-[#1a2d42] transition"
                              >
                                +
                              </button>
                              <span className="text-xs text-[#99a7c0]">/ {product.quantity}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            const color = product.colors[0] || '';
                            handleAddToCart(product, color);
                          }}
                          disabled={product.isDisplayOnly}
                          className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                            product.isDisplayOnly
                              ? 'bg-[#3f5a80] text-[#99a7c0] cursor-not-allowed'
                              : 'bg-[#faa153] text-[#0d1f33] hover:bg-[#e69d6d]'
                          }`}
                        >
                          {product.isDisplayOnly ? 'Display Only' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-12 text-center">
                <p className="text-lg text-[#99a7c0]">No products found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 inline-flex rounded-full bg-[#faa153] px-6 py-2 text-sm font-semibold text-[#0d1f33] hover:bg-[#e69d6d]"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Sticky Generate Receipt Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d1f33] border-t border-[#3f5a80] px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={handleGenerateReceipt}
            className="w-full rounded-full bg-[#faa153] px-6 py-4 text-base font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]"
          >
            Generate Receipt
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
