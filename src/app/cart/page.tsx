import CartNoticeBanner from "@/components/CartNoticeBanner";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#0d1f33] px-4 py-24 text-[#eef3fb]">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Cart</p>
          <h1 className="text-4xl font-semibold tracking-tight">Your reserved items</h1>
          <p className="max-w-2xl text-sm leading-7 text-[#99a7c0]">
            Review your selected souvenirs, then confirm the reservation to generate your formal payment receipt for UoM campus collection.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 items-stretch">
          <div className="lg:col-span-2 h-full rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Reserved items</p>
            <div className="mt-6 space-y-4 text-sm text-[#eef3fb]">
              <div className="rounded-3xl bg-[#162c47] p-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#eef3fb]">UoM Signature Hoodie</p>
                    <p className="text-xs text-[#99a7c0]">Quantity: 1</p>
                  </div>
                  <p className="font-semibold text-[#eef3fb]">Rs 2,200</p>
                </div>
              </div>
              <div className="rounded-3xl bg-[#162c47] p-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#eef3fb]">Ceramic Campus Mug</p>
                    <p className="text-xs text-[#99a7c0]">Quantity: 1</p>
                  </div>
                  <p className="font-semibold text-[#eef3fb]">Rs 420</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            <div className="h-full flex-1">
              <CartNoticeBanner />
            </div>
            <div className="h-full flex-1 rounded-[2rem] border border-[#3f5a80] bg-[#0d1f33] p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">Next step</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#eef3fb]">Generate Receipt</h2>
              <p className="mt-4 text-sm leading-7 text-[#99a7c0]">
                Confirm your reservation here and receive a formatted receipt via email. Present the receipt at the UoM Finance Office to complete payment and collect your items.
              </p>
              <button className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#faa153] px-6 py-3 text-sm font-semibold text-[#0d1f33] transition hover:bg-[#e69d6d]">
                Generate Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
