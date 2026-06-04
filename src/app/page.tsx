import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import { categories, featuredProducts, bestSellers, features, testimonials } from "@/components/store-data";

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <Navbar />

      <main>
        <Hero />

        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 pb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Featured categories</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Designed for campus life.</h2>
            </div>
            <a href="#shop" className="text-sm font-semibold text-slate-700 transition hover:text-slate-900">
              View all categories →
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured products</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Campus essentials with premium finishes.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Handpicked University of Mauritius favorites with comfortable silhouettes, student-ready materials and clean finishing touches.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <PromoBanner />

        <section id="best-sellers" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Best sellers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Loved by students and alumni.</h2>
            </div>
            <div className="text-sm text-slate-600">
              Swipe the collection on mobile, or browse the grid on desktop.
            </div>
          </div>
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4 pr-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:pr-0">
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[20rem] sm:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Why choose us</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Premium quality, authentic campus merchandise.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                We bring together official University of Mauritius products, sustainable materials and a calm shopping experience built around student needs.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Real feedback from campus shoppers.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
