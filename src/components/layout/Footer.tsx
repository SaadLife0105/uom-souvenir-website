import Image from "next/image";
import uomLogo from "@/app/images/uom-logo.png";
import { footerLinks } from "@/data/store-data";
import { paleBlueV, blackV, darkBlueV, redV, whiteV } from "@/constants/variables";

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: paleBlueV, color: blackV }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-white/80 px-4 py-3 shadow-sm shadow-[#E1423D]/10">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white p-2">
                <Image src={uomLogo} alt="UoM Souvenir Store Logo" className="w-auto h-auto object-contain" width={48} height={48} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: blackV }}>UoM Souvenir Shop</p>
                <p className="text-sm" style={{ color: darkBlueV }}>Official campus merchandise portal</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7" style={{ color: darkBlueV }}>
              Browse official University of Mauritius souvenirs, reserve items online, and collect them from the Finance Office with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: redV }}>Contact Us</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7" style={{ color: blackV }}>
              {footerLinks.contact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 lg:px-8" style={{ backgroundColor: redV }}>
        <div className="mx-auto flex flex-col items-center justify-between gap-3 text-center text-sm sm:flex-row sm:text-left" style={{ color: whiteV }}>
          <p>© 2026 University of Mauritius Souvenir Store. All rights reserved.</p>
          <p className="text-sm" style={{ color: whiteV }}>Powered by UOM Computer Club (2025-2026)</p>
        </div>
      </div>
    </footer>
  );
}
