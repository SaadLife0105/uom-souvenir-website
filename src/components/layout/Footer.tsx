import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import uomLogo from "@/app/images/uom-logo.png";
import sceoLogo from "@/app/images/sceo-logo.png";
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

function FooterColumn({ title, titleColor, items, mobileDivider = false, className = "" }: { title: string; titleColor: string; items: string[]; mobileDivider?: boolean; className?: string }) {
  return (
    <div className={`${mobileDivider ? "-ml-[20px] border-l pl-4 sm:ml-0 sm:border-l-0 sm:pl-0" : ""} lg:border-l lg:pl-8 ${className}`} style={{ borderColor: `${paleBlueV}26` }}>
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
      {/* Curved top edge — same wavy polygon as the steps section.
          Area above the wave is paleBlueV (matches the section above), the
          gold band follows the wave, and darkBlueV fills the footer body. */}
      <svg
        viewBox="0 0 1100 200"
        preserveAspectRatio="none"
        className="pointer-events-none block h-24 w-full sm:h-40"
      >
        <path
          d="M 0 0 C 200 180, 400 0, 650 5 C 850 15, 950 180, 1100 30 L 1100 0 Z"
          fill={paleBlueV}
        />
        <path
          d="M 0 0 C 200 180, 400 0, 650 5 C 850 15, 950 180, 1100 30 L 1100 30 C 950 200, 850 15, 650 7 C 400 10, 200 190, 0 30 Z"
          fill={goldV}
        />
        <path
          d="M 0 30 C 200 190, 400 10, 650 7 C 850 15, 950 200, 1100 30 L 1100 200 L 0 200 Z"
          fill={darkBlueV}
        />
      </svg>

      {/* Main body */}
      <div className="relative -mt-px overflow-x-clip" style={{ backgroundColor: darkBlueV }}>
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: goldV }}>Brought to you by</p>
                    <p className="text-sm font-bold tracking-wide" style={{ color: whiteV }}>University of Mauritius</p>
                  </div>
                </div>

                {/* Managed by — Strategic Communications & Engagement Office */}
                <div className="flex min-w-0 flex-1 items-center gap-3 border-l pl-4 sm:mt-[10px] sm:border-l-0 sm:border-t sm:pl-0 sm:pt-5" style={{ borderColor: `${paleBlueV}26` }}>
                  <div className="relative h-[46px] w-[46px] shrink-0 sm:h-11 sm:w-11">
                    <Image src={sceoLogo} alt="Strategic Communications & Engagement Office logo" className="h-full w-full object-contain" width={46} height={46} />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: goldV }}>Managed by</p>
                    <p className="text-sm font-bold leading-snug tracking-wide sm:max-w-[14rem]" style={{ color: whiteV }}>Strategic Communications &amp; Engagement Office</p>
                  </div>
                </div>
              </div>

              <p className="mx-auto max-w-xs text-center text-sm leading-7 sm:mx-0 sm:text-left" style={{ color: paleBlueV }}>
                Celebrating pride, tradition and excellence delivered to you.
              </p>
            </div>

            <FooterColumn title="Shop" titleColor={goldV} items={footerLinks.shop} className="ml-[5px] sm:ml-0" />
            <FooterColumn title="Support" titleColor={goldV} items={footerLinks.support} mobileDivider />
            <FooterColumn title="Company" titleColor={goldV} items={footerLinks.company} mobileDivider />

            {/* Connect */}
            <div className="col-span-3 text-center sm:col-span-1 sm:text-left lg:border-l lg:pl-8" style={{ borderColor: `${paleBlueV}26` }}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: goldV }}>
                Connect With Us
              </h3>
              <div className="mt-5 flex justify-center gap-3 sm:justify-start">
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
          <div className="mt-[33px] border-t pt-6" style={{ borderColor: `${paleBlueV}26` }}>
            <div className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row" style={{ color: paleBlueV }}>
              <p>© 2026 University of Mauritius. All rights reserved.</p>
              <p>Proudly serving the UoM community.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Red band (kept for now) */}
      <div className="relative -mt-[10px] px-4 py-[13.5px] sm:px-6 lg:px-8" style={{ backgroundColor: redV }}>
        <div className="flex items-center justify-center text-sm" style={{ color: whiteV }}>
          <Image src={ccLogo} alt="" aria-hidden className="h-6 w-auto object-contain" style={{ marginRight: "1rem" }} />
          <p>Powered by UOM Computer Club (2024-2025)</p>
          <Image src={ccLogo} alt="" aria-hidden className="h-6 w-auto object-contain" style={{ marginLeft: "1rem" }} />
        </div>
      </div>
    </footer>
  );
}
