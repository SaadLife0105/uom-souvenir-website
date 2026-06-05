import { footerLinks } from "./store-data";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0d1f33] text-[#eef3fb]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#faa153] px-4 font-semibold text-[#0d1f33] shadow-sm shadow-[#0d1f33]/20">
              UoM Souvenir Store
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#99a7c0]">
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
