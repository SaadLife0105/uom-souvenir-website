"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Image from "next/image";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import uomLogo from "@/app/images/uom-logo.png";
import { navLinks } from "@/data/store-data";
import { useCart } from "@/context/CartContext";
import { blackV, goldV, redV, creamV, whiteV } from "@/constants/variables";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-transparent transition hover:bg-[#FFCB70] hover:text-[#F5F6F4]"
    style={{ color: blackV }}
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
      <div className="flex h-[59px] md:h-16 w-full items-center gap-4 rounded-3xl border border-white/40 px-4 shadow-xl backdrop-blur-md flex-wrap md:flex-nowrap" style={{ backgroundColor: `${whiteV}BF` }}>
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" style={{ color: blackV }} />
          ) : (
            <Menu className="h-6 w-6" style={{ color: blackV }} />
          )}
        </button>

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 rounded-3xl bg-transparent pl-0 pr-4 py-2 transition hover:text-[#E1423D]" style={{ color: blackV }} onClick={() => setIsOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center">
            <Image
              src={uomLogo}
              alt="University Of Mauritius shield logo"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </div>
          <div className="hidden min-w-[12rem] flex-col sm:flex">
            <span className="text-sm font-semibold" style={{ color: blackV }}>University Of Mauritius</span>
            <span className="text-xs" style={{ color: blackV }}>Souvenir Shop</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium" style={{ color: blackV }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#E1423D]">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Cart and User Icons */}
        <div className="ml-auto flex items-center gap-3 md:flex">
          <a
            href="/cart"
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-transparent transition hover:bg-[#FFCB70] hover:text-[#F5F6F4] ${
              isCartPage ? "border-[#E1423D]" : ""
            }`}
            style={{ color: blackV }}
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
        className={`block md:hidden absolute top-[64px] left-0 right-0 w-full border border-white/40 rounded-2xl backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: `${whiteV}BF` }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium transition hover:text-[#E1423D] hover:bg-white/10 rounded-lg"
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
