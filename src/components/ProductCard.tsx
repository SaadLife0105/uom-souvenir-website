import Image from "next/image";
import type { ProductItem } from "./store-data";

interface ProductCardProps {
  product: ProductItem;
}

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-sm text-amber-500">
    {Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={index + 1 <= Math.round(rating) ? "opacity-100" : "opacity-30"}>
        ★
      </span>
    ))}
    <span className="text-xs text-slate-500">{rating.toFixed(1)}</span>
  </div>
);

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#A88243]/15 bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.2)] dark:border-slate-700/40 dark:bg-slate-950">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
              <p className="text-base font-semibold text-slate-950 dark:text-slate-100">{product.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{product.category}</p>
          </div>
          <p className="text-lg font-semibold text-slate-950 dark:text-slate-100">{product.price}</p>
        </div>
        <RatingStars rating={product.rating} />
        <button className="inline-flex w-full items-center justify-center rounded-2xl bg-[#009AD9] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#007fbf]">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
