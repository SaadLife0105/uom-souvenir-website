export default function CartNoticeBanner() {
  return (
    <div className="rounded-[2rem] bg-[#162c47] p-6 text-sm leading-6 text-[#eef3fb] shadow-sm">
      <p className="font-semibold text-[#faa153]">Important reservation notice</p>
      <p className="mt-2 text-[#99a7c0]">
        No online payments are processed here. This action reserves your items and generates a formal receipt for UoM Finance Office collection.
      </p>
    </div>
  );
}
