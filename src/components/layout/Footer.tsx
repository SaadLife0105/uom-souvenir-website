import Image from "next/image";
import uomLogo from "@/app/images/uom-logo.png";
import { footerLinks } from "@/data/store-data";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#D7F2FF] text-[#1f2937]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-white/80 px-4 py-3 shadow-sm shadow-[#C82520]/10">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white p-2">
                <Image src={uomLogo} alt="UoM Souvenir Store Logo" className="w-auto h-auto object-contain" width={48} height={48} />
              </div>
              <div>
                <p className="font-semibold text-[#1f2937]">UoM Souvenir Shop</p>
                <p className="text-sm text-[#475569]">Official campus merchandise portal</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#475569]">
              Browse official University of Mauritius souvenirs, reserve items online, and collect them from the Finance Office with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C82520]">Contact Us</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#1f2937]">
              {footerLinks.contact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#C82520] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center justify-between gap-3 text-center text-sm text-white sm:flex-row sm:text-left">
          <p>© 2026 University of Mauritius Souvenir Store. All rights reserved.</p>
          <p className="text-sm text-white/90">Powered by UOM Computer Club (2025-2026)</p>
        </div>
      </div>
    </footer>
  );
}
