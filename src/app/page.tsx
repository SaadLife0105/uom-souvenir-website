import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import CategoryCard from "@/components/home/CategoryCard";
import BestSellers from "@/components/home/BestSellers";
import FaqAccordion from "@/components/home/FaqAccordion";
import FeedbackCard from "@/components/home/FeedbackCard";
import SectionHeader from "@/components/SectionHeader";
import WorkflowStepCard from "@/components/home/WorkflowStepCard";
import { categories, testimonials, workflowSteps } from "@/data/store-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <div className="bg-[#D7F2FF]">
          <section id="categories" className="w-full px-4 py-16 md:px-8">
            <div className="space-y-8">
              <SectionHeader
                eyebrow="Categories"
                title="Discover souvenirs across every campus collection."
              />
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.title}
                    title={category.title}
                    image={category.image}
                    href={category.href}
                    bgColor={category.bgColor}
                    textColor={category.textColor}
                  />
                ))}
              </div>
            </div>
          </section>

          <BestSellers />

        <section id="steps" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border-2 border-[#C82520] bg-white p-8 shadow-xl sm:p-10">
            <SectionHeader
              eyebrow="Steps"
              title="Reserve your souvenirs in 3 simple steps."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {workflowSteps.map((step) => (
                <WorkflowStepCard
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4 text-left">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#7F0906]">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="w-full max-w-full text-sm leading-7 text-[#7F0906]">
              Everything you need to know about reserving items, generating invoices, and collecting your University of Mauritius souvenirs.
            </p>
          </div>
          <div className="mt-10 grid gap-4">
            <FaqAccordion />
          </div>
        </section>

        <section id="feedback" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-10 text-left">
            <div className="max-w-3xl">
              <SectionHeader
                eyebrow="Feedback"
                title="Students, alumni and faculty share what they love most about the UoM souvenir experience."
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <FeedbackCard
                  key={`${testimonial.name}-${index}`}
                  name={testimonial.name}
                  role={testimonial.role}
                  quote={testimonial.review}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      </main>

      <Footer />
    </div>
  );
}
