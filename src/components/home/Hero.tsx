import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden bg-[#0d1f33]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-[#162c47] px-4 py-2 text-sm font-semibold text-[#eef3fb] shadow-sm shadow-[#0d1f33]/30">
              Official University of Mauritius Souvenir Store
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#eef3fb] sm:text-5xl">
                Curated campus essentials for University of Mauritius life.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[#99a7c0] sm:text-base">
                Discover premium UoM merchandise crafted for comfort, everyday use, and memorable campus moments.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-[#faa153] px-6 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]"
              >
                Browse selections
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="pointer-events-none absolute -right-8 top-10 h-40 w-40 rounded-full bg-[#faa153]/20 blur-3xl" />
            <div className="pointer-events-none absolute left-8 top-24 h-40 w-40 rounded-full bg-[#6bb1ff]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#3f5a80] bg-[#162c47] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.35)]">
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
