import Image from "next/image";
import type { ProductItem } from "./store-data";

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#3f5a80] bg-[#162c47] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(0,0,0,0.3)]">
      <div className="relative h-72 overflow-hidden bg-[#0d1f33]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-[#eef3fb]">{product.name}</p>
              <p className="text-sm text-[#99a7c0]">{product.category}</p>
            </div>
            <p className="text-base font-semibold text-[#eef3fb] whitespace-nowrap">{product.price}</p>
          </div>
        </div>
        <div className="mt-auto">
          <button className="inline-flex w-full items-center justify-center rounded-full bg-[#faa153] px-4 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
