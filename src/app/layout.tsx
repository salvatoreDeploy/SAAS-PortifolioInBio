import "./globals.css";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";

export const metadata: Metadata = {
  title: "Portifolio In Bio",
  description: "Generated by create next app",
};

const hedHatDisplay = Red_Hat_Display({
  weight: ["700", "400"],
  subsets: ["latin"],
  variable: "--font-hedHadDisplay",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${hedHatDisplay.variable}`}>
      <body className="bg-primary antialiased">{children}</body>
    </html>
  );
}
