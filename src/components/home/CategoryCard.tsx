import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  image: string | StaticImageData;
  href: string;
  bgColor: string;
  textColor: string;
}

export default function CategoryCard({
  title,
  image,
  href,
  bgColor,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[170px] sm:h-[240px] md:h-[470px] overflow-hidden rounded-2xl transition-all duration-300 ease-in-out hover:rounded-[10.5rem]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden p-4 md:p-6">
        <div className="absolute inset-0 flex items-center justify-center scale-[0.92] transition-transform duration-500">
          <Image
            src={image}
            alt={title}
            className={`h-[60%] sm:h-[65%] md:h-[70%] w-full object-contain transition-transform duration-500 ${
              title === "Clothing"
                ? "scale-[1.65] group-hover:scale-[1.75]"
                : "group-hover:scale-105"
            }`}
            priority={false}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2 md:gap-4">
          <h3 className="text-lg sm:text-2xl md:text-4xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-2">
            {title}
          </h3>
          <span className="pointer-events-none opacity-0 rounded-full border border-white/20 bg-white/40 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#1E2019] backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
}
