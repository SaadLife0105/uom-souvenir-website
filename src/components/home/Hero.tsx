import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import heroBackground from "@/app/images/hero/herobackground.jpg";
import uomLogo from "@/app/images/uom-logo.png";
import lineartUom from "@/app/images/footer/lineartuom.png";

import {
  azureMistHex,
  camelHex,
  brightSkyHex,
  frostedBlueHex,
  floralWhiteHex,
  whiteSmokeHex,
} from "@/constants/variables";

/*
 * Main glass panel shape.
 *
 * The rounded lobe is reduced slightly and rebuilt with longer, tangent
 * Bezier sections. This removes the small changes in direction that were
 * creating visible kinks along the edge.
 */
const heroBlobShape = `shape(
  from 44.2% -2%,
  curve to 52% 9.8% with 46.3% 2.2% / 48.5% 7.1%,
  curve to 74% 19.2% with 58.8% 13.4% / 68.8% 16.2%,
  curve to 83.7% 28.5% with 78.8% 22.1% / 82.2% 24.8%,
  curve to 86.8% 41.5% with 85.3% 32.3% / 86.7% 36.6%,
  curve to 86.75% 53.5% with 86.9% 45.5% / 86.9% 49.6%,
  curve to 83.4% 65.8% with 86.5% 57.8% / 85.3% 61.8%,
  curve to 74.8% 75.2% with 81.5% 69.8% / 78.3% 72.9%,
  curve to 63.4% 83.5% with 71.2% 77.6% / 67% 80.3%,
  curve to 57.1% 91.7% with 59.8% 86.3% / 58.2% 89%,
  curve to 55.4% 103% with 56% 95% / 55.5% 99%,
  line to 0% 103%,
  line to 0% -2%,
  close
)`;

/*
 * Thin irregular blue accent.
 *
 * Both sides use the same tangent flow as the blob so the ribbon remains
 * smooth while its narrow width still reveals parts of the white edge.
 */
const heroBlobAccentShape = `shape(
  from 44.72% -2%,
  curve to 52.22% 9.95% with 46.72% 2.25% / 48.72% 7.25%,
  curve to 74.22% 19.35% with 59.02% 13.55% / 69.02% 16.35%,
  curve to 83.92% 28.65% with 79.02% 22.25% / 82.42% 24.95%,
  curve to 87.12% 41.65% with 85.52% 32.45% / 87.02% 36.75%,
  curve to 87.07% 53.65% with 87.22% 45.65% / 87.22% 49.75%,
  curve to 83.72% 65.95% with 86.82% 57.95% / 85.62% 61.95%,
  curve to 75.12% 75.35% with 81.82% 69.95% / 78.62% 73.05%,
  curve to 63.72% 83.65% with 71.52% 77.75% / 67.32% 80.45%,
  curve to 57.42% 91.85% with 60.12% 86.45% / 58.52% 89.15%,
  curve to 55.72% 103% with 56.32% 95.15% / 55.82% 99.15%,
  line to 55.48% 103%,
  curve to 57.18% 91.85% with 55.58% 99.15% / 56.08% 95.15%,
  curve to 63.48% 83.65% with 58.28% 89.15% / 59.88% 86.45%,
  curve to 74.88% 75.35% with 67.08% 80.45% / 71.28% 77.75%,
  curve to 83.48% 65.95% with 78.38% 73.05% / 81.58% 69.95%,
  curve to 86.83% 53.65% with 85.38% 61.95% / 86.58% 57.95%,
  curve to 86.88% 41.65% with 86.98% 49.75% / 86.98% 45.65%,
  curve to 83.68% 28.65% with 86.78% 36.75% / 85.28% 32.45%,
  curve to 73.98% 19.35% with 82.18% 24.95% / 78.78% 22.25%,
  curve to 51.98% 9.95% with 68.78% 16.35% / 58.78% 13.55%,
  curve to 44.48% -2% with 48.48% 7.25% / 46.48% 2.25%,
  close
)`;

/*
 * Bottom section shape.
 *
 * The translated copies create the soft white upper band and the single
 * camel separator line without SVG.
 */
const bottomWaveShape = `shape(
  from 0% 27%,
  curve to 12% 46% with 4% 35.34% / 8% 43.68%,
  curve to 48% 5% with 24% 52.96% / 36% 5.73%,
  curve to 90% 57% with 62% 4.14% / 76% 66.57%,
  curve to 100% 42% with 93.33% 54.72% / 96.67% 48.36%,
  line to 100% 100%,
  line to 0% 100%,
  close
)`;

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/*
       * Desktop uses the viewport height instead of a fixed 900px height.
       * This prevents the hero from being taller than most laptop screens.
       */}
      <div
        className="
          relative
          h-[760px]
          w-full
          sm:h-[720px]
          md:h-[100svh]
          md:min-h-[680px]
          md:max-h-[880px]
        "
      >
        {/* Background photograph */}
        <Image
          src={heroBackground}
          alt="University of Mauritius students on campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Glass blob */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-[94%]
            md:w-[49%]
          "
        >
          {/* Subtle white outer edge */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: whiteSmokeHex,
              clipPath: heroBlobShape,
            }}
          />

          {/* Main translucent panel */}
          <div
            className="absolute inset-[2px] backdrop-blur-[18px]"
            style={{
              background: `linear-gradient(
                90deg,
                color-mix(in srgb, ${floralWhiteHex} 98%, transparent) 0%,
                color-mix(in srgb, ${floralWhiteHex} 92%, transparent) 55%,
                color-mix(in srgb, ${floralWhiteHex} 78%, transparent) 100%
              )`,
              clipPath: heroBlobShape,
            }}
          />

          {/* Irregular blue accent line */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundColor: brightSkyHex,
              clipPath: heroBlobAccentShape,
            }}
          />
        </div>

        {/* Decorative elements inside the blob */}
        <div
          className="
            pointer-events-none
            absolute
            left-[5.5%]
            top-[13%]
            z-20
            h-5
            w-5
            rounded-full
            opacity-75
            md:h-6
            md:w-6
          "
          style={{ backgroundColor: brightSkyHex }}
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[3.5%]
            top-[38%]
            z-20
            h-9
            w-9
            rounded-full
            border-2
            md:h-10
            md:w-10
          "
          style={{ borderColor: camelHex }}
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[30%]
            top-[63%]
            z-20
            hidden
            h-6
            w-6
            rounded-full
            md:block
          "
          style={{ backgroundColor: whiteSmokeHex }}
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[4.2%]
            top-[72%]
            z-20
            h-5
            w-5
            rounded-full
            opacity-75
            md:h-6
            md:w-6
          "
          style={{ backgroundColor: brightSkyHex }}
        />

        {/* Decorative elements over the photograph */}
        <div
          className="
            pointer-events-none
            absolute
            right-[4.5%]
            top-[12%]
            z-20
            hidden
            h-[72px]
            w-[72px]
            rounded-full
            opacity-55
            md:block
          "
          style={{ backgroundColor: brightSkyHex }}
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[1.7%]
            top-[55%]
            z-20
            hidden
            h-12
            w-12
            rounded-full
            border-[3px]
            md:block
          "
          style={{ borderColor: whiteSmokeHex }}
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[8.5%]
            top-[76%]
            z-20
            hidden
            h-11
            w-28
            rounded-full
            opacity-90
            md:block
          "
          style={{ backgroundColor: frostedBlueHex }}
        />

        {/* Hero text */}
        <div
          className="
            absolute
            left-0
            top-[18%]
            z-30
            flex
            w-[88%]
            flex-col
            gap-4
            pl-8
            pr-6
            sm:top-[17%]
            md:top-[20%]
            md:w-[47%]
            md:gap-5
            md:pl-[8.5vw]
            md:pr-[3vw]
          "
        >
          <div
            className="
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              px-5
              py-2
              text-sm
              font-semibold
              md:text-base
            "
            style={{
              borderColor: camelHex,
              color: camelHex,
            }}
          >
            Forever UoM
          </div>

          <div className="relative flex items-start gap-3 md:block">
            <Image
              src={uomLogo}
              alt="University of Mauritius logo"
              width={56}
              height={76}
              className="
                mt-1
                h-12
                w-auto
                object-contain
                md:absolute
                md:-left-[4.25rem]
                md:top-2
                md:mt-0
                md:h-16
              "
            />

            <h1
              className="
                font-sans
                text-[clamp(2.8rem,11vw,4rem)]
                font-extrabold
                leading-[1.02]
                tracking-[-0.035em]
                md:text-[clamp(3.6rem,4.5vw,5rem)]
              "
            >
              <span style={{ color: camelHex }}>UoM Online</span>

              <br />

              <span style={{ color: brightSkyHex }}>Boutique</span>
            </h1>
          </div>

          <p
            className="
              max-w-[28rem]
              text-[0.95rem]
              font-medium
              leading-[1.55]
              md:text-[clamp(1rem,1.15vw,1.15rem)]
              md:leading-[1.6]
            "
            style={{ color: camelHex }}
          >
            From your first lecture to graduation day and decades beyond, wear
            the colors that shaped your story. Welcome to the UoM Online
            Boutique where UoM spirit never fades~
          </p>

          <Link
            href="/shop"
            className="
              mt-1
              inline-flex
              w-fit
              items-center
              gap-5
              rounded-full
              border
              px-6
              py-3
              text-sm
              font-semibold
              transition
              duration-200
              hover:opacity-75
              md:text-base
            "
            style={{
              borderColor: camelHex,
              color: camelHex,
            }}
          >
            Shop Souvenirs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom wave, built entirely with clip-path */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-40
            h-[73px]
            sm:h-[78px]
            md:h-[clamp(110px,14vh,130px)]
          "
        >
          {/*
           * Soft white outer edge and Floral White ribbon.
           * These layers reproduce the light band above the camel line.
           */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: whiteSmokeHex,
              clipPath: bottomWaveShape,
              transform: "translateY(-9px)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              backgroundColor: floralWhiteHex,
              clipPath: bottomWaveShape,
              transform: "translateY(-8px)",
            }}
          />

          {/* Single camel separator line */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: camelHex,
              clipPath: bottomWaveShape,
              transform: "translateY(-1px)",
            }}
          />

          {/* Main Azure Mist wave */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundColor: azureMistHex,
              clipPath: bottomWaveShape,
            }}
          >
            <Image
              src={lineartUom}
              alt=""
              fill
              sizes="100vw"
              className="
                scale-[1.04]
                object-cover
                object-bottom
                opacity-30
              "
            />

            <p
              className="
                absolute
                inset-x-0
                bottom-[12%]
                z-10
                text-center
                text-[0.6rem]
                font-semibold
                tracking-[0.2em]
                sm:text-xs
                sm:tracking-[0.3em]
                md:text-sm
              "
              style={{ color: camelHex }}
            >
              THE UNIVERSITY OF MAURITIUS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}