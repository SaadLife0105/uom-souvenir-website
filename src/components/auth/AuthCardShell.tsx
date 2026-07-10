import Image from 'next/image';
import backgroundImage from '@/app/images/registration/background-12.png';
import { deepBlueHex, whiteHex } from '@/constants/variables';

export default function AuthCardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6">
      <Image
        src={backgroundImage}
        alt="University of Mauritius campus"
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `color-mix(in srgb, ${deepBlueHex} 55%, transparent)` }}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 backdrop-blur-md"
        style={{
          backgroundColor: `color-mix(in srgb, ${deepBlueHex} 70%, transparent)`,
          border: `1px solid color-mix(in srgb, ${whiteHex} 15%, transparent)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
