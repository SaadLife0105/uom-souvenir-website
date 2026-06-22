import Image from "next/image";
import uomLogo from "@/app/images/uom-logo.png";
import { footerLinks } from "@/data/store-data";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0d1f33] text-[#eef3fb]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-[#162c47] px-4 py-3 shadow-sm shadow-[#0d1f33]/20">
              <div className="relative h-12 w-auto overflow-hidden rounded-2xl bg-[#eef3fb] p-2">
                <Image src={uomLogo} alt="UoM Souvenir Store Logo" className="w-auto h-auto object-contain" width={48} height={48} />
              </div>
              <span className="font-semibold text-[#eef3fb]">UoM Souvenir Store</span>
            </div>
            <p className="text-sm leading-7 text-[#99a7c0]">
              Official University of Mauritius merchandise with premium campus essentials, gifts, and student favorites.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eef3fb]">Quick Links</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7">
              {footerLinks.quick.map((item) => (
                <li key={item}>
                  <a href="#home" className="transition hover:text-[#faa153]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eef3fb]">Contact</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#99a7c0]">
              {footerLinks.contact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#3f5a80] pt-8 text-sm text-[#99a7c0] sm:flex-row">
          <p>© 2026 University of Mauritius Souvenir Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-[#faa153]">Instagram</a>
            <a href="#" className="transition hover:text-[#faa153]">Facebook</a>
            <a href="#" className="transition hover:text-[#faa153]">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
