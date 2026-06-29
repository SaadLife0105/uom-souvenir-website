"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Image from "next/image";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import uomLogo from "@/app/images/sceo-logo.png";
import { navLinks } from "@/data/store-data";
import { useCart } from "@/context/CartContext";
import { blackV, redV, creamV, whiteV } from "@/constants/variables";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition"
    style={{ color: blackV, border: `1px solid color-mix(in srgb, ${whiteV} 30%, transparent)` }}
  >
    <span className="sr-only">{label}</span>
    {icon}
  </button>
);

export default function Navbar() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#home");
  const [isOpen, setIsOpen] = useState(false);
  const isCartPage = pathname === "/cart";
  const isShopPage = pathname === "/shop";

  useEffect(() => {
    if (isShopPage) {
      setActiveHref("#shop");
      return;
    }

    if (isCartPage) {
      setActiveHref(navLinks[0]?.href ?? "#home");
      return;
    }

    const offset = 96;

    const handleScroll = () => {
      let current = navLinks[0]?.href ?? "#home";

      navLinks.forEach((link: { href: string }) => {
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
  }, [isCartPage, isShopPage, pathname]);

  const { cartItems } = useCart();
  const cartQuantity = cartItems.reduce((count, item) => count + item.selectedQuantity, 0);

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-4 bg-transparent">
      <div className="relative mx-auto w-[95%] max-w-7xl">
      <div className="flex h-[59px] md:h-16 w-full items-center gap-4 rounded-3xl px-4 shadow-xl backdrop-blur-md flex-nowrap" style={{ backgroundColor: `color-mix(in srgb, ${whiteV} 75%, transparent)`, border: `1px solid color-mix(in srgb, ${whiteV} 40%, transparent)` }}>
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden shrink-0 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" style={{ color: blackV }} />
          ) : (
            <Menu className="h-6 w-6" style={{ color: blackV }} />
          )}
        </button>

        {/* Logo */}
        <a href="#home" className="flex min-w-0 items-center gap-3 rounded-3xl bg-transparent pl-0 pr-4 py-2 transition hover:text-[var(--color-red)]" style={{ color: blackV }} onClick={() => setIsOpen(false)}>
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center translate-y-[2px]">
            <Image
              src={uomLogo}
              alt="University Of Mauritius shield logo"
              width={48}
              height={48}
              className="h-[48px] w-[48px] object-contain"
            />
          </div>
          <div className="hidden min-w-0 flex-col justify-center sm:flex md:min-w-[12rem]">
            <span className="truncate text-sm font-semibold" style={{ color: blackV }}>Strategic Communications & Engagement Office</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium" style={{ color: blackV }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[var(--color-red)]">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Cart and User Icons */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:flex">
          <a
            href="/cart"
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition ${
              isCartPage ? "" : ""
            }`}
            style={{ color: blackV, border: isCartPage ? `1px solid ${redV}` : `1px solid color-mix(in srgb, ${whiteV} 25%, transparent)` }}
            aria-label="Cart"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag className="h-5 w-5" style={{ color: blackV }} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold" style={{ backgroundColor: redV, color: creamV }}>
              {cartQuantity}
            </span>
          </a>
          <IconButton label="Account" icon={<User className="h-5 w-5" style={{ color: blackV }} />} />
        </div>
      </div>

      {/* Mobile Navigation Dropdown - Smooth Expansion */}
      <nav
        className={`block md:hidden absolute top-[64px] left-0 right-0 w-full rounded-2xl backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: `color-mix(in srgb, ${whiteV} 75%, transparent)`, border: `1px solid color-mix(in srgb, ${whiteV} 40%, transparent)` }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium transition hover:text-[var(--color-red)] rounded-lg"
              style={{ color: blackV }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      </div>
    </header>
  );
}
