import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Mauritius campus collection
            </span>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Premium University of Mauritius souvenirs designed for campus life.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Celebrate your UoM story with thoughtfully crafted merchandise built for comfort, everyday use and lasting quality.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#shop"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Shop Now
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Explore Categories
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute inset-x-0 top-4 h-72 rounded-[2.5rem] bg-gradient-to-r from-emerald-100 via-white to-slate-100 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_40px_120px_-50px_rgba(15,23,42,0.18)]">
              <Image
                src="/hero-illustration.svg"
                alt="University of Mauritius souvenir display"
                width={720}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
