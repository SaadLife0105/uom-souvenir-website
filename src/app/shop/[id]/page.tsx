import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, ChevronDown, Leaf, ShieldCheck, Gift } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/shop/ProductGallery';
import ProductBuyPanel from '@/components/shop/ProductBuyPanel';
import CartSummary from '@/components/shop/CartSummary';
import { getProductById } from '@/db/queries';
import { formatPrice } from '@/lib/price';
import { darkBlueHex, whiteHex, goldHex, creamHex } from '@/constants/variables';

// ponytail: static copy — the schema has no fields for care/shipping/returns text.
// Swap to DB-backed content if these need to vary per product.
const INFO_SECTIONS = [
  {
    title: 'Material & Care',
    body: 'Premium, durable materials. Follow the care label; cool wash and air dry to keep colours and prints looking their best.',
  },
  {
    title: 'Shipping & Delivery',
    body: 'Reserve online and collect from the UoM Finance Office. You will receive a receipt to present at pickup.',
  },
  {
    title: 'Returns & Exchanges',
    body: 'Unused items in original condition can be exchanged at the Finance Office within 7 days of collection.',
  },
];

// ponytail: static trust badges — not DB-backed.
const TRUST_BADGES = [
  { icon: Leaf, title: 'Premium Quality', description: 'High quality materials built to last.' },
  { icon: ShieldCheck, title: 'Official Merchandise', description: 'Authentic UOM souvenirs.' },
  { icon: Gift, title: 'Perfect Gift', description: 'A thoughtful gift for any UOM pride.' },
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const subtleBorder = `color-mix(in srgb, ${darkBlueHex} 12%, transparent)`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pb-20 pt-28" style={{ backgroundColor: creamHex }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: darkBlueHex, outlineColor: goldHex }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-4 flex flex-wrap items-center gap-1.5 text-sm text-[#5b6b86]">
            <Link href="/shop" className="cursor-pointer transition hover:underline">Shop</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span>{product.category}</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span style={{ color: darkBlueHex }}>{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr_300px] lg:items-start">
            {/* Gallery + trust badges */}
            <div className="flex flex-col gap-6">
              <ProductGallery images={product.images} name={product.name} />

              <div className="grid grid-cols-1 gap-4 rounded-3xl p-5 shadow-md sm:grid-cols-3" style={{ backgroundColor: whiteHex }}>
                {TRUST_BADGES.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: goldHex }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: darkBlueHex }}>{title}</p>
                      <p className="text-xs text-[#5b6b86]">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product info + buy panel + accordions */}
            <div className="flex flex-col gap-5">
              {/* ponytail: static "NEW" badge — no createdAt-based freshness rule. */}
              <span
                className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: goldHex, color: whiteHex }}
              >
                New
              </span>

              <div>
                <h1 className="text-3xl font-bold" style={{ color: darkBlueHex, fontFamily: 'var(--font-playfair)' }}>
                  {product.name}
                </h1>
                {/* ponytail: static tagline — no DB field for it. */}
                <p className="mt-1 text-sm text-[#5b6b86]">Timeless style. University pride.</p>
              </div>

              <p className="text-2xl font-bold" style={{ color: darkBlueHex }}>
                {formatPrice(product.priceCents)}
              </p>

              {product.description && (
                <p className="text-sm leading-7 text-[#5b6b86]">{product.description}</p>
              )}

              <ProductBuyPanel product={product} />

              {/* Info accordions — native <details> needs no client JS */}
              <div className="flex flex-col divide-y" style={{ borderColor: subtleBorder }}>
                {INFO_SECTIONS.map(({ title, body }) => (
                  <details key={title} className="group py-2" style={{ borderColor: subtleBorder }}>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ color: darkBlueHex, outlineColor: goldHex }}>
                      {title}
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="pb-2 text-sm leading-6 text-[#5b6b86]">{body}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Sticky cart summary */}
            <aside className="lg:sticky lg:top-28">
              <CartSummary />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
