import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ReserveGateProvider } from "@/context/ReserveGateContext";
import ReserveGateModal from "@/components/layout/ReserveGateModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "University of Mauritius Souvenir Store",
  description: "Shop authentic University of Mauritius merchandise, campus apparel and premium souvenirs.",
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full max-w-full">
        <ReserveGateProvider>
          <CartProvider>{children}</CartProvider>
          <ReserveGateModal />
        </ReserveGateProvider>
      </body>
    </html>
  );
}
