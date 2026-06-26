import Image from "next/image";
import heroBackground from "@/app/images/herobackground.jpg";
import uomLogo from "@/app/images/uom-logo.png";
import { goldV, darkBlueV, whiteV, deepBlueV, lightBlueV } from "@/constants/variables";

// The hero artwork (polygon, dots, logo, text) is designed at this reference
// width. Everything lives inside one "stage" whose size and every inner
// coordinate are expressed in `--u` units (1u = 1px at the reference width),
// so the whole group scales and repositions together with the viewport.
// ponytail: pure-CSS scaling — no JS, no hydration flash, server component.
const REF_W = 1477;
const REF_H = 718;

// Build a length that scales with the viewport: n reference-pixels.
const u = (n: number) => `calc(var(--u) * ${n})`;

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-screen overflow-hidden">
      {/* Background */}
      <Image
        src={heroBackground}
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Design stage — fixed reference aspect, scaled to the viewport width and
          anchored bottom-right so the blue panel always hugs that corner.
          Phones use the dedicated portrait layout below instead. */}
      <div
        className="absolute bottom-0 right-0 hidden lg:block"
        style={
          {
            "--u": `calc(100vw / ${REF_W})`,
            width: u(REF_W),
            height: u(REF_H),
          } as React.CSSProperties
        }
      >
        {/* Blue panel + outlines. Points bleed past the frame edges so the panel
            keeps covering the corner even when the stage is shorter than the
            viewport. The SVG scales with the stage automatically. */}
        <svg
          viewBox={`0 0 ${REF_W} ${REF_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {/* Blue outline */}
          <polyline
            points="729,444 875,422 1477,206"
            fill="none"
            stroke={lightBlueV}
            strokeWidth="4"
          />

          {/* Blue panel */}
          <polygon
            points="1477,179 1477,-400 1477,820 300,900 704,444 875,422 1477,206"
            fill={deepBlueV}
            fillOpacity="0.90"
          />

          {/* Gold outline */}
          <polyline
            points="300,900 704,444 925,421 1477,224"
            fill="none"
            stroke={goldV}
            strokeWidth="2"
          />
        </svg>

        {/* Main content */}
        <div className="absolute" style={{ left: u(753), top: u(500) }}>
          {/* Logo — crest is 255×348, so keep that ratio (99×135) to avoid
              squashing. Change the numbers freely; the text won't move. */}
          <Image
            src={uomLogo}
            alt="Logo"
            width={150}
            height={200}
            className="absolute"
            style={{ top: u(-20), left: u(-80), width: u(150), height: u(200) }}
          />

          <div style={{ paddingLeft: u(82) }}>
            <h1
              className="font-bold leading-none"
              style={{ fontSize: u(40), color: goldV }}
            >
              University of Mauritius
            </h1>

            <p
              style={{ fontSize: u(32), marginTop: u(8), color: lightBlueV }}
            >
              A piece of UoM
            </p>
          </div>

          <p
            className="absolute"
            style={{
              color: whiteV,
              left: u(83),
              width: u(550),
              fontSize: u(18),
              lineHeight: u(36),
            }}
          >
            Browse premium UoM merchandise, reserve your favorites online, and
            collect them with ease on campus.uui
          </p>
        </div>

        {/* Yellow dots */}
        <div
          className="absolute grid grid-cols-4"
          style={{ top: u(400), right: u(80), gap: u(8) }}
        >
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{ backgroundColor: goldV, width: u(3), height: u(3) }}
            />
          ))}
        </div>

        {/* Blue dots */}
        <div
          className="absolute grid grid-cols-5"
          style={{ bottom: u(60), right: u(35), gap: u(12) }}
        >
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{ backgroundColor: lightBlueV, width: u(3), height: u(3) }}
            />
          ))}
        </div>
      </div>

      {/* Mobile / portrait layout — the desktop composition is anchored
          bottom-right with its content mid-stage, so it can't simply scale up
          without sliding off-screen. Phones get this readable stacked version. */}
      <div className="absolute inset-0 lg:hidden">
        {/* Angled blue panel filling the lower portion */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <polygon points="0,55 100,38 100,100 0,100" fill={darkBlueV} fillOpacity="0.92" />
          <polyline points="0,55 100,38" fill="none" stroke={goldV} strokeWidth="0.35" />
          <polyline points="0,58.5 100,41.5" fill="none" stroke={lightBlueV} strokeWidth="0.6" />
        </svg>

        <div className="absolute inset-x-0 bottom-0 top-[50%] flex flex-col items-center justify-center gap-3 px-8 text-center">
          <Image src={uomLogo} alt="Logo" width={150} height={200} className="h-24 w-auto" />

          <h1 className="text-3xl font-bold leading-tight" style={{ color: goldV }}>
            University of Mauritius
          </h1>

          <p className="text-xl" style={{ color: lightBlueV }}>A piece of UoM</p>

          <p className="max-w-sm text-base leading-relaxed" style={{ color: whiteV }}>
            Browse premium UoM merchandise, reserve your favorites online, and
            collect them with ease on campus.uui
          </p>
        </div>
      </div>
    </section>
  );
}
