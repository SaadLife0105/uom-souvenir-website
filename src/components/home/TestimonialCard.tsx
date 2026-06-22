import Image from "next/image";
import type { TestimonialItem } from "@/data/store-data";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-50px_rgba(0,0,0,0.28)]">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#0d1f33]">
          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm text-[#faa153]">{testimonial.role}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm leading-7 text-[#eef3fb]">
        <p>“{testimonial.review}”</p>
      </div>
    </article>
  );
}
