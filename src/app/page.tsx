import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import CategoryCard from "@/components/home/CategoryCard";
import BestSellers from "@/components/home/BestSellers";
import FaqAccordion from "@/components/home/FaqAccordion";
import SectionHeader from "@/components/SectionHeader";
import WorkflowStepCard from "@/components/home/WorkflowStepCard";
import { categories, workflowSteps } from "@/data/store-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <div className="bg-[#D7F2FF]">
          <section id="categories" className="w-full px-2 py-2 md:px-3">
            <div className="space-y-2">
              <SectionHeader
                title="Categories"
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

        <section id="steps" className="mx-auto max-w-7xl px-2 py-2 sm:px-3 lg:px-4">
          <div className="overflow-hidden rounded-3xl border-2 border-[#C82520] bg-white p-4 shadow-xl sm:p-6">
            <SectionHeader
              eyebrow="Steps"
              title="Reserve your souvenirs in 3 simple steps."
            />
            <div className="mt-2 grid gap-4 md:grid-cols-3">
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

        <section id="faq" className="mx-auto max-w-7xl px-2 py-2 sm:px-3 lg:px-4">
          <div className="space-y-2 text-left">
            <SectionHeader
                title="Frequently Asked Questions (FAQ)"
              />
          </div>
          <div className="mt-2 grid gap-4">
            <FaqAccordion />
          </div>
        </section>

      </div>
      </main>

      <Footer />
    </div>
  );
}
