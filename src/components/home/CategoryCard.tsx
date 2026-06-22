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
      className="group block h-full overflow-hidden rounded-2xl transition-all duration-300 ease-in-out hover:rounded-[4rem]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative flex h-80 items-center justify-center overflow-hidden p-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 transition-opacity duration-300 group-hover:opacity-100">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-contain p-4"
            priority={false}
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
          <h3 className="text-3xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-4">
            {title}
          </h3>
          <span className="mt-6 inline-flex rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
}
