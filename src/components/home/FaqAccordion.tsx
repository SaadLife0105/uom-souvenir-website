"use client";

import { useState } from "react";
import Image from "next/image";
import { Truck, RefreshCw, Palette, MapPin, Clock, Tag, CreditCard, Bell, MessageCircle, Plus, Minus } from "lucide-react";
import uomMap from "@/app/images/faq/uom-map.png";
import { camelHex, floralWhiteHex, whiteSmokeHex, racingRedHex } from "@/constants/variables";

interface FaqItem {
  icon: React.ElementType;
  question: string;
  answer: string;
  mapImage?: boolean;
}

const faqItems: FaqItem[] = [
  {
    icon: RefreshCw,
    question: "What is your return or exchange policy?",
    answer: "Once sold, items cannot be exchanged or returned.",
  },
  {
    icon: Clock,
    question: "What are your opening hours?",
    answer: "Monday to Friday: 9.00 – 16.00\nLunch Time: 12.00 – 13.00",
  },  
  {
    icon: CreditCard,
    question: "How does the payment process work?",
    answer: "Payment for purchases made at the shop may be effected at the UoM Cash Office, Finance Section, by cash, card, myt money, or blink. Alternatively payment can be made through any of the online payment methods outlined in the following payment instructions (Annex 1).",
  },
  {
    icon: Bell,
    question: "Can I pre-order items?",
    answer: "No. We do not currently offer pre-orders or restock notifications.",
  },
  {
    icon: Truck,
    question: "Do you have a delivery option / Do you ship internationally?",
    answer: "No, all goods have to be collected in person at the University of Mauritius.",
  },
  {
    icon: Tag,
    question: "Do you offer discounts for UoM students or staff?",
    answer: "No. All prices shown on the website are fixed.",
  },
  {
    icon: Palette,
    question: "Can I switch the colour of the product I ordered when I come for collection?",
    answer: "No, but you may come to the shop to view the products before purchase.",
  },
  {
    icon: MapPin,
    question: "Where is the shop located?",
    answer: "NAC Basement, University of Mauritius, Réduit. (Building 17)",
    mapImage: true,
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-[15px] pb-16 md:px-[20px]">
      <div>
        {/* Header */}
        <div className="mb-4 flex items-start gap-5">
          <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: camelHex, backgroundColor: floralWhiteHex }}>
            <MessageCircle className="h-9 w-9" style={{ color: camelHex }} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: camelHex }}>
              Frequently Asked Questions <span style={{ color: racingRedHex }}>(FAQ)</span>
            </h2>
            <p className="mt-[4px] text-base leading-7" style={{ color: camelHex }}>
              Everything you need to know about reserving items, generating invoices, and collecting your University of Mauritius souvenirs.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="grid grid-cols-1 min-[1550px]:grid-cols-2 gap-4 items-start">
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
                style={{ backgroundColor: whiteSmokeHex, borderColor: isOpen ? camelHex : "transparent" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Icon circle */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: floralWhiteHex }}>
                    <Icon className="h-5 w-5" style={{ color: camelHex }} strokeWidth={1.5} />
                  </div>

                  {/* Vertical divider */}
                  <div className="h-8 w-px shrink-0" style={{ backgroundColor: floralWhiteHex }} />

                  {/* Question */}
                  <span className="flex-1 text-base font-bold" style={{ color: camelHex }}>
                    {item.question}
                  </span>

                  {/* +/− button */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                    style={{ color: whiteSmokeHex, backgroundColor: isOpen ? camelHex : camelHex }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" strokeWidth={2} /> : <Plus className="h-4 w-4" strokeWidth={2} />}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[900px]" : "max-h-0"
                  }`}
                >
                  <div className="mx-5 border-t-2" style={{ borderColor: floralWhiteHex }} />
                  <div className="px-5 py-4">
                    <p className="text-sm leading-7 whitespace-pre-line" style={{ color: camelHex }}>
                      {item.answer}
                    </p>
                    {item.mapImage && (
                      <div className="mt-3 rounded-xl overflow-hidden max-w-[835px]" style={{ backgroundColor: whiteSmokeHex }}>
                        <Image
                          src={uomMap}
                          alt="UoM Campus Map — NAC Basement (Building 17)"
                          width={uomMap.width}
                          height={uomMap.height}
                          className="block w-full h-auto max-h-[835px] object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
