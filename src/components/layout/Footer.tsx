import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import uomLogo from "@/app/images/uom-logo.png";
import ccLogo from "@/app/images/cc-logo.png";
import lineartUom from "@/app/images/footer/lineartuom.png";
import { footerLinks } from "@/data/store-data";
import { darkBlueV, goldV, redV, whiteV, paleBlueV } from "@/constants/variables";

const socials = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Mail, label: "Email", href: "#" },
];

function FooterColumn({ title, titleColor, items }: { title: string; titleColor: string; items: string[] }) {
  return (
    <div className="lg:border-l lg:pl-8" style={{ borderColor: `${paleBlueV}26` }}>
      <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: titleColor }}>
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm" style={{ color: paleBlueV }}>
        {items.map((item) => (
          <li key={item}>
            <Link href="#" className="transition-colors duration-200 hover:text-white">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative" style={{ color: whiteV }}>
      {/* Curved top edge — same polygon/path technique as the steps section.
          Area above the curve is filled with paleBlueV to match the section above it. */}
      <svg
        viewBox="0 0 1100 120"
        preserveAspectRatio="none"
        className="pointer-events-none block h-12 w-full sm:h-20"
      >
        <path d="M 0 0 L 1100 0 L 1100 50 C 760 110, 420 25, 0 68 Z" fill={paleBlueV} />
        <path d="M 0 68 C 420 25, 760 110, 1100 50 L 1100 120 L 0 120 Z" fill={darkBlueV} />
        <path d="M 0 68 C 420 25, 760 110, 1100 50" fill="none" stroke={goldV} strokeWidth={5} />
      </svg>

      {/* Main body */}
      <div className="relative -mt-px overflow-hidden" style={{ backgroundColor: darkBlueV }}>
        {/* Faint building line-drawing (decorative) */}
        <Image
          src={lineartUom}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 hidden h-56 w-auto select-none object-contain opacity-20 lg:block"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 sm:pt-12 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0">
                  <Image src={uomLogo} alt="UoM Souvenir Portal logo" className="h-auto w-auto object-contain" width={44} height={44} />
                </div>
                <div className="leading-tight">
                  <p className="font-bold tracking-wide" style={{ color: whiteV }}>UOM SOUVENIR</p>
                  <p className="text-sm font-semibold tracking-[0.22em]" style={{ color: goldV }}>PORTAL</p>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-7" style={{ color: paleBlueV }}>
                Celebrating pride, tradition and excellence — delivered to you.
              </p>
            </div>

            <FooterColumn title="Shop" titleColor={goldV} items={footerLinks.shop} />
            <FooterColumn title="Support" titleColor={goldV} items={footerLinks.support} />
            <FooterColumn title="Company" titleColor={goldV} items={footerLinks.company} />

            {/* Connect */}
            <div className="lg:border-l lg:pl-8" style={{ borderColor: `${paleBlueV}26` }}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: goldV }}>
                Connect With Us
              </h3>
              <div className="mt-5 flex gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-white/10 cursor-pointer"
                    style={{ borderColor: goldV, color: goldV }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="mt-12 border-t pt-6" style={{ borderColor: `${goldV}55` }}>
            <div className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row" style={{ color: paleBlueV }}>
              <p>© 2026 University of Mauritius. All rights reserved.</p>
              <p>Proudly serving the UoM community.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Red band (kept for now) */}
      <div className="px-4 py-4 sm:px-6 lg:px-8" style={{ backgroundColor: redV }}>
        <div className="flex items-center justify-center text-sm" style={{ color: whiteV }}>
          <Image src={ccLogo} alt="" aria-hidden className="h-6 w-auto object-contain" style={{ marginRight: "1rem" }} />
          <p>Powered by UOM Computer Club (2024-2025)</p>
          <Image src={ccLogo} alt="" aria-hidden className="h-6 w-auto object-contain" style={{ marginLeft: "1rem" }} />
        </div>
      </div>
    </footer>
  );
}
