export default function CartNoticeBanner() {
  return (
    <div className="rounded-[2rem] border-2 border-[#C82520] bg-white p-6 text-sm leading-6 text-[#1f2937] shadow-xl">
      <p className="font-semibold text-[#C82520]">Important reservation notice</p>
      <p className="mt-2 text-[#7F0906]">
        No online payments are processed here. This action reserves your items and generates a formal receipt for UoM Finance Office collection.
      </p>
    </div>
  );
}
