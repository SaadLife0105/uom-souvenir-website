"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import PillNav from "./reactbits/PillNav";
import { navLinks } from "./store-data";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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
    <header className="fixed inset-x-0 top-4 md:top-6 z-50 px-4">
      <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-[2rem] bg-white/85 px-4 py-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl ring-1 ring-slate-200/80">
        <a
          href="#home"
          className="flex items-center gap-3 rounded-2xl bg-slate-950 px-3 py-2 text-white shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950 font-semibold">U</div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold leading-none">UoM Souvenir</span>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-400">University Store</span>
          </div>
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <PillNav
            logo="/uom-logo.svg"
            logoAlt="University of Mauritius logo"
            items={navLinks}
            activeHref={activeHref}
            className="w-full max-w-2xl"
            baseColor="#0f172a"
            pillColor="#ffffff"
            hoveredPillTextColor="#0f172a"
            pillTextColor="#0f172a"
            showLogo={false}
            onMobileMenuClick={() => {}}
          />
        </div>

        <div className="flex flex-1 justify-center md:hidden">
          <PillNav
            logo="/uom-logo.svg"
            logoAlt="University of Mauritius logo"
            items={navLinks}
            activeHref={activeHref}
            className="w-full max-w-xs"
            baseColor="#0f172a"
            pillColor="#ffffff"
            hoveredPillTextColor="#0f172a"
            pillTextColor="#0f172a"
            showLogo={false}
            onMobileMenuClick={() => {}}
          />
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <IconButton
            label="Search"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
          />
          <IconButton
            label="Cart"
            icon={
              <div className="relative">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M6 6h15l-1.5 9.5H8.5L6 6Zm2.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-semibold text-white">
                  3
                </span>
              </div>
            }
          />
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
