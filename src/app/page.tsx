import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeader from "@/components/SectionHeader";
import WorkflowStepCard from "@/components/WorkflowStepCard";
import { categories, shopProducts, features, testimonials, workflowSteps } from "@/components/store-data";

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
              {shopProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.3)]">
                  <div className="relative h-72 overflow-hidden bg-[#0d1f33]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-base font-semibold text-[#eef3fb]">{product.name}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <a href="/shop" className="inline-flex w-full items-center justify-center rounded-full bg-[#faa153] px-4 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]">
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PromoBanner />

        <section id="workflow" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
            <SectionHeader
              eyebrow="How it works"
              title="Reserve your souvenirs in two simple steps."
              description="The portal reserves your items and prepares your order for collection at the UoM Finance Office."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {workflowSteps.map((step) => (
                <WorkflowStepCard key={step.step} step={step.step} title={step.title} description={step.description} />
              ))}
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
