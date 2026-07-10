// ponytail: minimal placeholder — reservation history and password-change are planned for a later pass; this page currently only confirms login state and provides sign-out.
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { darkBlueHex } from '@/constants/variables';
import SignOutButton from '@/components/auth/SignOutButton';

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold" style={{ color: darkBlueHex }}>
        My Account
      </h1>
      <p className="text-sm font-semibold" style={{ color: darkBlueHex }}>
        {session.user.name}
      </p>
      <p className="mb-8 text-sm text-[#5b6b86]">{session.user.email}</p>
      <SignOutButton />
    </main>
  );
}
