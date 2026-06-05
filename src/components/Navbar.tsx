"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import PillNav from "./reactbits/PillNav";
import { navLinks } from "./store-data";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
  >
    <span className="sr-only">{label}</span>
    {icon}
  </button>
);

export default function Navbar() {
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#home");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("uom-theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    // ensure the html.dark class mirrors state and persist selection
    try {
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
      localStorage.setItem("uom-theme", theme);
    } catch (e) {
      /* ignore in non-browser environments */
    }
  }, [theme]);

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
      <div className="mx-auto flex h-16 w-[95%] max-w-7xl items-center gap-4 rounded-[2rem] bg-white/90 px-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl ring-1 ring-slate-200/80 dark:bg-slate-950/95 dark:ring-slate-700/60">
        <a
          href="#home"
          className="flex items-center gap-3 rounded-2xl bg-[#009AD9] px-3 py-2 text-white shadow-sm transition hover:bg-[#007fbf]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#009AD9] font-semibold">U</div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold leading-none">UoM Souvenir</span>
            <span className="text-xs uppercase tracking-[0.28em] text-white/80">University Store</span>
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
          <a
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6 6h15l-1.5 9.5H8.5L6 6Zm2.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#E31A22] px-1.5 text-[10px] font-semibold text-white">
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
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => {
              // functional update to avoid stale closures
              setTheme((prev) => {
                const next = prev === "light" ? "dark" : "light";
                try {
                  if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", next === "dark");
                  localStorage.setItem("uom-theme", next);
                } catch (e) {}
                return next;
              });
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {theme === "light" ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
