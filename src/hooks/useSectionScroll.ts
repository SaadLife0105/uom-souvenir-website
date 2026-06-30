"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Offset for the fixed-position header so scrolled-to sections aren't hidden under it.
const HEADER_OFFSET = 96;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

// Cross-page "scroll to section" behavior: on the homepage, jump straight to the
// section; from any other page, navigate home via a normal <Link href={`/#id`}>
// and this hook (re-mounted on the homepage) picks up the hash and scrolls once
// the page has rendered.
export function useSectionScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const frame = requestAnimationFrame(() => scrollToId(hash));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const navigateToSection = (sectionId: string, onNavigate?: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname === "/") {
      e.preventDefault();
      scrollToId(sectionId);
    }
  };

  return { navigateToSection, isHome: pathname === "/" };
}
