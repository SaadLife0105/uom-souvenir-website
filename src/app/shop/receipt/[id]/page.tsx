import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getReservationById, type ReservationData } from '@/db/queries';
import { formatPrice } from '@/lib/price';
import { darkBlueHex, goldHex, creamHex, redHex, lightBlueHex } from '@/constants/variables';
import ReceiptView, { type ReceiptViewModel } from './ReceiptView';
import ClearCartOnMount from './ClearCartOnMount';

const MUTED = '#5b6b86'; // shared muted slate used across the rebuilt shop pages

// ponytail: formats in the server's local timezone — fine for a single-campus
// shop. Formatting happens here (server) so the client component receives plain
// strings and can't drift on timezone between SSR and hydration.
const pad = (n: number) => String(n).padStart(2, '0');
const formatDate = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const formatTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

// Map each reservation status to an existing palette token (no green token
// exists, so "confirmed" reads as the positive light blue).
const STATUS_TOKEN: Record<ReservationData['status'], string> = {
  pending: goldHex,
  confirmed: lightBlueHex,
  collected: darkBlueHex,
  cancelled: redHex,
};

// ponytail: deliberate UX delay, not a real loading dependency — keeps
// loading.tsx's skeleton on screen for at least 2s even when the DB fetch
// resolves faster, so the transition never feels like a flash/glitch. Run in
// parallel with the fetch (Promise.all) so total wait is max(fetch, 2000ms),
// not fetch + 2000ms.
const MIN_LOADING_MS = 2000;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [reservation] = await Promise.all([getReservationById(id), delay(MIN_LOADING_MS)]);

  if (!reservation) {
    notFound();
  }

  const vm: ReceiptViewModel = {
    receiptNumber: reservation.receiptNumber,
    date: formatDate(reservation.reservedAt),
    time: formatTime(reservation.reservedAt),
    validTill: formatDate(reservation.expiresAt),
    orderDateTime: `${formatDate(reservation.reservedAt)}, ${formatTime(reservation.reservedAt)}`,
    statusLabel: reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1),
    statusColor: STATUS_TOKEN[reservation.status],
    // ponytail: hardcoded display name until better-auth lands — then this
    // becomes the signed-in user's real name. The guest seed email is not surfaced.
    customerName: 'Valued Customer',
    // Show "Blank" rather than an empty field when no reference was provided.
    paymentRef: reservation.paymentReferenceNumber ?? 'Blank',
    total: formatPrice(reservation.totalAmountCents),
    items: reservation.items.map((item) => ({
      id: item.id,
      qty: String(item.quantity),
      label: item.itemLabel,
      unit: formatPrice(item.unitPriceCents),
      amount: formatPrice(item.unitTotalCents),
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ClearCartOnMount />
      <Navbar />

      <main className="flex-1 pb-20 pt-28" style={{ backgroundColor: creamHex }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/shop"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: darkBlueHex, outlineColor: goldHex }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          {/* Heading */}
          <h1
            className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: darkBlueHex, fontFamily: 'var(--font-playfair)' }}
          >
            Your Receipt
          </h1>
          <p className="mt-2 text-base" style={{ color: MUTED }}>
            Thank you for your order! Please keep this receipt for your records.
          </p>

          <ReceiptView vm={vm} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
