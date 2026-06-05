import CartNoticeBanner from "@/components/CartNoticeBanner";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] px-4 py-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200/70 bg-white p-10 shadow-sm dark:border-slate-700/40 dark:bg-slate-900">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#009AD9]">Cart</p>
          <h1 className="text-4xl font-semibold tracking-tight">Your reserved items</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Review your selected souvenirs, then confirm the reservation to generate your physical payment receipt for UoM campus collection.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 items-stretch">
          <div className="lg:col-span-2 h-full rounded-[2rem] border border-slate-200/70 bg-[#F4F7FA] p-8 shadow-sm dark:border-slate-700/40 dark:bg-slate-950">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#009AD9]">Reserved items</p>
            <div className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-slate-100">UoM Signature Hoodie</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Quantity: 1</p>
                  </div>
                  <p className="font-semibold text-slate-950 dark:text-slate-100">Rs 2,200</p>
                </div>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-slate-100">Ceramic Campus Mug</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Quantity: 1</p>
                  </div>
                  <p className="font-semibold text-slate-950 dark:text-slate-100">Rs 420</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            <div className="h-full flex-1">
              <CartNoticeBanner />
            </div>
            <div className="h-full flex-1 rounded-[2rem] border border-[#A88243]/20 bg-white p-8 shadow-sm dark:border-slate-700/40 dark:bg-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#009AD9]">Next step</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">Generate Receipt</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Confirm your reservation here and receive a formatted invoice/receipt via email. Present the receipt at the UoM Finance Office to complete payment and collect your items.
              </p>
              <button className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#009AD9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007fbf]">
                Generate Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
