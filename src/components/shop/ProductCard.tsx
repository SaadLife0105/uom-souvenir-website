import Image from 'next/image';
import Link from 'next/link';
import type { ShopProductData } from '@/db/queries';
import { formatPrice } from '@/lib/price';
import { darkBlueHex, whiteHex } from '@/constants/variables';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x600/e6f1fb/0c447c?text=UOM+Souvenir';

export default function ProductCard({ product }: { product: ShopProductData }) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ backgroundColor: whiteHex, outlineColor: darkBlueHex }}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4E5CD]/40">
        <Image
          src={product.imageUrl ?? PLACEHOLDER_IMAGE}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          // ponytail: seed images are placehold.co svg placeholders, which next/image's
          // optimizer rejects by default — drop once real product photos replace them
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-lg font-semibold" style={{ color: darkBlueHex }}>
            {product.name}
          </p>
          <p className="mt-1 text-sm text-[#5b6b86]">{product.category}</p>
        </div>

        <p className="text-base font-semibold" style={{ color: darkBlueHex }}>
          {formatPrice(product.priceCents)}
        </p>

        {product.colors.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-[#5b6b86]">Available in</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  aria-hidden
                  className="h-5 w-5 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hexCode }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
