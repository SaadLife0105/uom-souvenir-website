"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import uomLogo from "@/app/images/sceo-logo.png";
import { navLinks } from "@/data/store-data";
import { useCart } from "@/context/CartContext";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { blackHex, redHex, whiteHex } from "@/constants/variables";

const IconButton = ({ label, icon }: { label: string; icon: ReactNode }) => (
  <button
    type="button"
    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition"
    style={{ color: blackHex, border: `1px solid ${blackHex}` }}
  >
    <span className="sr-only">{label}</span>
    {icon}
  </button>
);

export default function Navbar() {
  const pathname = usePathname();
  const { navigateToSection, isHome } = useSectionScroll();
  const [activeHref, setActiveHref] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isCartPage = pathname === "/cart";
  const isShopPage = pathname === "/shop";

  const scrollLinks = navLinks.filter((link) => link.type === "scroll");

  useEffect(() => {
    if (isShopPage) {
      setActiveHref("/shop");
      return;
    }

    if (isCartPage || !isHome) {
      setActiveHref("");
      return;
    }

    const offset = 96;

    const handleScroll = () => {
      let current = "";

      scrollLinks.forEach((link) => {
        const element = document.getElementById(link.sectionId);
        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top;

        if (top <= offset) {
          current = link.sectionId;
        }
      });

      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartPage, isShopPage, isHome, pathname]);

  const { cartItems } = useCart();
  const cartQuantity = cartItems.reduce((count, item) => count + item.selectedQuantity, 0);

  const renderNavLink = (className: string, onLinkClick: () => void) =>
    navLinks.map((link) => {
      if (link.type === "route") {
        return (
          <Link
            key={link.label}
            href={link.href}
            className={className}
            style={{ color: activeHref === link.href ? redHex : blackHex }}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        );
      }

      const href = isHome ? `#${link.sectionId}` : `/#${link.sectionId}`;
      return (
        <Link
          key={link.label}
          href={href}
          className={className}
          style={{ color: activeHref === link.sectionId ? redHex : blackHex }}
          onClick={navigateToSection(link.sectionId, onLinkClick)}
        >
          {link.label}
        </Link>
      );
    });

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-4 bg-transparent" style={{ ["--nav-hover"]: redHex } as React.CSSProperties}>
      <div className="relative mx-auto w-[95%] max-w-7xl">
      <div className="flex h-[59px] md:h-16 w-full items-center gap-4 rounded-3xl px-4 shadow-xl backdrop-blur-md flex-nowrap" style={{ backgroundColor: `color-mix(in srgb, ${whiteHex} 75%, transparent)`, border: `1px solid color-mix(in srgb, ${whiteHex} 40%, transparent)` }}>
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden shrink-0 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" style={{ color: blackHex }} />
          ) : (
            <Menu className="h-6 w-6" style={{ color: blackHex }} />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-3xl bg-transparent pl-0 pr-4 py-2 transition hover:text-[var(--nav-hover)]" style={{ color: blackHex }} onClick={() => setIsOpen(false)}>
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
            <span className="truncate text-sm font-semibold" style={{ color: blackHex }}>Strategic Communications & Engagement Office</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium">
            {renderNavLink("transition hover:text-[var(--nav-hover)]", () => setIsOpen(false))}
          </nav>
        </div>

        {/* Cart and User Icons */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:flex">
          <Link
            href="/cart"
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition"
            style={{ color: blackHex, border: isCartPage ? `1px solid ${redHex}` : `1px solid ${blackHex}` }}
            aria-label="Cart"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag className="h-5 w-5" style={{ color: blackHex }} />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 h-3 w-3 rounded-full" style={{ right: '1px', backgroundColor: redHex }} />
            )}
          </Link>
          <IconButton label="Account" icon={<User className="h-5 w-5" style={{ color: blackHex }} />} />
        </div>
      </div>

      {/* Mobile Navigation Dropdown - Smooth Expansion */}
      <nav
        className={`block md:hidden absolute top-[64px] left-0 right-0 w-full rounded-2xl backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: `color-mix(in srgb, ${whiteHex} 75%, transparent)`, border: `1px solid color-mix(in srgb, ${whiteHex} 40%, transparent)` }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {renderNavLink("block px-4 py-3 text-sm font-medium transition hover:text-[var(--nav-hover)] rounded-lg", () => setIsOpen(false))}
        </div>
      </nav>
      </div>
    </header>
  );
}
