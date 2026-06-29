import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/data/store-data";
import { goldHex, darkBlueHex, blackHex, whiteHex, redHex, paleBlueHex } from "@/constants/variables";
// ponytail: wave bg uses .steps-wave-bg CSS class — a plain CSS fill is more
// reliable than var() in SVG on Samsung Browser / Opera GX.

export default function WorkflowSteps() {
  return (
    <section id="steps" className="px-[15px] pt-[40px] pb-[50px] md:px-[20px]" style={{ backgroundColor: paleBlueHex }}>
      <div className="relative rounded-b-3xl border-l-2 border-r-2 border-b-2" style={{ borderColor: goldHex }}>
        <div className="overflow-hidden rounded-b-3xl" style={{ backgroundColor: whiteHex }}>
          <div className="relative -top-[20px] flex flex-col gap-4 px-4 pb-4 pt-24 sm:gap-8 sm:p-10 sm:pt-44 md:flex-row md:items-start md:gap-12">

            {/* Left: heading + divider + description */}
            <div className="md:w-[360px] flex-shrink-0">
              <h2 className="text-[1.8rem] font-bold leading-tight sm:text-[2.2rem] md:text-[2.52rem] lg:text-[3.08rem]" style={{ color: darkBlueHex }}>
                Reserve your souvenirs in 3 simple <span style={{ color: redHex }}>steps</span>.
              </h2>
              <hr className="my-4" style={{ borderColor: goldHex }} />
              <p className="text-sm leading-relaxed sm:text-base md:text-[1.09rem]" style={{ color: blackHex }}>
                The portal reserves your items and prepares your order for collection at the UoM Finance Office.
              </p>
            </div>

            {/* Steps — vertical on mobile, horizontal on md+ */}
            <div className="flex flex-col gap-[18px] md:flex-row md:flex-1 md:items-start">
              {workflowSteps.map((step, i) => (
                <Fragment key={step.step}>
                  {/* Mobile: icon left, text right. Desktop: stacked centered */}
                  <div className="flex flex-row items-center gap-4 md:flex-1 md:flex-col md:items-center md:text-center">
                    <div className="flex h-[74px] w-[74px] flex-shrink-0 items-center justify-center rounded-full shadow-md md:h-[94px] md:w-[94px]" style={{ backgroundColor: goldHex }}>
                      <ArrowRight
                        className="h-[32px] w-[32px] md:h-[36px] md:w-[36px]"
                        style={{ color: whiteHex }}
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-col md:items-center md:text-center">
                      <div className="flex items-center gap-2 md:flex-col md:items-center md:gap-0">
                        <span className="text-[1.8rem] font-bold md:mt-3 md:text-[2.52rem]" style={{ color: goldHex }}>
                          {String(step.step).padStart(2, "0")}
                        </span>
                        <h3 className="text-[1.05rem] font-bold md:mt-1 md:text-[1.4rem]" style={{ color: darkBlueHex }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="-mt-1 text-[0.78rem] leading-snug sm:text-[0.9rem] md:mt-2 md:text-[1.09rem] md:leading-relaxed" style={{ color: blackHex }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:relative md:block md:mt-10 md:w-0 md:flex-shrink-0">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28px] border-t-[4px] border-dashed lg:w-[140px]" style={{ borderColor: goldHex }} />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 1100 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-[0px] w-[calc(100%+2px)] h-24 sm:h-40 z-10"
        >
          {/* Top path matches the page background. Filled via the .steps-wave-bg
              CSS class because var() is unreliable in SVG on Samsung Browser /
              Opera GX. */}
          <path
            d="M 0 0 C 200 180, 400 0, 650 5 C 850 15, 950 180, 1100 30 L 1100 0 Z"
            className="steps-wave-bg"
          />
          <path
            d="M 0 0 C 200 180, 400 0, 650 5 C 850 15, 950 180, 1100 30 L 1100 30 C 950 200, 850 15, 650 7 C 400 10, 200 190, 0 30 Z"
            fill={goldHex}
          />
        </svg>
      </div>
    </section>
  );
}
