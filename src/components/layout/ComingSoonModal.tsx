"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { goldHex, deepBlueHex, whiteHex } from "@/constants/variables";

export default function ComingSoonModal({
  title,
  open,
  onClose,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: `color-mix(in srgb, ${deepBlueHex} 70%, transparent)` }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-modal-title"
        className="relative w-full max-w-2xl rounded-3xl border-2 p-8 shadow-2xl sm:p-12"
        style={{ backgroundColor: deepBlueHex, borderColor: goldHex }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: whiteHex, outlineColor: goldHex }}
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id="coming-soon-modal-title"
          className="text-2xl font-bold sm:text-3xl"
          style={{ color: goldHex }}
        >
          {title}
        </h2>
        <p className="mt-4 text-base" style={{ color: whiteHex }}>
          Content to be added soon.
        </p>
      </div>
    </div>
  );
}
