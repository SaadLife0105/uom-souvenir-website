"use client";

import { useState } from "react";
import { ShoppingBag, Calendar, Pencil, CreditCard, MessageCircle } from "lucide-react";

const faqItems = [
  {
    icon: ShoppingBag,
    question: "How do I reserve souvenirs for pickup?",
    answer:
      "Select the items you want, add them to your cart, and generate an invoice to reserve them for collection at the UoM Finance Office.",
  },
  {
    icon: Calendar,
    question: "When can I collect my order?",
    answer:
      "Orders are prepared after reservation and can be collected during Finance Office opening hours once your invoice is confirmed.",
  },
  {
    icon: Pencil,
    question: "Can I update my reservation after checkout?",
    answer:
      "Yes. Contact the Finance Office or support team before collection to modify your reserved items, subject to availability.",
  },
  {
    icon: CreditCard,
    question: "Do I need to pay online or on campus?",
    answer:
      "Payment is completed at the UoM Finance Office when you pick up your order, making the reservation process simple and secure.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A440] bg-[#EDE5CE]">
            <MessageCircle className="h-7 w-7 text-[#1B2A4A]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-4xl">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="mt-2 h-[3px] w-16 rounded-full bg-[#C9A440]" />
            <p className="mt-3 text-sm leading-relaxed text-[#4A5568]">
              Everything you need to know about reserving items, generating invoices,
              <br className="hidden sm:block" /> and collecting your University of Mauritius souvenirs.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;
            return (
              <div
                key={item.question}
                className={`rounded-2xl bg-white transition-shadow ${
                  isOpen
                    ? "border border-[#C9A440] shadow-[0_4px_24px_-8px_rgba(201,164,64,0.25)]"
                    : "border border-transparent shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Icon circle */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDE5CE]">
                    <Icon className="h-5 w-5 text-[#1B2A4A]" strokeWidth={1.5} />
                  </div>

                  {/* Vertical divider */}
                  <div className="h-8 w-px shrink-0 bg-[#D1C9B8]" />

                  {/* Question */}
                  <span className="flex-1 text-base font-bold text-[#1B2A4A]">
                    {item.question}
                  </span>

                  {/* +/− button */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xl font-light transition-colors ${
                      isOpen ? "bg-[#1B2A4A]" : "bg-[#C9A440]"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="mx-5 border-t border-[#E8E0D0]" />
                  <p className="px-5 py-4 text-sm leading-7 text-[#4A5568]">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
