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
  racingRedHex,
} from "@/constants/variables";

/*
 * Main glass panel shape.
 *
 * The exposed lobe uses a broader elliptical arc with tangent-aligned
 * control points. Its horizontal reach stays almost unchanged, but the
 * upper and lower shoulders are about 20% rounder.
 */
const heroBlobShape = `shape(
  from 44.2% -2%,
  curve to 52% 9.8% with 46.3% 2.2% / 48.5% 7.1%,
  curve to 74% 19.2% with 58.8% 13.4% / 68.8% 16.2%,
  curve to 84.8% 29.8% with 79% 22.5% / 83% 25.7%,
  curve to 87.1% 47.5% with 86.6% 34% / 87.2% 42%,
  curve to 82.9% 64.5% with 87% 53% / 85.5% 59.9%,
  curve to 68.2% 79.5% with 80.3% 69.1% / 73.5% 75.5%,
  curve to 59% 88.5% with 63.2% 83.3% / 60.5% 85.8%,
  curve to 55.8% 103% with 57.5% 91.2% / 55.8% 98%,
  line to 0% 103%,
  line to 0% -2%,
  close
)`;

/*
 * Two independent accent lines beside the blob.
 *
 * Both lines use continuous cubic splines with tangent-aligned joins.
 * Their original layout and crossings are preserved, but the paths are
 * stretched vertically so they begin above the hero and continue beneath
 * the bottom wave instead of ending visibly inside the section.
 */
const heroBlobBlueLineShape = `shape(
  from 44.416% -6%,
  curve to 44.81% -3.5% with 44.51% -5.166% / 44.645% -4.334%,
  curve to 46.721% 2.75% with 45.222% -1.416% / 45.819% 0.666%,
  curve to 49.852% 9% with 47.623% 4.834% / 48.83% 6.916%,
  curve to 54.576% 15.25% with 50.874% 11.084% / 51.709% 13.166%,
  curve to 67.634% 21.5% with 57.442% 17.334% / 62.34% 19.416%,
  curve to 79.393% 26.5% with 71.87% 23.166% / 76.36% 24.834%,
  curve to 84.978% 31.5% with 82.426% 28.166% / 84.002% 29.834%,
  curve to 86.616% 36.5% with 85.954% 33.166% / 86.331% 34.834%,
  curve to 87.339% 46.5% with 87.186% 39.834% / 87.388% 43.166%,
  curve to 85.979% 59% with 87.278% 50.666% / 86.824% 54.834%,
  curve to 80.409% 71.5% with 85.133% 63.166% / 83.897% 67.334%,
  curve to 66.494% 84% with 76.92% 75.666% / 71.179% 79.834%,
  curve to 59.672% 91.5% with 63.683% 86.5% / 61.252% 89%,
  curve to 57.376% 96.5% with 58.619% 93.166% / 57.944% 94.834%,
  curve to 55.633% 102.125% with 56.738% 98.375% / 56.235% 100.25%,
  curve to 54.988% 104% with 55.433% 102.75% / 55.221% 103.375%,
  line to 54.808% 104%,
  curve to 55.453% 102.125% with 55.041% 103.375% / 55.253% 102.75%,
  curve to 57.196% 96.5% with 56.055% 100.25% / 56.558% 98.375%,
  curve to 59.492% 91.5% with 57.764% 94.834% / 58.439% 93.166%,
  curve to 66.314% 84% with 61.072% 89% / 63.503% 86.5%,
  curve to 80.229% 71.5% with 70.999% 79.834% / 76.74% 75.666%,
  curve to 85.799% 59% with 83.717% 67.334% / 84.953% 63.166%,
  curve to 87.159% 46.5% with 86.644% 54.834% / 87.098% 50.666%,
  curve to 86.436% 36.5% with 87.208% 43.166% / 87.006% 39.834%,
  curve to 84.798% 31.5% with 86.151% 34.834% / 85.774% 33.166%,
  curve to 79.213% 26.5% with 83.822% 29.834% / 82.246% 28.166%,
  curve to 67.454% 21.5% with 76.18% 24.834% / 71.69% 23.166%,
  curve to 54.396% 15.25% with 62.16% 19.416% / 57.262% 17.334%,
  curve to 49.672% 9% with 51.529% 13.166% / 50.694% 11.084%,
  curve to 46.541% 2.75% with 48.65% 6.916% / 47.443% 4.834%,
  curve to 44.63% -3.5% with 45.639% 0.666% / 45.042% -1.416%,
  curve to 44.236% -6% with 44.465% -4.334% / 44.33% -5.166%,
  close
)`;

const heroBlobWhiteLineShape = `shape(
  from 42.88% -6%,
  curve to 43.4% -3.5% with 42.967% -5.583% / 42.921% -4.958%,
  curve to 45.755% 2.75% with 43.879% -2.042% / 44.655% 0.667%,
  curve to 50.003% 9% with 46.855% 4.833% / 47.893% 6.917%,
  curve to 58.413% 15.25% with 52.113% 11.083% / 54.441% 13.167%,
  curve to 73.836% 21.5% with 62.385% 17.333% / 70.309% 19.625%,
  curve to 79.576% 26.5% with 77.363% 23.375% / 78.055% 24.833%,
  curve to 82.964% 31.5% with 81.097% 28.167% / 82.134% 29.833%,
  curve to 84.556% 36.5% with 83.794% 33.167% / 84.11% 34%,
  curve to 85.64% 46.5% with 85.002% 39% / 85.743% 42.75%,
  curve to 83.94% 59% with 85.537% 50.25% / 85.517% 54.833%,
  curve to 76.179% 71.5% with 82.363% 63.167% / 80.175% 67.333%,
  curve to 59.961% 84% with 72.183% 75.667% / 63.351% 80.667%,
  curve to 55.841% 91.5% with 56.571% 87.333% / 56.717% 89.417%,
  curve to 54.705% 96.5% with 54.965% 93.583% / 54.952% 94.729%,
  curve to 54.357% 102.125% with 54.458% 98.271% / 54.417% 100.875%,
  curve to 54.348% 104% with 54.298% 103.375% / 54.35% 103.688%,
  line to 54.168% 104%,
  curve to 54.177% 102.125% with 54.169% 103.688% / 54.117% 103.375%,
  curve to 54.525% 96.5% with 54.236% 100.875% / 54.278% 98.271%,
  curve to 55.661% 91.5% with 54.772% 94.729% / 54.785% 93.583%,
  curve to 59.781% 84% with 56.537% 89.417% / 56.391% 87.333%,
  curve to 75.999% 71.5% with 63.171% 80.667% / 72.002% 75.667%,
  curve to 83.76% 59% with 79.995% 67.333% / 82.183% 63.167%,
  curve to 85.46% 46.5% with 85.337% 54.833% / 85.357% 50.25%,
  curve to 84.376% 36.5% with 85.563% 42.75% / 84.822% 39%,
  curve to 82.784% 31.5% with 83.93% 34% / 83.614% 33.167%,
  curve to 79.396% 26.5% with 81.954% 29.833% / 80.917% 28.167%,
  curve to 73.656% 21.5% with 77.875% 24.833% / 77.183% 23.375%,
  curve to 58.233% 15.25% with 70.129% 19.625% / 62.205% 17.333%,
  curve to 49.823% 9% with 54.261% 13.167% / 51.933% 11.083%,
  curve to 45.575% 2.75% with 47.713% 6.917% / 46.675% 4.833%,
  curve to 43.22% -3.5% with 44.474% 0.667% / 43.699% -2.042%,
  curve to 42.7% -6% with 42.741% -4.958% / 42.787% -5.583%,
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
            className="absolute inset-0 opacity-70"
            style={{
              backgroundColor: whiteSmokeHex,
              clipPath: heroBlobShape,
            }}
          />

          {/* Main translucent panel */}
          <div
            className="absolute inset-[2px] opacity-70 backdrop-blur-[18px]"
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

          {/* Blue accent line */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundColor: brightSkyHex,
              clipPath: heroBlobBlueLineShape,
            }}
          />

          {/* White crossing accent line */}
          <div
            className="absolute inset-0 opacity-95"
            style={{
              backgroundColor: whiteSmokeHex,
              clipPath: heroBlobWhiteLineShape,
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
            top-[66%]
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
            gap-7
            pl-8
            pr-6
            sm:top-[17%]
            md:top-[20%]
            md:w-[47%]
            md:gap-10
            md:pl-[8.5vw]
            md:pr-[3vw]
          "
        >
          <div
            className="
              inline-flex
              w-fit
              items-center
              px-7
              py-2
              text-sm
              font-semibold
              md:text-base
            "
            style={{
              backgroundColor: camelHex,
              color: whiteSmokeHex,
              clipPath: "polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%, 10% 50%)",
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
                md:-left-[8px]
                md:top-1/2
                md:-translate-y-1/2
                md:mt-0
                md:h-32
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
              <div style={{ transform: "translateX(95px)", fontSize: "0.9em" }}>
                <span style={{ color: camelHex }}>UoM Online</span>

                <br />

                <span style={{ color: brightSkyHex }}>Boutique</span>
              </div>
              
            </h1>
          </div>

          <p
            className="
              -mt-4
              max-w-[28rem]
              text-[0.95rem]
              font-medium
              leading-[1.55]
              md:-mt-6
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
              -mt-[16px]
              inline-flex
              w-fit
              scale-[1]
              items-center
              gap-2
              rounded-full
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
              backgroundColor: brightSkyHex,
              color: whiteSmokeHex,
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
                scale-[3.0]
                object-contain
                object-center
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