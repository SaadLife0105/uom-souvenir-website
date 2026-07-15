import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getReservationsByUserId, type ReservationData } from '@/db/queries';
import { formatPrice } from '@/lib/price';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SignOutButton from '@/components/auth/SignOutButton';
import ChangePasswordForm from '@/components/auth/ChangePasswordForm';
import { camelHex, whiteSmokeHex, floralWhiteHex, azureMistHex, racingRedHex, frostedBlueHex } from '@/constants/variables';

const MUTED = '#5b6b86';

// Mirrors the status-color mapping in src/app/shop/receipt/[id]/page.tsx —
// small enough that duplicating it here is simpler than extracting a shared
// module for four color values.
const STATUS_TOKEN: Record<ReservationData['status'], string> = {
  pending: camelHex,
  confirmed: frostedBlueHex,
  collected: camelHex,
  cancelled: racingRedHex,
};

const pad = (n: number) => String(n).padStart(2, '0');
const formatDate = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect('/sign-in');
  }

  const reservations = await getReservationsByUserId(session.user.id);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pb-20 pt-28" style={{ backgroundColor: floralWhiteHex }}>
        {/* Hero, matching the pattern in src/components/shop/ShopContent.tsx */}
        <section className="pb-10" style={{ backgroundColor: azureMistHex }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: camelHex }}>
              My Account
            </h1>
            <p className="mt-2 text-base" style={{ color: camelHex }}>
              Manage your details and view your reservation history.
            </p>
          </div>
        </section>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          {/* Profile */}
          <section className="rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteSmokeHex }}>
            <h2 className="text-lg font-bold" style={{ color: camelHex }}>Profile</h2>
            <p className="mt-3 text-sm font-semibold" style={{ color: camelHex }}>{session.user.name}</p>
            <p className="text-sm" style={{ color: MUTED }}>{session.user.email}</p>
            <div className="mt-5">
              <SignOutButton />
            </div>
          </section>

          {/* Change password */}
          <section className="rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteSmokeHex }}>
            <h2 className="text-lg font-bold" style={{ color: camelHex }}>Change Password</h2>
            <div className="mt-4">
              <ChangePasswordForm />
            </div>
          </section>

          {/* Order history */}
          <section className="rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteSmokeHex }}>
            <h2 className="text-lg font-bold" style={{ color: camelHex }}>Reservation History</h2>
            {reservations.length === 0 ? (
              <p className="mt-3 text-sm" style={{ color: MUTED }}>
                You haven&apos;t made any reservations yet.{' '}
                <Link href="/shop" className="font-semibold" style={{ color: camelHex }}>
                  Browse the shop
                </Link>
                .
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {reservations.map((r) => (
                  <li
                    key={r.id}
                    className="flex flex-col gap-2 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                    style={{ borderColor: `color-mix(in srgb, ${camelHex} 12%, transparent)` }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                          style={{ backgroundColor: `color-mix(in srgb, ${STATUS_TOKEN[r.status]} 15%, transparent)`, color: STATUS_TOKEN[r.status] }}
                        >
                          {r.status}
                        </span>
                        <span className="text-sm" style={{ color: MUTED }}>{formatDate(r.reservedAt)}</span>
                      </div>
                      <p className="mt-1 text-sm" style={{ color: camelHex }}>
                        {r.items.length} item{r.items.length === 1 ? '' : 's'} · {formatPrice(r.totalAmountCents)}
                      </p>
                    </div>
                    <Link
                      href={`/shop/receipt/${r.id}`}
                      className="cursor-pointer text-sm font-semibold underline-offset-4 transition hover:underline"
                      style={{ color: camelHex }}
                    >
                      View Receipt
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
