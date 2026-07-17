import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/data/store-data";
import { camelHex, whiteSmokeHex, racingRedHex, azureMistHex, brightSkyHex } from "@/constants/variables";
// reliable than var() in SVG on Samsung Browser / Opera GX.

export default function WorkflowSteps() {
  return (
    <section id="steps" className="px-[15px] pt-[40px] pb-[50px] md:px-[20px]" style={{ backgroundColor: azureMistHex }}>
      {/* objectBoundingBox clips: derived from the old overlay's viewBox 1100x200 wave,
          mapped against the box's rendered size (h-40 wave over the full box height).
          Two curves an offset apart form the gold stroke band between them. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="steps-wave-gold" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 C 0.1818 0.2722, 0.3636 0, 0.5909 0.0076 C 0.7727 0.0227, 0.8636 0.2722, 1 0.0454 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="steps-wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.0454 C 0.1818 0.2873, 0.3636 0.0151, 0.5909 0.0106 C 0.7727 0.0227, 0.8636 0.3025, 1 0.0454 L 1 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="relative rounded-b-3xl border-l-2 border-r-2 border-b-2" style={{ borderColor: camelHex }}>
        <div className="absolute inset-0 rounded-b-3xl" style={{ backgroundColor: camelHex, clipPath: "url(#steps-wave-gold)" }} />
        <div className="relative z-10 overflow-hidden rounded-b-3xl" style={{ backgroundColor: whiteSmokeHex, clipPath: "url(#steps-wave-clip)" }}>
          <div className="relative -top-[20px] flex flex-col gap-4 px-4 pb-4 pt-24 sm:gap-8 sm:p-10 sm:pt-44 md:flex-row md:items-start md:gap-12">

            {/* Left: heading + divider + description */}
            <div className="md:w-[360px] flex-shrink-0">
              <h2 className="text-[1.8rem] font-bold leading-tight sm:text-[2.2rem] md:text-[2.52rem] lg:text-[3.08rem]" style={{ color: camelHex }}>
                Reserve your souvenirs in 3 simple <span style={{ color: racingRedHex }}>steps</span>.
              </h2>
              <hr className="my-4" style={{ borderColor: camelHex }} />
              <p className="text-sm leading-relaxed sm:text-base md:text-[1.09rem]" style={{ color: camelHex }}>
                The portal reserves your items and prepares your order for collection at the UoM Finance Office.
              </p>
            </div>

            {/* Steps — vertical on mobile, horizontal on md+ */}
            <div className="flex flex-col gap-[18px] md:flex-row md:flex-1 md:items-start">
              {workflowSteps.map((step, i) => (
                <Fragment key={step.step}>
                  {/* Mobile: icon left, text right. Desktop: stacked centered */}
                  <div className="flex flex-row items-center gap-4 md:flex-1 md:flex-col md:items-center md:text-center">
                    <div className="flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center rounded-full shadow-md md:h-[116px] md:w-[116px]" style={{ backgroundColor: brightSkyHex }}>
                      <span className="text-[2.1rem] font-bold md:text-[3.1rem]" style={{ color: whiteSmokeHex }}>
                        {step.step}
                      </span>
                    </div>
                    <div className="flex flex-col md:items-center md:text-center">
                      <div className="flex items-center gap-2 md:flex-col md:items-center md:gap-0">
                        <h3 className="text-[1.05rem] font-bold md:mt-1 md:text-[1.4rem]" style={{ color: camelHex }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="-mt-1 text-[0.78rem] leading-snug sm:text-[0.9rem] md:mt-2 md:text-[1.09rem] md:leading-relaxed" style={{ color: camelHex }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex md:items-center md:justify-center md:mt-10 md:h-[116px] md:w-[48px] md:flex-shrink-0">
                      <ArrowRight
                        className="h-[40px] w-[40px] lg:h-[52px] lg:w-[52px]"
                        style={{ color: camelHex }}
                        strokeWidth={2.5}
                      />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
