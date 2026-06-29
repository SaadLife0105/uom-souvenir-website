import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import CategoryCard from "@/components/home/CategoryCard";
import BestSellers from "@/components/home/BestSellers";
import FaqAccordion from "@/components/home/FaqAccordion";
import StepsSection from "@/components/home/StepsSection";
import { categories } from "@/data/store-data";
import { LayoutGrid } from "lucide-react";
import { paleBlueHex, redHex, darkBlueHex, goldHex, creamHex } from "@/constants/variables";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <div style={{ backgroundColor: paleBlueHex }}>
          <section id="categories" className="relative w-full overflow-hidden px-[15px] py-2 md:px-[20px]">
            <div className="space-y-2">
              <div className="pt-6 pb-2 flex items-start gap-5">
                <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: goldHex, backgroundColor: creamHex }}>
                  <LayoutGrid className="h-9 w-9" style={{ color: darkBlueHex }} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: darkBlueHex }}>
                    Shop by <span style={{ color: redHex }}>Category</span>
                  </h2>
                  <p className="mt-2 text-sm leading-7" style={{ color: darkBlueHex }}>
                    Find the perfect souvenir from our most loved categories.
                  </p>
                </div>
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

        <FaqAccordion />

      </div>
      </main>

      <Footer />
    </div>
  );
}
