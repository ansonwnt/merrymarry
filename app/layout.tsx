import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Jacky & Angel | 婚禮心意清單",
  description: "Wedding gift list for Jacky & Angel, 23 July 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className={`${cormorant.variable} ${lato.variable} ${notoSerifTC.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
