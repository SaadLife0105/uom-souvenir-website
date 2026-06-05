"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import uomLogo from "@/app/images/uom-logo.png";
import PillNav from "./reactbits/PillNav";
import { navLinks } from "./store-data";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3f5a80] bg-[#162c47] text-[#eef3fb] transition hover:bg-[#0d1f33] hover:text-[#faa153]"
  >
    <span className="sr-only">{label}</span>
    {icon}
  </button>
);

export default function Navbar() {
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#home");

  useEffect(() => {
    const offset = 96;

    const handleScroll = () => {
      let current = navLinks[0]?.href ?? "#home";

      navLinks.forEach((link) => {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);

        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top;

        if (top <= offset) {
          current = link.href;
        }
      });

      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex h-16 w-[95%] max-w-7xl items-center gap-4 rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33]/95 px-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-3 rounded-full bg-[#162c47] px-3 py-2 text-[#eef3fb] shadow-sm shadow-[#0d1f33]/20 transition hover:bg-[#0d1f33]">
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-[#eef3fb]">
            <Image src={uomLogo} alt="UoM Souvenir Store Logo" width={50} height={50} className="object-contain" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">UoM Souvenir Store</span>
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <PillNav
            logo={uomLogo.src}
            logoAlt="University of Mauritius logo"
            items={navLinks}
            activeHref={activeHref}
            className="w-full max-w-2xl"
            baseColor="#eef3fb"
            pillColor="#162c47"
            hoveredPillTextColor="#faa153"
            pillTextColor="#eef3fb"
            showLogo={false}
            onMobileMenuClick={() => {}}
          />
        </div>

        <div className="flex flex-1 justify-center md:hidden">
          <PillNav
            logo={uomLogo.src}
            logoAlt="University of Mauritius logo"
            items={navLinks}
            activeHref={activeHref}
            className="w-full max-w-xs"
            baseColor="#eef3fb"
            pillColor="#162c47"
            hoveredPillTextColor="#faa153"
            pillTextColor="#eef3fb"
            showLogo={false}
            onMobileMenuClick={() => {}}
          />
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3f5a80] bg-[#162c47] text-[#eef3fb] transition hover:bg-[#0d1f33] hover:text-[#faa153]"
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6 6h15l-1.5 9.5H8.5L6 6Zm2.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#faa153] px-1.5 text-[10px] font-semibold text-[#0d1f33]">
              3
            </span>
          </a>
          <IconButton
            label="Account"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.67-6 4v1h12v-1c0-2.33-2.67-4-6-4Z" />
              </svg>
            }
          />
        </div>
      </div>
    </header>
  );
}
