import Image from "next/image";
import type { TestimonialItem } from "./store-data";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-50px_rgba(15,23,42,0.1)]">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-slate-950">{testimonial.name}</p>
          <p className="text-sm text-slate-500">{testimonial.role}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
        <p>“{testimonial.review}”</p>
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={index < testimonial.rating ? "opacity-100" : "opacity-30"}>
              ★
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
