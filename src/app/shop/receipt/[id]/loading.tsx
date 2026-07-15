import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';
import { floralWhiteHex, whiteSmokeHex, camelHex } from '@/constants/variables';

// Shown automatically by the App Router while page.tsx's server component runs
// getReservationById() — covers the gap between /cart's redirect and the receipt
// rendering. Mirrors the receipt page layout (Navbar + sidebar + receipt card)
// so the chrome stays put and only the content fades in.

// No gray token in the palette, so the skeleton blocks use a toned-down darkBlue
// (variables.tsx) — keeps it on-brand with no new hardcoded color.
const SKELETON = `color-mix(in srgb, ${camelHex} 14%, ${whiteSmokeHex})`;

export default function ReceiptLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pb-20 pt-28" style={{ backgroundColor: floralWhiteHex }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="h-5 w-28 animate-pulse rounded-md" style={{ backgroundColor: SKELETON }} />

          {/* Heading + subtitle */}
          <div className="mt-4 h-11 w-64 max-w-full animate-pulse rounded-lg" style={{ backgroundColor: SKELETON }} />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded-md" style={{ backgroundColor: SKELETON }} />

          {/* Mirrors ReceiptView's grid: left sidebar + right receipt card */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,300px)_1fr] lg:items-start">
            {/* Left sidebar */}
            <div className="flex flex-col gap-6">
              {/* Disclaimer box */}
              <div className="rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteSmokeHex }}>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 shrink-0 animate-pulse rounded-full" style={{ backgroundColor: SKELETON }} />
                  <div className="h-5 w-28 animate-pulse rounded-md" style={{ backgroundColor: SKELETON }} />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="h-3 w-full animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                  <div className="h-3 w-11/12 animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                  <div className="h-3 w-10/12 animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                  <div className="h-3 w-8/12 animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                </div>
              </div>

              {/* Order Summary box */}
              <div className="rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteSmokeHex }}>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 shrink-0 animate-pulse rounded-full" style={{ backgroundColor: SKELETON }} />
                  <div className="h-5 w-32 animate-pulse rounded-md" style={{ backgroundColor: SKELETON }} />
                </div>
                <div className="mt-4 flex flex-col gap-4">
                  <div>
                    <div className="h-3 w-20 animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                    <div className="mt-1.5 h-4 w-40 animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-20 animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
                    <div className="h-6 w-20 animate-pulse rounded-full" style={{ backgroundColor: SKELETON }} />
                  </div>
                </div>
              </div>

              {/* Download button */}
              <div className="h-12 w-full animate-pulse rounded-full" style={{ backgroundColor: SKELETON }} />
            </div>

            {/* Right — receipt card placeholder, same 1414:2000 frame as ReceiptView */}
            <div
              className="relative w-full overflow-hidden rounded-3xl shadow-md"
              style={{ aspectRatio: '1414 / 2000', backgroundColor: whiteSmokeHex }}
            >
              {/* Header / brand band */}
              <div className="absolute inset-x-[8%] top-[5%] h-[6%] animate-pulse rounded-lg" style={{ backgroundColor: SKELETON }} />

              {/* Date / Time line */}
              <div className="absolute left-[8%] top-[15%] h-[2.2%] w-[30%] animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
              <div className="absolute right-[8%] top-[15%] h-[2.2%] w-[16%] animate-pulse rounded" style={{ backgroundColor: SKELETON }} />

              {/* Item table rows */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-x-[8%] h-[2.4%] animate-pulse rounded"
                  style={{ top: `${24 + i * 6}%`, backgroundColor: SKELETON }}
                />
              ))}

              {/* Total band */}
              <div className="absolute right-[8%] top-[72%] h-[3%] w-[34%] animate-pulse rounded" style={{ backgroundColor: SKELETON }} />

              {/* Footer fields (name / payment ref / valid till) */}
              <div className="absolute left-[8%] top-[79%] h-[2.2%] w-[56%] animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
              <div className="absolute left-[8%] top-[83.5%] h-[2.2%] w-[44%] animate-pulse rounded" style={{ backgroundColor: SKELETON }} />
              <div className="absolute left-[8%] top-[88%] h-[2.2%] w-[48%] animate-pulse rounded" style={{ backgroundColor: SKELETON }} />

              {/* Centered spinner + label over the card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin" style={{ color: camelHex }} />
                <span className="text-sm font-semibold" style={{ color: camelHex }}>Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
