'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { ShopProductData } from '@/db/queries';
import ProductCard from './ProductCard';
import CartSummary from './CartSummary';
import { darkBlueHex, whiteHex, goldHex, creamHex, paleBlueHex, redHex } from '@/constants/variables';

type PriceBucket = 'all' | 'under-250' | '250-500' | 'over-500';
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

const PRICE_BUCKETS: { value: PriceBucket; label: string }[] = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-250', label: 'Under Rs 250' },
  { value: '250-500', label: 'Rs 250 - Rs 500' },
  { value: 'over-500', label: 'Over Rs 500' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

const ALL_CATEGORIES = 'All Products';

function matchesPriceBucket(priceCents: number, bucket: PriceBucket) {
  const price = priceCents / 100;
  switch (bucket) {
    case 'under-250':
      return price < 250;
    case '250-500':
      return price >= 250 && price <= 500;
    case 'over-500':
      return price > 500;
    default:
      return true;
  }
}

export default function ShopContent({ products }: { products: ShopProductData[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceBucket, setPriceBucket] = useState<PriceBucket>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const categories = useMemo(
    () => [ALL_CATEGORIES, ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const colors = useMemo(() => {
    const seen = new Map<string, string>();
    products.forEach((product) =>
      product.colors.forEach((color) => seen.set(color.name, color.hexCode))
    );
    return Array.from(seen, ([name, hexCode]) => ({ name, hexCode }));
  }, [products]);

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== ALL_CATEGORIES || selectedColor !== null || priceBucket !== 'all';

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesQuery =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        (product.description?.toLowerCase().includes(query) ?? false);
      const matchesCategory = selectedCategory === ALL_CATEGORIES || product.category === selectedCategory;
      const matchesColor = selectedColor === null || product.colors.some((c) => c.name === selectedColor);
      return matchesQuery && matchesCategory && matchesColor && matchesPriceBucket(product.priceCents, priceBucket);
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // ponytail: "Newest" keeps DB insertion order — no createdAt sort needed at this scale
        break;
    }
    return sorted;
  }, [products, searchQuery, selectedCategory, selectedColor, priceBucket, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(ALL_CATEGORIES);
    setSelectedColor(null);
    setPriceBucket('all');
  };

  return (
    <div>
      {/* Hero */}
      <section className="pb-10 pt-28" style={{ backgroundColor: paleBlueHex }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: darkBlueHex, fontFamily: 'var(--font-playfair)' }}>
            Shop
          </h1>
          <p className="mt-2 text-base" style={{ color: darkBlueHex }}>
            Explore our official UOM merchandise.
          </p>

          <div className="relative mt-6 max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border-0 py-3.5 pl-5 pr-12 text-sm shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: whiteHex, color: darkBlueHex, outlineColor: goldHex }}
            />
            <button
              type="button"
              aria-label="Search"
              className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl transition"
              style={{ backgroundColor: darkBlueHex }}
            >
              <Search className="h-4 w-4" style={{ color: whiteHex }} />
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8" style={{ backgroundColor: creamHex }}>
        <div className="grid gap-6 lg:grid-cols-[240px_1fr_300px] lg:items-start">
          {/* Filters */}
          <aside className="order-1 rounded-3xl shadow-md lg:sticky lg:top-28" style={{ backgroundColor: whiteHex }}>
            <div className="flex items-center gap-2 rounded-t-3xl px-5 py-4" style={{ backgroundColor: darkBlueHex, color: whiteHex }}>
              <SlidersHorizontal className="h-4 w-4" />
              <p className="font-semibold">Filter</p>
            </div>

            <div className="flex flex-col gap-6 p-5">
              <div>
                <p className="mb-3 text-sm font-semibold" style={{ color: darkBlueHex }}>Categories</p>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <label key={category} className="flex cursor-pointer items-center gap-2 text-sm" style={{ color: darkBlueHex }}>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 cursor-pointer"
                        style={{ accentColor: darkBlueHex }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold" style={{ color: darkBlueHex }}>Colors</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => setSelectedColor((prev) => (prev === color.name ? null : color.name))}
                      className="h-6 w-6 cursor-pointer rounded-full border-2 transition"
                      style={{
                        backgroundColor: color.hexCode,
                        borderColor: selectedColor === color.name ? goldHex : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold" style={{ color: darkBlueHex }}>Price</p>
                <select
                  value={priceBucket}
                  onChange={(e) => setPriceBucket(e.target.value as PriceBucket)}
                  className="w-full cursor-pointer rounded-xl border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: `color-mix(in srgb, ${darkBlueHex} 20%, transparent)`, color: darkBlueHex }}
                >
                  {PRICE_BUCKETS.map((bucket) => (
                    <option key={bucket.value} value={bucket.value}>{bucket.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold" style={{ color: darkBlueHex }}>Sort By</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full cursor-pointer rounded-xl border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: `color-mix(in srgb, ${darkBlueHex} 20%, transparent)`, color: darkBlueHex }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="cursor-pointer text-left text-sm font-semibold transition hover:underline"
                  style={{ color: redHex }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="order-3 lg:order-2">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: darkBlueHex }}>
                {visibleProducts.length} Product{visibleProducts.length === 1 ? '' : 's'}
              </p>
              <div className="hidden items-center gap-2 text-sm sm:flex" style={{ color: darkBlueHex }}>
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="cursor-pointer rounded-xl border px-3 py-1.5 outline-none"
                  style={{ borderColor: `color-mix(in srgb, ${darkBlueHex} 20%, transparent)` }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl p-12 text-center shadow-md" style={{ backgroundColor: whiteHex }}>
                <p className="text-base" style={{ color: darkBlueHex }}>No products match your filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition"
                  style={{ backgroundColor: darkBlueHex, color: whiteHex }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Cart summary */}
          <aside className="order-2 lg:sticky lg:top-28 lg:order-3">
            <CartSummary />
          </aside>
        </div>
      </section>
    </div>
  );
}
