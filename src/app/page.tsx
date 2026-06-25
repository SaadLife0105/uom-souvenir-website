import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import CategoryCard from "@/components/home/CategoryCard";
import BestSellers from "@/components/home/BestSellers";
import FaqAccordion from "@/components/home/FaqAccordion";
import SectionHeader from "@/components/SectionHeader";
import StepsSection from "@/components/home/StepsSection";
import { categories } from "@/data/store-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <div className="bg-[#D7F2FF]">
          <section id="categories" className="relative w-full overflow-hidden px-[15px] py-2 md:px-[20px]">
            <div className="space-y-2">
              <div className="pt-6 pb-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-[#1E2019] sm:text-4xl">
                  Shop by <span className="text-[#C82520]">Category</span>
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#475569]">
                  Find the perfect souvenir from our most loved categories.
                </p>
              </div>
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

        <StepsSection />

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
