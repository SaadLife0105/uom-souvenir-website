'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Info, ShoppingBag, Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import receiptTemplate from '@/app/images/receipt/receipt-template.png';
import { darkBlueHex, whiteHex, goldHex } from '@/constants/variables';

// ponytail: the receipt card renders the OFFICIAL institutional template
// (receipt-template.png, 1414×2000) as a literal image and overlays only the
// dynamic values on top — it must stay pixel-identical to the source, so nothing
// here is reconstructed in HTML. The template ships with baked-in "xx/xx/xxxx"
// placeholder text, so each value is preceded by a paper-colored mask box that
// hides the placeholder underneath. The serif/ink only style the overlaid values
// to blend with the template's printed Times labels; they are NOT the project
// palette (which governs the sidebar instead). All anchors are percentages of the
// 1414×2000 frame, measured directly from the PNG pixels.
const RECEIPT_INK = '#1A1A1A'; // near-black, matches the template's printed text
const RECEIPT_SERIF = "'Times New Roman', Times, serif";
const RECEIPT_PAPER = 'rgb(253, 254, 253)'; // template's blank paper — masks the printed xx placeholders

// Overlay font sizes in cqw (1cqw = 1% of the card's width) so text scales with
// the image at any screen size; ~2.8cqw matches the printed label size.
const BODY_FS = '2.8cqw';
const ROW_FS = '2.6cqw';
const TOTAL_FS = '2.95cqw';

// Vertical CENTERS of each printed label (paired with translateY(-50%)).
const Y_DATE = 16.2;
const Y_FIRST_ROW = 25.5; // center of the first item row
// ponytail: every item row reserves the WORST-CASE 2-line height (a name +
// "— Colour, Size X" never realistically needs 3 lines), so ROW_STEP is a fixed
// step sized so a wrapped 2-line row can't collide with the next row. Trade-off:
// all-single-line receipts get a little extra air between rows. Ceiling: ~8 line
// items fit before the column reaches the TOTAL band (~72%); larger orders would
// need a smaller step or a scrollable card.
const ROW_STEP = 5.5;
const Y_TOTAL = 73.8;
const Y_NAME = 78.3;
const Y_PAYREF = 82.3;
const Y_VALID = 86.5;

// Horizontal value anchors — where each printed label leaves off.
const X_DATE = 12.0;
const X_TIME = 89.1;
const X_QTY = 6.0;
const X_ITEM = 17.0;
// ITEM text wraps within this width, which stops well short of the UNIT PRICE
// column (X_UNIT) so long labels keep clear breathing room before the price.
const ITEM_MAXW = 33.0; // ITEM text spans 17%..50%; UNIT PRICE starts at 56.5%
const X_UNIT = 56.5;
const R_AMT = 4.9; // AMT + TOTAL are right-aligned this far from the right edge
const X_NAME = 13.8;
const X_PAYREF = 38.8;
const X_VALID = 17.3;

// Placeholder mask rects [leftPct, widthPct] covering the template's printed xx text.
const MASK_DATE: [number, number] = [11.6, 11.2];
const MASK_TIME: [number, number] = [88.7, 5.9];
const MASK_NAME: [number, number] = [13.4, 19.8];
const MASK_PAYREF: [number, number] = [38.4, 11.2];
const MASK_VALID: [number, number] = [16.9, 12.7];

const fieldBase: CSSProperties = {
  position: 'absolute',
  transform: 'translateY(-50%)',
  fontFamily: RECEIPT_SERIF,
  color: RECEIPT_INK,
  lineHeight: 1,
  whiteSpace: 'nowrap',
};
// Left-anchored fill-in (most fields).
const fieldL = (top: number, left: number, fontSize = BODY_FS): CSSProperties => ({
  ...fieldBase,
  top: `${top}%`,
  left: `${left}%`,
  fontSize,
});
// Right-anchored fill-in (AMT column + TOTAL).
const fieldR = (top: number, right: number, fontSize = BODY_FS): CSSProperties => ({
  ...fieldBase,
  top: `${top}%`,
  right: `${right}%`,
  textAlign: 'right',
  fontSize,
});
// Paper-colored box that hides a printed placeholder before its value is drawn.
const mask = (top: number, [left, width]: [number, number]): CSSProperties => ({
  position: 'absolute',
  top: `${top}%`,
  left: `${left}%`,
  width: `${width}%`,
  height: '2.9%',
  transform: 'translateY(-50%)',
  backgroundColor: RECEIPT_PAPER,
});

const MUTED = '#5b6b86'; // shared muted slate used across the rebuilt shop pages

export interface ReceiptViewModel {
  receiptNumber: string;
  date: string;
  time: string;
  validTill: string;
  orderDateTime: string;
  statusLabel: string;
  statusColor: string;
  customerName: string;
  paymentRef: string; // already resolved to "Blank" when null
  total: string;
  items: { id: string; qty: string; label: string; unit: string; amount: string }[];
}

export default function ReceiptView({ vm }: { vm: ReceiptViewModel }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      // skipFonts: the card only uses the system serif (Times New Roman), so we
      // don't need to embed any web fonts — and skipping avoids the unrelated
      // Playfair @font-face fetch slowing/erroring the capture.
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });
      const link = document.createElement('a');
      link.download = `uom-receipt-${vm.receiptNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Receipt image download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,300px)_1fr] lg:items-start">
      {/* ---------------------------------------------------------------- */}
      {/* Left sidebar — layout from receiptmockup.png, tokens-only colors  */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-6">
        {/* Disclaimer — copy kept in sync with /cart's disclaimer box */}
        <div className="flex gap-3 rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteHex }}>
          <Info className="mt-0.5 h-5 w-5 shrink-0" style={{ color: goldHex }} />
          <div className="text-sm leading-6" style={{ color: MUTED }}>
            <p className="font-bold" style={{ color: darkBlueHex }}>Disclaimer</p>
            {/* ponytail: static copy — mirrors the /cart disclaimer. */}
            <p className="mt-1">All products are official UOM souvenirs. Colors may vary slightly from images.</p>
            <p>We are not responsible for any delays caused by delivery partners.</p>
            <p>
              By proceeding, you agree to our{' '}
              <Link href="#" className="cursor-pointer font-semibold underline underline-offset-2" style={{ color: darkBlueHex }}>
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Order Summary — real status pill + reservedAt; no Receipt No.,
            Customer ID, or Payment Method (none exist in the schema). */}
        <div className="rounded-3xl p-6 shadow-md" style={{ backgroundColor: whiteHex }}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" style={{ color: goldHex }} />
            <p className="font-bold" style={{ color: darkBlueHex }}>Order Summary</p>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div>
              <p className="text-xs" style={{ color: MUTED }}>Order Date</p>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: darkBlueHex }}>
                {vm.orderDateTime}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: MUTED }}>Order Status</p>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${vm.statusColor} 16%, ${whiteHex})`,
                  color: `color-mix(in srgb, ${vm.statusColor} 75%, ${RECEIPT_INK})`,
                }}
              >
                {vm.statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Download — sits below Order Summary, OUTSIDE the captured card.
            Normal project button styling (not the template's locked colors). */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold shadow-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: darkBlueHex, color: whiteHex, outlineColor: goldHex }}
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing…
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Receipt as Image
            </>
          )}
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Right card — the LITERAL official template image with dynamic     */}
      {/* values absolutely positioned over its pre-printed labels.         */}
      {/* containerType: inline-size makes the cqw font units scale with    */}
      {/* the card width; aspect-ratio locks the 1414:2000 frame so the     */}
      {/* percentage anchors stay aligned at every breakpoint. cardRef wraps */}
      {/* exactly this node — it is what download-as-image captures.         */}
      {/* ---------------------------------------------------------------- */}
      <div
        ref={cardRef}
        className="relative w-full overflow-hidden rounded-3xl shadow-md"
        style={{ aspectRatio: '1414 / 2000', containerType: 'inline-size', backgroundColor: whiteHex }}
      >
        <Image
          src={receiptTemplate}
          alt="Official University of Mauritius Souvenir Shop receipt"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain"
        />

        {/* Date / Time — mask the printed xx placeholders, then fill values */}
        <span style={mask(Y_DATE, MASK_DATE)} />
        <span style={fieldL(Y_DATE, X_DATE)}>{vm.date}</span>
        <span style={mask(Y_DATE, MASK_TIME)} />
        <span style={fieldL(Y_DATE, X_TIME)}>{vm.time}</span>

        {/* Item rows — vertical offset computed per index. itemLabel wraps within
            the ITEM column (never truncates); each slot reserves 2-line height. */}
        {vm.items.map((item, i) => {
          const y = Y_FIRST_ROW + i * ROW_STEP;
          return (
            <Fragment key={item.id}>
              <span style={fieldL(y, X_QTY, ROW_FS)}>{item.qty}</span>
              <span
                style={{
                  ...fieldL(y, X_ITEM, ROW_FS),
                  whiteSpace: 'normal',
                  maxWidth: `${ITEM_MAXW}%`,
                  lineHeight: 1.15,
                }}
              >
                {item.label}
              </span>
              <span style={fieldL(y, X_UNIT, ROW_FS)}>{item.unit}</span>
              <span style={fieldR(y, R_AMT, ROW_FS)}>{item.amount}</span>
            </Fragment>
          );
        })}

        {/* Total — right-aligned under the AMT column, next to printed TOTAL */}
        <span style={{ ...fieldR(Y_TOTAL, R_AMT, TOTAL_FS), fontWeight: 700 }}>{vm.total}</span>

        {/* Name / Payment Reference Number / Valid Till — labels are printed in
            the image; we mask each baked-in placeholder and fill the value. The
            payment reference shows "Blank" (resolved server-side) when the
            customer didn't provide one, so the field never reads as missing. */}
        <span style={mask(Y_NAME, MASK_NAME)} />
        <span style={fieldL(Y_NAME, X_NAME)}>{vm.customerName}</span>

        <span style={mask(Y_PAYREF, MASK_PAYREF)} />
        <span style={fieldL(Y_PAYREF, X_PAYREF)}>{vm.paymentRef}</span>

        <span style={mask(Y_VALID, MASK_VALID)} />
        <span style={fieldL(Y_VALID, X_VALID)}>{vm.validTill}</span>
      </div>
    </div>
  );
}
