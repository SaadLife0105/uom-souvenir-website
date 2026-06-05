import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeader from "@/components/SectionHeader";
import WorkflowStepCard from "@/components/WorkflowStepCard";
import CartNoticeBanner from "@/components/CartNoticeBanner";
import { featuredProducts, bestSellers, features, testimonials, workflowSteps } from "@/components/store-data";

export default function Home() {
  return (
    <div className="bg-[#0d1f33] text-[#eef3fb]">
      <Navbar />

      <main className="pt-16 md:pt-20">
        <Hero />

        <section id="shop" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            <SectionHeader
              eyebrow="Featured products"
              title="Campus essentials with premium finishes."
              description="Handpicked University of Mauritius favorites with comfortable silhouettes, student-ready materials and clean finishing touches."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <PromoBanner />

        <section id="best-sellers" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            <SectionHeader
              eyebrow="Best sellers"
              title="Loved by students and alumni."
              description="Browse the top campus picks, proven favorites that students keep coming back for."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            <SectionHeader
              eyebrow="How it works"
              title="Reserve your souvenirs in three simple steps."
              description="The portal reserves your items, generates a payment receipt, and prepares your order for collection at the UoM Finance Office."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {workflowSteps.map((step) => (
                <WorkflowStepCard key={step.step} step={step.step} title={step.title} description={step.description} />
              ))}
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <CartNoticeBanner />
              <div className="rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Generate receipt</p>
                <h3 className="mt-3 text-2xl font-semibold text-[#eef3fb]">Reserve your items and receive payment details instantly.</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#99a7c0]">
                  This portal reserves your items and prepares a formal receipt for the Finance Office. Bring your digital or printed email receipt to complete payment and collect your order.
                </p>
                <a
                  href="#shop"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#faa153] px-6 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]"
                >
                  Generate Receipt
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <SectionHeader
                  eyebrow="Why choose us"
                  title="Premium quality, authentic UoM campus merchandise."
                  description="We bring together official University of Mauritius products, sustainable materials and a calm shopping experience built around student needs."
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="text-center">
              <SectionHeader
                eyebrow="Testimonials"
                title="Real feedback from campus shoppers."
                description="Students, alumni and faculty share what they love most about the UoM souvenir experience."
                className="text-center"
                wideDescription
              />
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
