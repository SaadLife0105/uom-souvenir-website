"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "How do I reserve souvenirs for pickup?",
    answer:
      "Select the items you want, add them to your cart, and generate an invoice to reserve them for collection at the UoM Finance Office.",
  },
  {
    question: "When can I collect my order?",
    answer:
      "Orders are prepared after reservation and can be collected during Finance Office opening hours once your invoice is confirmed.",
  },
  {
    question: "Can I update my reservation after checkout?",
    answer:
      "Yes. Contact the Finance Office or support team before collection to modify your reserved items, subject to availability.",
  },
  {
    question: "Do I need to pay online or on campus?",
    answer:
      "Payment is completed at the UoM Finance Office when you pick up your order, making the reservation process simple and secure.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-3xl border border-[#C82520] bg-white shadow-[0_20px_60px_-30px_rgba(200,37,32,0.18)] transition"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left text-[#1f2937] transition hover:bg-[#D7F2FF]"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-[#1f2937]">{item.question}</span>
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#C82520] bg-[#E99C19] text-white transition ${isOpen ? "rotate-45" : "rotate-0"}`}>
                +
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="px-6 pb-6 text-sm leading-7 text-[#1f2937]">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
