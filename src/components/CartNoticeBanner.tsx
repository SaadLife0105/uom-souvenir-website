export default function CartNoticeBanner() {
  return (
    <div className="rounded-[2rem] border border-[#A88243]/20 bg-[#F4F7FA] p-6 text-sm leading-6 text-slate-700 dark:border-slate-700/40 dark:bg-slate-950 dark:text-slate-200">
      <p className="font-semibold text-slate-950">Important reservation notice</p>
      <p className="mt-2">
        No online payments are processed here. This action reserves your items and generates your physical payment receipt.
      </p>
    </div>
  );
}
