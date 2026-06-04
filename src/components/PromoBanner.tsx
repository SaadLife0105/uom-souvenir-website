export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-12 text-white shadow-2xl sm:px-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Official University Merchandise</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Limited edition drops for every student and graduate.</h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              Discover premium campus pieces created for comfort, everyday wear and memorable campus moments.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#shop"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Shop limited editions
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Browse categories
              </a>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white/5 p-8 text-slate-200 shadow-inner shadow-slate-950/10">
            <div className="space-y-4">
              <p className="text-lg font-semibold">Student Favorites</p>
              <ul className="space-y-4 text-sm leading-7 text-slate-300">
                <li>• Premium campus hoodies and tees</li>
                <li>• Official drinkware and stationery</li>
                <li>• Stylish accessories for daily campus life</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
