import Image from "next/image";
import Link from "next/link";
import type { BestSellerCampaign } from "@/data/store-data";

export default function BestSellersCard({ campaign }: { campaign: BestSellerCampaign }) {
  return (
    <article className="group relative aspect-[3/4] w-[calc((100%-24px)/3-20px)] shrink-0 overflow-hidden rounded-2xl">
      {/* Full-bleed background image */}
      <Image
        src={campaign.image}
        alt={campaign.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 90vw, 33vw"
      />

      {/* Gradient overlay — darker at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-5">
        <h3 className="text-2xl leading-tight text-white md:text-3xl">
          {campaign.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {campaign.buttons[0] && (
            <Link
              href={campaign.buttons[0].href}
              className="cursor-pointer rounded-full border border-white/70 bg-black/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Order Now
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
