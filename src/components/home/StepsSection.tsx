import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/data/store-data";

export default function WorkflowSteps() {
  return (
    <section id="steps" className="px-[30px] pt-[40px] pb-[40px]">
      <div className="relative rounded-b-3xl border-l border-r border-b border-[#FFCB70]">
        <div className="overflow-hidden rounded-b-3xl bg-[#F8EEDE]">
          <div className="relative -top-[20px] flex flex-col gap-4 px-4 pb-4 pt-24 sm:gap-8 sm:p-10 sm:pt-44 md:flex-row md:items-start md:gap-12">

            {/* Left: heading + divider + description */}
            <div className="md:w-[360px] flex-shrink-0">
              <h2 className="text-[1.8rem] font-bold leading-tight text-[#1A3C7D] sm:text-[2.2rem] md:text-[2.52rem] lg:text-[3.08rem]">
                Reserve your souvenirs in 3 simple steps.
              </h2>
              <hr className="my-4 border-[#C8963C]" />
              <p className="text-sm leading-relaxed text-[#1E2019] sm:text-base md:text-[1.09rem]">
                The portal reserves your items and prepares your order for collection at the UoM Finance Office.
              </p>
            </div>

            {/* Steps — vertical on mobile, horizontal on md+ */}
            <div className="flex flex-col gap-[18px] md:flex-row md:flex-1 md:items-start">
              {workflowSteps.map((step, i) => (
                <Fragment key={step.step}>
                  {/* Mobile: icon left, text right. Desktop: stacked centered */}
                  <div className="flex flex-row items-center gap-4 md:flex-1 md:flex-col md:items-center md:text-center">
                    <div className="flex h-[74px] w-[74px] flex-shrink-0 items-center justify-center rounded-full bg-[#FFCB70] shadow-md md:h-[94px] md:w-[94px]">
                      <ArrowRight
                        className="text-[#1E2B4A] h-[32px] w-[32px] md:h-[36px] md:w-[36px]"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-col md:items-center md:text-center">
                      <div className="flex items-center gap-2 md:flex-col md:items-center md:gap-0">
                        <span className="text-[1.8rem] font-bold text-[#FFCB70] md:mt-3 md:text-[2.52rem]">
                          {String(step.step).padStart(2, "0")}
                        </span>
                        <h3 className="text-[1.05rem] font-bold text-[#1A3C7D] md:mt-1 md:text-[1.4rem]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="-mt-1 text-[0.78rem] leading-snug text-[#1E2019] sm:text-[0.9rem] md:mt-2 md:text-[1.09rem] md:leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block md:mt-10 md:w-3 md:flex-shrink-0 md:border-t-2 md:border-dashed md:border-[#FFCB70] lg:w-[58px]" />
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
          <path
            d="M 0 0 C 200 180, 400 0, 650 5 C 850 15, 950 180, 1100 30 L 1100 0 Z"
            fill="#D7F2FF"
          />
          <path
            d="M 0 0 C 200 180, 400 0, 650 5 C 850 15, 950 180, 1100 30 L 1100 30 C 950 200, 850 15, 650 7 C 400 10, 200 190, 0 30 Z"
            fill="#FFCB70"
          />
        </svg>
      </div>
    </section>
  );
}
