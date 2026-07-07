"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";
import uomLogo from "@/app/images/uom-logo.png";
import sceoLogo from "@/app/images/sceo-logo.png";
import ccLogo from "@/app/images/cc-logo.png";
import lineartUom from "@/app/images/footer/lineartuom.png";
import { footerLinks, type FooterLink } from "@/data/store-data";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import ComingSoonModal from "./ComingSoonModal";
import LegalModal from "./LegalModal";
import { darkBlueHex as darkBlue, goldHex as gold, whiteHex as white, paleBlueHex as paleBlue, redHex as red, goldHex } from "@/constants/variables";
// ponytail: Footer uses pinned hex exports (never var()) — Samsung Browser /
// Opera GX don't resolve CSS custom properties reliably in SVG fill attributes
// or inline styles on certain elements.

const socials = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Mail, label: "Email", href: "#" },
];

// ponytail: placeholder contact details — swap for the real SCEO phone/email when available.
const CONTACT_PHONE = "+230 403 7400";
const CONTACT_EMAIL = "sceo@uom.ac.mu";

function FooterColumn({
  title,
  titleColor,
  items,
  mobileDivider = false,
  className = "",
  onOpenModal,
}: {
  title: string;
  titleColor: string;
  items: FooterLink[];
  mobileDivider?: boolean;
  className?: string;
  onOpenModal: (modalId: "payment" | "terms" | "privacy") => void;
}) {
  const { navigateToSection, isHome } = useSectionScroll();

  return (
    <div className={`${mobileDivider ? "-ml-[20px] border-l pl-4 sm:ml-0 sm:border-l-0 sm:pl-0" : ""} lg:border-l lg:pl-8 ${className}`} style={{ borderColor: `color-mix(in srgb, ${paleBlue} 15%, transparent)` }}>
      <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: titleColor }}>
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm" style={{ color: paleBlue }}>
        {items.map((item) => {
          if (item.type === "link") {
            return (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors duration-200 hover:text-[var(--paper)]">
                  {item.label}
                </Link>
              </li>
            );
          }

          if (item.type === "external") {
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-[var(--paper)]"
                >
                  {item.label}
                </a>
              </li>
            );
          }

          if (item.type === "modal") {
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => onOpenModal(item.modalId)}
                  className="cursor-pointer text-left transition-colors duration-200 hover:text-[var(--paper)]"
                >
                  {item.label}
                </button>
              </li>
            );
          }

          const href = isHome ? `#${item.sectionId}` : `/#${item.sectionId}`;
          return (
            <li key={item.label}>
              <Link
                href={href}
                onClick={navigateToSection(item.sectionId)}
                className="transition-colors duration-200 hover:text-[var(--paper)]"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [openModal, setOpenModal] = useState<"payment" | "terms" | "privacy" | null>(null);

  const modalTitles = { payment: "Payment" };

  return (
    <footer id="contact" className="relative" style={{ color: white, ["--paper"]: white } as React.CSSProperties}>
      {/* Curved top edge — clipPath refactor (mirrors StepsSection): the
          dark-blue body edge is genuinely wave-shaped via SVG clips instead of
          a painted overlay polygon. paleBlue fills above the crest, a gold band
          rides the wave, darkBlue fills below. Same viewBox 1100x200 wave as
          before mapped to a fixed-height strip, so geometry is identical at
          both breakpoints. Two objectBoundingBox curves an offset apart: the
          gold shows in the band between them. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="footer-wave-gold" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 C 0.1818 0.9, 0.3636 0, 0.5909 0.025 C 0.7727 0.075, 0.8636 0.9, 1 0.15 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="footer-wave-dark" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.15 C 0.1818 0.95, 0.3636 0.05, 0.5909 0.035 C 0.7727 0.075, 0.8636 1, 1 0.15 L 1 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative block h-24 w-full sm:h-40" style={{ backgroundColor: paleBlue }}>
        <div className="absolute inset-0" style={{ backgroundColor: gold, clipPath: "url(#footer-wave-gold)" }} />
        <div className="absolute inset-0" style={{ backgroundColor: darkBlue, clipPath: "url(#footer-wave-dark)" }} />
      </div>

      {/* Main body */}
      <div className="relative -mt-px overflow-x-clip" style={{ backgroundColor: darkBlue }}>
        {/* Faint building line-drawing (decorative) */}
        <Image
          src={lineartUom}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 hidden h-[291px] w-auto translate-y-[10px] select-none object-contain opacity-20 lg:block"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-[15px] sm:pt-[23px] lg:px-8">
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div className="col-span-3 space-y-5 sm:col-span-1">
              <div className="-ml-[10px] flex flex-row gap-4 sm:ml-0 sm:flex-col sm:gap-5">
                {/* Brought to you by — University of Mauritius */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0">
                    <Image src={uomLogo} alt="University of Mauritius logo" className="h-auto w-auto object-contain" width={44} height={44} />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: gold }}>Brought to you by</p>
                    <p className="text-sm font-bold tracking-wide" style={{ color: white }}>University of Mauritius</p>
                  </div>
                </div>

                {/* Managed by — Strategic Communications & Engagement Office */}
                <div className="flex min-w-0 flex-1 items-center gap-3 border-l pl-4 sm:mt-[10px] sm:border-l-0 sm:border-t sm:pl-0 sm:pt-5" style={{ borderColor: `color-mix(in srgb, ${paleBlue} 15%, transparent)` }}>
                  <div className="relative h-[46px] w-[46px] shrink-0 sm:h-11 sm:w-11">
                    <Image src={sceoLogo} alt="Strategic Communications & Engagement Office logo" className="h-full w-full object-contain" width={46} height={46} />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: gold }}>Managed by</p>
                    <p className="text-sm font-bold leading-snug tracking-wide sm:max-w-[14rem]" style={{ color: white }}>Strategic Communications &amp; Engagement Office</p>
                  </div>
                </div>
              </div>

              <p className="mx-auto max-w-xs text-center text-sm leading-7 sm:mx-0 sm:text-left" style={{ color: paleBlue }}>
                Inform. Involve. Impact.
              </p>
            </div>

            <FooterColumn title="Shop" titleColor={gold} items={footerLinks.shop} className="ml-[5px] sm:ml-0" onOpenModal={setOpenModal} />
            <FooterColumn title="Support" titleColor={gold} items={footerLinks.support} mobileDivider onOpenModal={setOpenModal} />
            <FooterColumn title="Company" titleColor={gold} items={footerLinks.company} mobileDivider onOpenModal={setOpenModal} />

            {/* Connect */}
            <div className="col-span-3 text-center sm:col-span-1 sm:text-left lg:border-l lg:pl-8" style={{ borderColor: `color-mix(in srgb, ${paleBlue} 15%, transparent)` }}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: gold }}>
                Connect With Us
              </h3>
              <ul className="mt-5 space-y-3 text-sm" style={{ color: paleBlue }}>
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: gold }} aria-hidden />
                  <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className="transition-colors duration-200 hover:text-[var(--paper)]">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: gold }} aria-hidden />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors duration-200 hover:text-[var(--paper)]">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex justify-center gap-3 sm:justify-start">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-[var(--paper)]/10 cursor-pointer"
                    style={{ borderColor: gold, color: gold }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="mt-[33px] border-t pt-6" style={{ borderColor: `color-mix(in srgb, ${paleBlue} 15%, transparent)` }}>
            <div className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row" style={{ color: paleBlue }}>
              <p>© 2026 University of Mauritius. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Red band (kept for now) */}
      <div id="red-band" className="relative -mt-[10px] px-4 py-[13.5px] sm:px-6 lg:px-8" style={{ backgroundColor: goldHex }}>
        <div className="flex items-center justify-center text-sm" style={{ color: white }}>
          <Image src={ccLogo} alt="" aria-hidden className="h-6 w-auto object-contain" style={{ marginRight: "1rem" }} />
          <p>Powered by UOM Computer Club (2024-2025)</p>
          <Image src={ccLogo} alt="" aria-hidden className="h-6 w-auto object-contain" style={{ marginLeft: "1rem" }} />
        </div>
      </div>

      <ComingSoonModal
        title={openModal === "payment" ? modalTitles.payment : ""}
        open={openModal === "payment"}
        onClose={() => setOpenModal(null)}
      />
      {(openModal === "terms" || openModal === "privacy") && (
        <LegalModal
          type={openModal}
          open={openModal === "terms" || openModal === "privacy"}
          onClose={() => setOpenModal(null)}
        />
      )}
    </footer>
  );
}
