import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroBackground from "@/app/images/hero/herobackground.jpg";
import uomLogo from "@/app/images/uom-logo.png";
import lineartUom from "@/app/images/footer/lineartuom.png";
import { camelHex, brightSkyHex, frostedBlueHex, floralWhiteHex, whiteSmokeHex } from "@/constants/variables";

const heroBlobShape = `shape(
  from 0% 8%,
  curve to 66% 14% with 20% -5% / 55% -3%,
  curve to 72% 46% with 74% 26% / 62% 34%,
  curve to 80% 74% with 82% 58% / 90% 62%,
  curve to 60% 94% with 72% 84% / 78% 90%,
  curve to 0% 90% with 42% 98% / 16% 100%,
  close
)`;

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative h-[640px] w-full md:h-[760px]">
        <Image
          src={heroBackground}
          alt="University of Mauritius students on campus"
          fill
          priority
          className="object-cover"
        />

        {/* Blob panel — outline ring behind, accent ring, glass panel on top */}
        <div
          className="absolute left-0 top-0 h-[92%] w-[70%] md:h-[97%] md:w-[46%]"
          style={{ backgroundColor: whiteSmokeHex, clipPath: heroBlobShape }}
        />
        <div
          className="absolute left-0 top-0 h-[92%] w-[70%] scale-[0.994] md:h-[97%] md:w-[46%]"
          style={{ backgroundColor: frostedBlueHex, clipPath: heroBlobShape }}
        />
        <div
          className="absolute left-0 top-0 h-[92%] w-[70%] scale-[0.985] backdrop-blur-md md:h-[97%] md:w-[46%]"
          style={{ backgroundColor: `color-mix(in srgb, ${floralWhiteHex} 78%, transparent)`, clipPath: heroBlobShape }}
        />

        {/* Decorative circles */}
        <div className="absolute left-[6%] top-[10%] h-2 w-2 rounded-full" style={{ backgroundColor: brightSkyHex }} />
        <div className="absolute left-[4%] top-[38%] h-4 w-4 rounded-full border-2" style={{ borderColor: camelHex }} />
        <div className="absolute left-[6%] top-[72%] h-2 w-2 rounded-full" style={{ backgroundColor: brightSkyHex }} />
        <div className="absolute right-[10%] top-[10%] h-8 w-8 rounded-full opacity-60" style={{ backgroundColor: brightSkyHex }} />
        <div className="absolute right-[3%] top-[55%] hidden h-6 w-6 rounded-full border-2 md:block" style={{ borderColor: whiteSmokeHex }} />
        <div className="absolute right-[8%] bottom-[16%] hidden h-3 w-10 rounded-full md:block" style={{ backgroundColor: frostedBlueHex }} />

        {/* Content */}
        <div className="absolute left-0 top-0 flex h-[85%] w-[85%] flex-col justify-center gap-4 px-8 md:h-[90%] md:w-[42%] md:px-12">
          <div
            className="inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm font-semibold"
            style={{ borderColor: camelHex, color: camelHex }}
          >
            Forever UoM
          </div>

          <div className="flex items-center gap-3">
            <Image src={uomLogo} alt="University of Mauritius logo" width={56} height={76} className="h-14 w-auto" />
            <h1 className="font-sans text-4xl font-extrabold leading-[1.05] md:text-6xl">
              <span style={{ color: camelHex }}>University</span>
              <br />
              <span style={{ color: brightSkyHex }}>of Mauritius</span>
            </h1>
          </div>

          <p className="max-w-sm text-base leading-relaxed md:text-lg" style={{ color: camelHex }}>
            From your first lecture to graduation day and decades beyond, wear
            the colors that shaped your story. Welcome to the UoM Online
            Boutique where UoM spirit never fades~
          </p>

          <Link
            href="/shop"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
            style={{ borderColor: camelHex, color: camelHex }}
          >
            Shop Souvenirs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom wave + cream strip with faint building line-art */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full md:h-14">
            <path d="M0,60 C250,20 750,90 1000,40 L1000,100 L0,100 Z" style={{ fill: floralWhiteHex }} />
            <path d="M0,60 C250,20 750,90 1000,40" fill="none" style={{ stroke: camelHex }} strokeWidth="2" />
          </svg>
          <div
            className="absolute inset-x-0 bottom-0 top-8 flex items-center justify-center overflow-hidden md:top-10"
            style={{ backgroundColor: floralWhiteHex }}
          >
            <Image src={lineartUom} alt="" fill className="object-cover object-top opacity-40" />
            <p className="relative z-10 text-xs font-semibold tracking-[0.3em] md:text-sm" style={{ color: camelHex }}>
              THE UNIVERSITY OF MAURITIUS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
