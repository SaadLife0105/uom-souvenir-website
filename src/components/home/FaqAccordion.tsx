"use client";

import { useState } from "react";
import { ShoppingBag, Calendar, Pencil, CreditCard, MessageCircle } from "lucide-react";
import { goldV, creamV, darkBlueV, whiteV } from "@/constants/variables";

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
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: goldV, backgroundColor: creamV }}>
            <MessageCircle className="h-7 w-7" style={{ color: darkBlueV }} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: darkBlueV }}>
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="mt-2 h-[3px] w-16 rounded-full" style={{ backgroundColor: goldV }} />
            <p className="mt-3 text-sm leading-relaxed" style={{ color: darkBlueV }}>
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
                className={`rounded-2xl transition-shadow ${
                  isOpen
                    ? "border-2 shadow-[0_4px_24px_-8px_rgba(201,164,64,0.25)]"
                    : "border-2 border-transparent shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]"
                }`}
                style={{ backgroundColor: whiteV, borderColor: isOpen ? goldV : "transparent" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Icon circle */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: creamV }}>
                    <Icon className="h-5 w-5" style={{ color: darkBlueV }} strokeWidth={1.5} />
                  </div>

                  {/* Vertical divider */}
                  <div className="h-8 w-px shrink-0" style={{ backgroundColor: creamV }} />

                  {/* Question */}
                  <span className="flex-1 text-base font-bold" style={{ color: darkBlueV }}>
                    {item.question}
                  </span>

                  {/* +/− button */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-light transition-colors"
                    style={{ color: whiteV, backgroundColor: isOpen ? darkBlueV : goldV }}
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
                  <div className="mx-5 border-t-2" style={{ borderColor: creamV }} />
                  <p className="px-5 py-4 text-sm leading-7" style={{ color: darkBlueV }}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
