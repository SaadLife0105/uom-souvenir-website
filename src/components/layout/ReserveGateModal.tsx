'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useReserveGate } from '@/context/ReserveGateContext';
import { darkBlueHex, whiteHex, goldHex } from '@/constants/variables';

export default function ReserveGateModal() {
  const { isGateOpen, closeGate } = useReserveGate();

  useEffect(() => {
    if (!isGateOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGate();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isGateOpen, closeGate]);

  if (!isGateOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="reserve-gate-title">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `color-mix(in srgb, ${darkBlueHex} 60%, transparent)` }}
        onClick={closeGate}
      />
      <div className="relative z-10 w-full max-w-sm rounded-2xl p-8 text-center shadow-xl" style={{ backgroundColor: whiteHex }}>
        <button
          type="button"
          onClick={closeGate}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1 transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: darkBlueHex, outlineColor: goldHex }}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id="reserve-gate-title" className="text-xl font-bold" style={{ color: darkBlueHex }}>
          Sign in to continue
        </h2>
        <p className="mt-2 text-sm text-[#5b6b86]">
          You&apos;ll need an account to view product details and reserve items.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/sign-in"
            className="cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: darkBlueHex, color: whiteHex, outlineColor: goldHex }}
          >
            Log In
          </Link>
          <button
            type="button"
            onClick={closeGate}
            className="cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'transparent',
              color: darkBlueHex,
              border: `1px solid color-mix(in srgb, ${darkBlueHex} 25%, transparent)`,
              outlineColor: goldHex,
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
