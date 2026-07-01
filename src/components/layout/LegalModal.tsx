"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { goldHex, deepBlueHex, whiteHex } from "@/constants/variables";

const TITLES = {
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
} as const;

function TermsContent() {
  return (
    <>
      <p className="mb-4">
        Please read this document carefully before you proceed with a purchase. They tell you who we are, how we
        operate, what to do if there is a problem and other important information.
      </p>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        1. Introduction
      </h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          This website is operated by the SCEO, Strategic, Communications and Engagement Office, and is to be used
          as a means to view/buy branded merchandise from the University of Mauritius.
        </li>
        <li>These terms and conditions shall govern your use of our website.</li>
        <li>
          By using our website, you accept these terms and conditions in full; accordingly, if you disagree with
          them or any part of these terms and conditions, you must not use our website.
        </li>
      </ul>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        2. Copyright Notice
      </h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          All photos and videos, etc. published on this page are the sole property of the SCEO. Prior permission
          for any use should be sought.
        </li>
        <li>
          Any designs produced by us will remain our intellectual property and may not be used in any other form
          without our prior written consent.
        </li>
        <li>It is the client&apos;s responsibility to gain authorisation to use any copyrighted material/logo.</li>
      </ul>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        3. Terms of Sale
      </h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          The following terms and conditions of sale apply to all sales of goods from the website and shall
          prevail over any conflicting terms proposed by the client, unless expressly agreed in writing prior.
        </li>
        <li>
          <span className="underline">Goods once sold cannot be returned/exchanged.</span>
        </li>
        <li>The price of goods shall be as stated on the website.</li>
        <li>
          Payment should be made by the Buyer before the validation date on the invoice unless otherwise agreed in
          writing.
        </li>
        <li>Risk in the goods shall pass to the client once sold.</li>
      </ul>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        4. Invoice
      </h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>Clients cannot collect goods without a valid invoice. (Either printed or a picture/screenshot.)</li>
        <li>
          It is the user&apos;s responsibility to input correct data (contact information, reference number etc.)
          on the invoice. Should any information be incorrect, the invoice shall be invalid.
        </li>
      </ul>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        5. Privacy Policy
      </h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          We advise you to read our privacy policy regarding our user data collection. It will help you better
          understand our practices.
        </li>
      </ul>

      <p>
        If you violate these Terms, SCEO may terminate your use of the Platform, bar you from future use of the
        Platform, and/or take appropriate legal action against you.
      </p>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <p className="mb-4">
        This document will help you understand how the University of Mauritius uses and protects the data you
        provide to us when you visit and use our gift shop. We are committed to maintaining the confidentiality,
        integrity and security of your personal information in accordance with application data protection
        regulations and industry best practices.
      </p>

      <p className="mb-4">
        This policy applies to all visitors, customers and users of our website and by using our services you
        agree to the terms described herein.
      </p>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        The user data we collect:
      </h3>
      <p className="mb-2">When you visit our online shop, we may collect the following data:</p>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>Your IP address.</li>
        <li>Your name, contact information and email address.</li>
        <li>Order details and product preferences.</li>
      </ul>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        Purpose of Data Collection
      </h3>
      <p className="mb-4">
        The personal information we collect is used exclusively for purposes that are necessary and legitimate
        within the scope of operating. We do not collect any data beyond what is required to fulfill these
        functions unless explicitly authorized by you.
      </p>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        Data Security Measures
      </h3>
      <p className="mb-4">
        We employ commercially reasonable administrative, technical and physical safeguards to protect personal
        data from unauthorized access, disclosure or misuse. While no system can guarantee absolute security, we
        are committed to maintaining appropriate protectors based on the nature of the data and the associated
        risks.
      </p>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        Payment Information
      </h3>
      <p className="mb-4">
        All financial transactions on our website are processed through secure, third-party gateways. These
        providers operate independently and comply with national security standards.
      </p>
      <p className="mb-4">
        We do not store, transmit or have direct access to your complete credit card or banking details. The
        information you provide is encrypted and securely processed.
      </p>

      <h3 className="mb-2 text-lg font-bold" style={{ color: goldHex }}>
        Policy Updates
      </h3>
      <p>We reserve the right to change this policy at any given time, of which you will be promptly updated.</p>
    </>
  );
}

export default function LegalModal({
  type,
  open,
  onClose,
}: {
  type: "terms" | "privacy";
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
        aria-labelledby="legal-modal-title"
        className="relative flex w-full max-w-2xl flex-col rounded-3xl border-2 shadow-2xl"
        style={{ backgroundColor: deepBlueHex, borderColor: goldHex, maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 rounded-t-3xl p-6 sm:p-8 sm:pb-6">
          <h2
            id="legal-modal-title"
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: goldHex }}
          >
            {TITLES[type]}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: whiteHex, outlineColor: goldHex }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="scrollbar-thin-gold overflow-y-auto px-6 pb-6 text-sm leading-relaxed sm:px-8 sm:pb-8 sm:text-base"
          style={{ color: whiteHex }}
        >
          {type === "terms" ? <TermsContent /> : <PrivacyContent />}
        </div>
      </div>
    </div>
  );
}
