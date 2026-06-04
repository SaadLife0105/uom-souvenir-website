import Image from "next/image";
import type { CategoryItem } from "./store-data";

interface CategoryCardProps {
  category: CategoryItem;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a
      href={category.href}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-shadow hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.3)]"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-6">
        <h3 className="text-lg font-semibold text-slate-950">{category.title}</h3>
        <p className="text-sm leading-6 text-slate-600">{category.description}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
          Explore
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
