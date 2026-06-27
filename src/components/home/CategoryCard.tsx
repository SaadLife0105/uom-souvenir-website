import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { whiteV } from "@/constants/variables";

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
            className={`h-[85%] sm:h-[75%] md:h-[70%] w-full object-contain transition-transform duration-500 ${
              title === "Clothing"
                ? "scale-[1.65] group-hover:scale-[1.75]"
                : "group-hover:scale-105"
            }`}
            priority={false}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2 md:gap-4">
          <h3 className="transition-transform duration-300 group-hover:-translate-y-2">
            {/* ponytail: --tag-bg lets Tailwind's /30 alpha modifier work on a runtime color */}
            <span
              className="inline-block rounded-full px-3 sm:px-4 pt-0.5 pb-1.5 sm:pt-1 sm:pb-2 text-lg sm:text-2xl md:text-4xl font-bold bg-[var(--tag-bg)]/30 backdrop-blur-sm"
              style={{ "--tag-bg": bgColor, color: whiteV } as React.CSSProperties}
            >
              {title}
            </span>
          </h3>
          <span className="pointer-events-none opacity-0 cursor-pointer rounded-full border border-[var(--color-white)]/70 bg-[var(--color-black)]/25 px-4 sm:px-6 py-1.5 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]" style={{ color: whiteV }}>
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
}
