import Image from "next/image";
import Link from "next/link";
import type { BestSellerCampaign } from "@/data/store-data";
import { paleBlueV, whiteV } from "@/constants/variables";

export default function BestSellersCard({ campaign }: { campaign: BestSellerCampaign }) {
  return (
    <article className="group relative aspect-[3/4] w-[62%] shrink-0 overflow-hidden rounded-2xl sm:w-[44%] lg:w-[calc((100%-24px)/3-20px)]">
      {/* Full-bleed background image */}
      <Image
        src={campaign.image}
        alt={campaign.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 90vw, 33vw"
      />

      {/* Gradient overlay — darker at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2019]/75 via-[#1E2019]/20 to-transparent" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-5">
        <h3 className="text-2xl leading-tight md:text-3xl">
          {/* ponytail: --tag-bg lets Tailwind's /25 alpha modifier work on a CSS variable color */}
          <span
            className="inline-block rounded-full px-4 pt-1 pb-2 font-bold bg-[var(--tag-bg)]/25 backdrop-blur-sm"
            style={{ "--tag-bg": paleBlueV, color: whiteV } as React.CSSProperties}
          >
            {campaign.title}
          </span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {campaign.buttons[0] && (
            <Link
              href={campaign.buttons[0].href}
              className="cursor-pointer rounded-full border border-[var(--color-white)]/70 bg-[var(--color-black)]/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm transition hover:bg-[var(--color-black)]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
              style={{ color: whiteV }}
            >
              Order Now
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
