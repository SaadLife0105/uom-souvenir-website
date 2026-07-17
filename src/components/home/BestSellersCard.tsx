import Image from "next/image";
import Link from "next/link";
import type { BestSellerCampaign } from "@/data/store-data";
import { whiteSmokeHex, camelHex } from "@/constants/variables";

// Dark glass tint (camelHex darkened toward black) so white label/button text
// stays readable even over light/near-white product photos. Shared with
// CategoryCard, which reuses the same glass styling.
export const glassBg = `color-mix(in srgb, color-mix(in srgb, ${camelHex} 45%, black) 65%, transparent)`;
export const textShadow = "0 1px 3px rgba(0,0,0,0.6)";

export default function BestSellersCard({ campaign }: { campaign: BestSellerCampaign }) {
  return (
    <article className="group relative aspect-[3/4] w-[62%] shrink-0 overflow-hidden rounded-2xl sm:w-[44%] lg:w-[calc((100%-24px)/3-20px)]">
      {/* Full-bleed background image */}
      <Image
        src={campaign.image}
        alt={campaign.title}
        fill
        className="object-cover transition duration-700 group-hover:scale-[1.15]"
        sizes="(max-width: 768px) 90vw, 33vw"
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-5">
        <h3 className="text-2xl leading-tight md:text-3xl">
          <span
            className="inline-block rounded-full px-4 pt-1 pb-2 font-bold backdrop-blur-sm"
            style={{ color: whiteSmokeHex, backgroundColor: glassBg, textShadow }}
          >
            {campaign.title}
          </span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {campaign.buttons[0] && (
            <Link
              href={campaign.buttons[0].href}
              className="cursor-pointer rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 bg-[var(--btn-bg-default)] text-[var(--btn-text-default)] [text-shadow:var(--btn-shadow-default)] hover:bg-[var(--btn-bg-hover)] hover:text-[var(--btn-text-hover)] hover:[text-shadow:var(--btn-shadow-hover)]"
              style={{
                "--btn-bg-default": glassBg,
                "--btn-bg-hover": whiteSmokeHex,
                "--btn-text-default": whiteSmokeHex,
                "--btn-text-hover": camelHex,
                "--btn-shadow-default": textShadow,
                "--btn-shadow-hover": "none",
                borderColor: `${whiteSmokeHex}B3`,
                outlineColor: whiteSmokeHex,
              } as React.CSSProperties}
            >
              Order Now
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
