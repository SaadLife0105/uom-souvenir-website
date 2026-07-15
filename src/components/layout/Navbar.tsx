"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, User, Menu, X, Store, TrendingUp, MessageCircle, Mail } from "lucide-react";
import uomLogo from "@/app/images/sceo-logo.png";
import { navLinks } from "@/data/store-data";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/context/CartContext";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { camelHex, racingRedHex, whiteSmokeHex } from "@/constants/variables";
import { useDockMouseX, DockItem } from "@/components/ui/Dock";

const navIcons: Record<string, React.ElementType> = {
  Shop: Store,
  "Best Seller": TrendingUp,
  FAQ: MessageCircle,
  "Contact Us": Mail,
};

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const { navigateToSection, isHome } = useSectionScroll();
  const [activeHref, setActiveHref] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isCartPage = pathname === "/cart";
  const isShopPage = pathname === "/shop";
  const mouseX = useDockMouseX();

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleHideShow = () => {
      const y = window.scrollY;
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleHideShow, { passive: true });
    return () => window.removeEventListener("scroll", handleHideShow);
  }, []);

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

  const renderNavLink = (onLinkClick: () => void, animated: boolean) =>
    navLinks.map((link) => {
      const href = link.type === "route" ? link.href : (isHome ? `#${link.sectionId}` : `/#${link.sectionId}`);
      const onClick = link.type === "route" ? onLinkClick : navigateToSection(link.sectionId, onLinkClick);
      const Icon = navIcons[link.label];

      if (animated) {
        const button = (
          <Link
            href={href}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full transition"
            style={{ color: racingRedHex, backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 18%, transparent)` }}
            aria-label={link.label}
            title={link.label}
            onClick={onClick}
          >
            <span className="sr-only">{link.label}</span>
            <Icon className="h-5 w-5" style={{ color: racingRedHex }} />
          </Link>
        );
        return (
          <DockItem key={link.label} mouseX={mouseX} className="mx-[2px]" label={link.label}>
            {button}
          </DockItem>
        );
      }

      return (
        <Link
          key={link.label}
          href={href}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition rounded-lg"
          style={{ color: racingRedHex }}
          onClick={onClick}
        >
          <Icon className="h-5 w-5" style={{ color: racingRedHex }} />
          {link.label}
        </Link>
      );
    });

  return (
    <header
      className={`fixed inset-x-0 top-[25px] z-50 px-4 bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hidden ? "-translate-y-[200%]" : "translate-y-0"}`}
    >
      <div className="relative mx-auto w-[95%] max-w-7xl">
      <div
        className="flex h-[59px] md:h-16 w-full items-center gap-4 rounded-3xl px-4 shadow-xl backdrop-blur-md flex-nowrap"
        style={{ backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 75%, transparent)`, border: `1px solid color-mix(in srgb, ${whiteSmokeHex} 40%, transparent)` }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden shrink-0 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" style={{ color: camelHex }} />
          ) : (
            <Menu className="h-6 w-6" style={{ color: camelHex }} />
          )}
        </button>

        {/* Logo */}
        <DockItem mouseX={mouseX} label="Home">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={uomLogo}
              alt="University Of Mauritius shield logo"
              width={48}
              height={48}
              className="h-[48px] w-[48px] object-contain"
            />
          </Link>
        </DockItem>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium">
            {renderNavLink(() => setIsOpen(false), true)}
          </nav>
        </div>

        {/* Cart and User Icons */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:flex">
          <DockItem mouseX={mouseX} className="mx-[2px]" label="Cart">
            <Link
              href="/cart"
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-full transition"
              style={{ color: racingRedHex, backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 18%, transparent)` }}
              aria-label="Cart"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="h-5 w-5" style={{ color: racingRedHex }} />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 h-3 w-3 rounded-full" style={{ right: '1px', backgroundColor: racingRedHex }} />
              )}
            </Link>
          </DockItem>
          <DockItem mouseX={mouseX} className="mx-[2px]" label="Account">
            <Link
              href={session ? "/account" : "/sign-in"}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full transition"
              style={{ color: racingRedHex, backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 18%, transparent)` }}
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Account</span>
              <User className="h-5 w-5" style={{ color: racingRedHex }} />
            </Link>
          </DockItem>
        </div>
      </div>

      {/* Mobile Navigation Dropdown - Smooth Expansion */}
      <nav
        className={`block md:hidden absolute top-[64px] left-0 right-0 w-full rounded-2xl backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 75%, transparent)`, border: `1px solid color-mix(in srgb, ${whiteSmokeHex} 40%, transparent)` }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {renderNavLink(() => setIsOpen(false), false)}
        </div>
      </nav>
      </div>
    </header>
  );
}