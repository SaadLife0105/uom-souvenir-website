"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Image from "next/image";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import uomLogo from "@/app/images/uom-logo.png";
import { navLinks } from "@/data/store-data";
import { useCart } from "@/context/CartContext";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-transparent text-[#7F0906] transition hover:bg-[#E99C19] hover:text-white"
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
      <div className="mx-auto flex h-20 w-[95%] max-w-7xl items-center gap-4 rounded-3xl border border-white/25 bg-transparent px-4 shadow-xl backdrop-blur-xl flex-wrap md:flex-nowrap">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-[#7F0906]" />
          ) : (
            <Menu className="h-6 w-6 text-[#7F0906]" />
          )}
        </button>

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 rounded-3xl bg-transparent px-4 py-3 text-[#7F0906] transition hover:text-[#C82520]" onClick={() => setIsOpen(false)}>
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white p-2">
            <Image
              src={uomLogo}
              alt="University Of Mauritius shield logo"
              width={44}
              height={44}
              className="w-auto h-auto object-contain"
            />
          </div>
          <div className="hidden min-w-[12rem] flex-col sm:flex">
            <span className="text-sm font-semibold text-[#7F0906]">University Of Mauritius</span>
            <span className="text-xs text-[#7F0906] text-opacity-80">Souvenir Shop</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium text-[#7F0906]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#C82520]">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Cart and User Icons */}
        <div className="ml-auto flex items-center gap-3 md:flex">
          <a
            href="/cart"
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-transparent text-[#7F0906] transition hover:bg-[#E99C19] hover:text-white ${
              isCartPage ? "border-[#C82520] text-white" : ""
            }`}
            aria-label="Cart"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag className="h-5 w-5 text-[#7F0906]" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#C82520] px-1.5 text-[10px] font-semibold text-white">
              {cartQuantity}
            </span>
          </a>
          <IconButton label="Account" icon={<User className="h-5 w-5 text-[#7F0906]" />} />
        </div>
      </div>

      {/* Mobile Navigation Dropdown - Smooth Expansion */}
      <nav 
        className={`block md:hidden absolute top-24 left-4 right-4 w-[calc(100%-2rem)] bg-white/10 border border-white/25 rounded-2xl backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium text-[#7F0906] transition hover:text-[#C82520] hover:bg-white/10 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
