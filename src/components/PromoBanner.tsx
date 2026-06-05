export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-[#162c47] px-8 py-12 text-[#eef3fb] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)] sm:px-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6bb1ff]">Official University Merchandise</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Limited edition drops for every student and graduate.</h2>
            <p className="max-w-2xl text-sm leading-7 text-[#99a7c0]">
              Discover premium campus pieces created for comfort, everyday wear and memorable campus moments.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#shop"
                className="inline-flex items-center justify-center rounded-full bg-[#faa153] px-6 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]"
              >
                Browse selections
              </a>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-[#3f5a80] bg-[#0d1f33] p-8 shadow-inner shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-[#eef3fb]">Student Favorites</p>
              <ul className="space-y-4 text-sm leading-7 text-[#99a7c0]">
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
