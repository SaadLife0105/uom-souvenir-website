'use client';

import { useState } from 'react';
import Image from 'next/image';
import { camelHex, floralWhiteHex } from '@/constants/variables';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/600x600/e6f1fb/0c447c?text=UOM+Souvenir';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const gallery = images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];

  return (
    <div className="flex gap-3">
      {gallery.length > 1 && (
        <div className="flex flex-col gap-3">
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${name}`}
              aria-pressed={index === activeIndex}
              className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-20 sm:w-20"
              style={{
                borderColor: index === activeIndex ? camelHex : 'transparent',
                backgroundColor: floralWhiteHex,
                outlineColor: camelHex,
              }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-square flex-1 overflow-hidden rounded-3xl shadow-md" style={{ backgroundColor: floralWhiteHex }}>
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
