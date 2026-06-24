import Image from "next/image";
import heroBackground from "@/app/images/herobackground.png";
import uomLogo from "@/app/images/uom-logo.png";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen h-screen overflow-hidden bg-transparent">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroBackground}
          alt="Hero background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 flex items-end justify-end p-6 sm:p-12 lg:p-16">
        <div className="flex max-w-md flex-col items-end text-right space-y-4 text-[#E99C19]">
          <div className="inline-flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image src={uomLogo} alt="UoM logo" fill sizes="56px" className="object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-tight sm:text-3xl">
              University of Mauritius
            </span>
          </div>

          <p className="text-sm italic sm:text-base">
            A piece of UoM
          </p>

          <p className="max-w-md text-sm leading-6">
            Browse premium campus merchandise, reserve your favorites online, and collect them with ease from the University of Mauritius Finance Office.
          </p>
        </div>
      </div>
    </section>
  );
}
