"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { bestSellers } from "@/data/store-data";
import BestSellersCard from "./BestSellersCard";
import { camelHex, racingRedHex, floralWhiteHex } from "@/constants/variables";

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateButtons);
  }, [updateButtons]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    // Advance by one actual card (+ the flex gap) so it works at any breakpoint.
    const step = card ? card.offsetWidth + 12 : el.offsetWidth / 3;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const btnBase =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";
  const btnStyle = { color: camelHex, backgroundColor: camelHex, border: `1px solid ${camelHex}`, outlineColor: camelHex };

  return (
    <section id="best-sellers" className="w-full px-[15px] pb-2 md:px-[20px]">
      <div className="space-y-2">
        <div className="pt-6 pb-2 flex items-start gap-5">
          <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: camelHex, backgroundColor: floralWhiteHex }}>
            <TrendingUp className="h-9 w-9" style={{ color: camelHex }} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: camelHex }}>
              Discover our <span style={{ color: racingRedHex }}>Best Sellers</span>
            </h2>
            <p className="mt-[4px] text-base leading-7" style={{ color: camelHex }}>
              Our customers can&apos;t get enough of these.
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={`${btnBase} left-2 ${atStart ? "pointer-events-none opacity-0" : "opacity-100"}`}
            style={btnStyle}
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {bestSellers.map((campaign) => (
              <BestSellersCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className={`${btnBase} right-2 ${atEnd ? "pointer-events-none opacity-0" : "opacity-100"}`}
            style={btnStyle}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
