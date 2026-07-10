'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { darkBlueHex, whiteHex, goldHex } from '@/constants/variables';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ backgroundColor: darkBlueHex, color: whiteHex, outlineColor: goldHex }}
    >
      Sign Out
    </button>
  );
}
