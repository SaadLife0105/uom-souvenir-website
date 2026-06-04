"use client";

import { useState } from "react";
import { navLinks } from "./store-data";

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    {open ? (
      <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.17 7.1 4.3a1 1 0 0 0-1.4 1.4L10.83 12l-5.13 5.1a1 1 0 0 0 1.4 1.4L12 14.83l4.9 4.86a1 1 0 0 0 1.4-1.4L13.17 12l5.13-5.1Z" />
    ) : (
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    )}
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-slate-950">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-md">
            U
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">University of Mauritius</p>
            <p className="text-base font-semibold">Souvenir Store</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button className="group rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
            <span className="sr-only">Search</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M10.5 18a7.5 7.5 0 1 1 5.303-2.197l4.45 4.45a1 1 0 0 1-1.414 1.414l-4.45-4.45A7.466 7.466 0 0 1 10.5 18Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="relative rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
            <span className="sr-only">Open cart</span>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1.5 text-xs font-semibold text-white">
              3
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M6 6h15l-1.5 9.5H8.5L6 6Zm2.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
            <span className="sr-only">User account</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.67-6 4v1h12v-1c0-2.33-2.67-4-6-4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900 md:hidden"
          aria-label="Open mobile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-5 shadow-lg md:hidden">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <button className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100">
              Search
              <span>⌕</span>
            </button>
            <button className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100">
              Cart
              <span>3</span>
            </button>
            <button className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100">
              Account
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
