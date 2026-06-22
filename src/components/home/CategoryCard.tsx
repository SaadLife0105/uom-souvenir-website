interface CategoryCardProps {
  title: string;
  description: string;
}

export default function CategoryCard({ title, description }: CategoryCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#C82520] bg-[#C82520] text-white shadow-[0_20px_60px_-30px_rgba(200,37,32,0.45)] transition hover:-translate-y-1">
      <div className="flex h-48 items-center justify-center bg-white/10 p-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/15 text-center text-sm font-semibold uppercase tracking-[0.24em] text-white">
          Image
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold">{title}</h3>
          <p className="mt-3 text-lg leading-7 text-white/90">{description}</p>
        </div>
        <a
          href="/shop"
          className="mt-auto inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#C82520] transition hover:bg-[#F8F8F8]"
        >
          Explore
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </a>
      </div>
    </article>
  );
}
