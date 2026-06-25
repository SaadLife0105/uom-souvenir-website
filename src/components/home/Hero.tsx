import Image from "next/image";
import heroBackground from "@/app/images/herobackground.png";
import uomLogo from "@/app/images/uom-logo.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-screen overflow-hidden"
    >
      {/* Background */}
      <Image
        src={heroBackground}
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />


      {/* Right SVG Panel */}
      <div className="absolute inset-y-0 right-0 w-[68%]">

        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >

          {/* Blue Outline */}
          <polyline
            points="
            
            255,495
            400,470
            1000,230
          "
            fill="none"
            stroke="#309ffa"
            strokeWidth="4"
          />

          {/* Blue Panel */}
          <polygon
            points="
            1000,200
            1000,0
            1000,800
            0,950
            230,495
            400,470
            1000,230
          "
            fill="#072B57"
            fillOpacity="0.90"
          />

          {/* Gold Outline */}
          <polyline
            points="
            0,950
            230,495
            450,470
            1000,250
          "
            fill="none"
            stroke="#E3A31D"
            strokeWidth="4"
          />
        </svg>

        {/* Main Content */}
        <div className="absolute left-[250px] top-[450px] max-w-[600px]">

          <div className="flex items-center gap-5">

            <Image
              src={uomLogo}
              alt="Logo"
              width={62}
              height={62}
            />

            <div>
              <h1 className="text-[40px] font-bold leading-none text-[#F0B323]">
                University of Mauritius
              </h1>

              <p className="mt-2 text-[32px] text-[#65A9FF]">
                A piece of UoM
              </p>
            </div>

          </div>

          <p className="absolute left-[83px] text-[18px] leading-9 text-white/95">
           Browse premium UoM merchandise, reserve your favorites online, and collect them with ease on campus.
          </p>

        </div>

        {/* Yellow dots */}
        <div className="absolute top-100 right-20 grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="h-[3px] w-[3px] rounded-full bg-[#F0B323]" />
          ))}
        </div>

        {/* Blue dots */}
        <div className="absolute bottom-15 right-14 grid grid-cols-5 gap-3">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="h-[3px] w-[3px] rounded-full bg-[#5AB5FF]" />
          ))}
        </div>

      </div>
    </section>
  );
}