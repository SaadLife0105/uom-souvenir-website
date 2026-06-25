import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/data/store-data";

export default function WorkflowSteps() {
  return (
    <section id="steps" className="mx-auto max-w-7xl px-2 pt-[40px] pb-[40px] sm:px-3 lg:px-4">
      {/* Outer: CSS borders follow rounded-b-3xl corners naturally. relative so the wave SVG positions against it. */}
      <div className="relative rounded-b-3xl border-l border-r border-b border-[#FFCB70]">
        <div className="overflow-hidden rounded-b-3xl bg-[#F8EEDE] min-h-[440px]">
          <div className="relative -top-[20px] flex flex-col gap-8 p-6 pt-36 sm:p-10 sm:pt-44 md:flex-row md:items-start md:gap-12">
            {/* Left: heading + divider + description */}
            <div className="md:w-64 flex-shrink-0">
              <h2 className="text-[1.8rem] font-bold leading-tight text-[#1A3C7D] sm:text-[2.2rem]">
                Reserve your souvenirs in 3 simple steps.
              </h2>
              <hr className="my-4 border-[#C8963C]" />
              <p className="text-base leading-relaxed text-[#1E2019]">
                The portal reserves your items and prepares your order for collection at the UoM Finance Office.
              </p>
            </div>

            {/* Right: steps with dashed connectors */}
            <div className="flex flex-1 items-start">
              {workflowSteps.map((step, i) => (
                <Fragment key={step.step}>
                  <div className="flex flex-1 flex-col items-center text-center">
                    <div className="flex h-[67px] w-[67px] items-center justify-center rounded-full bg-[#FFCB70] shadow-md">
                      <ArrowRight className="text-[#1E2B4A]" size={26} strokeWidth={2.5} />
                    </div>
                    <div className="mt-3 text-[1.8rem] font-bold text-[#FFCB70]">
                      {String(step.step).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1 text-base font-bold text-[#1A3C7D]">{step.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-[#1E2019]">{step.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="mt-8 w-10 flex-shrink-0 border-t-2 border-dashed border-[#FFCB70] md:w-[58px]" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Wave SVG: sibling of the inner div, inside the outer div (which has no overflow-hidden).
            left-[-1px] w-[calc(100%+2px)] extends 1px past each CSS border so the #D7F2FF fill covers them above the curve. */}
        <svg
          viewBox="0 0 1100 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-[0px] w-[calc(100%+2px)] h-32 sm:h-40 z-10"
        >
          {/* Fills the area above the curve with the parent bg (#D7F2FF), hiding border-l/r there */}
          <path
            d="
              M 0 0 
              C 200 180, 400 0, 650 5 
              C 850 15, 950 180, 1100 30 
              
              L 1100 0 
              
              Z"
            fill="#D7F2FF"
          />
          {/* Decorative ribbon */}
          <path
            d="
              M 0 0
              C 200 180, 400 0, 650 5
              C 850 15, 950 180, 1100 30
              
              L 1100 30
              C 950 200, 850 15, 650 7
              C 400 10, 200 190, 0 30
              
              Z
            "
            fill="#FFCB70"
          />
        </svg>
      </div>
    </section>
  );
}
