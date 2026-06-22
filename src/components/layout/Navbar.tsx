"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Image from "next/image";
import { Search, ShoppingBag, User } from "lucide-react";
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
    <header className="fixed inset-x-0 top-6 z-50 px-4">
      <div className="mx-auto flex h-20 w-[95%] max-w-7xl items-center gap-4 rounded-3xl border border-white/25 bg-transparent px-4 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-3 rounded-3xl bg-transparent px-4 py-3 text-[#7F0906] transition hover:text-[#C82520]">
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

        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium text-[#7F0906]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#C82520]">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <IconButton label="Search" icon={<Search className="h-5 w-5 text-[#7F0906]" />} />
          <a
            href="/cart"
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-transparent text-[#7F0906] transition hover:bg-[#E99C19] hover:text-white ${
              isCartPage ? "border-[#C82520] text-white" : ""
            }`}
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5 text-[#7F0906]" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#C82520] px-1.5 text-[10px] font-semibold text-white">
              {cartQuantity}
            </span>
          </a>
          <IconButton label="Account" icon={<User className="h-5 w-5 text-[#7F0906]" />} />
        </div>
      </div>
    </header>
  );
}
