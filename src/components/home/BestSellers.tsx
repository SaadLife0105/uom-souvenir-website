"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bestSellers } from "@/data/store-data";
import BestSellersCard from "./BestSellersCard";
import SectionHeader from "@/components/SectionHeader";

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    // Scroll by one card width (1/3 of container + gap)
    const cardWidth = scrollRef.current.offsetWidth / 3;
    scrollRef.current.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section id="best-sellers" className="w-full px-4 py-16 md:px-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="Discover our Best Sellers"
            className="max-w-2xl"
          />
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-white/60 text-gray-700 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-white/60 text-gray-700 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {bestSellers.map((campaign) => (
            <BestSellersCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
