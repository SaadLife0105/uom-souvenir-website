import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#D7F2FF] pb-24 pt-24">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white/90 to-[#D7F2FF]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 max-w-2xl">
            <span className="inline-flex rounded-full border border-[#C82520] bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-[#C82520] shadow-sm shadow-[#C82520]/10">
              University Of Mauritius Souvenir Shop
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-[#7F0906] sm:text-6xl">
                Reserve official UoM souvenirs for pickup at the Finance Office.
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#7F0906] sm:text-lg">
                Browse premium campus merchandise, reserve your favorites online, and collect them with ease from the University of Mauritius Finance Office.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-1">
            <div className="rounded-[2rem] border border-[#C82520] bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(200,37,32,0.4)]">
              <div className="h-72 rounded-[1.75rem] bg-[#C82520] p-6 text-white">
                <div className="flex h-full flex-col justify-between">
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/90">
                    Model placeholder
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Campus Hoodie</h2>
                    <p className="text-sm leading-7 text-white/80">
                      A simplified 3D model placeholder for your next souvenir favorite.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-[#C82520] bg-white/90 p-5 text-[#1f2937] shadow-[0_20px_60px_-30px_rgba(200,37,32,0.28)]">
                <div className="h-36 rounded-3xl bg-[#E99C19]/20" />
              </div>
              <div className="rounded-[1.75rem] border border-[#C82520] bg-white/90 p-5 text-[#1f2937] shadow-[0_20px_60px_-30px_rgba(200,37,32,0.28)]">
                <div className="h-36 rounded-3xl bg-[#C82520]/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
