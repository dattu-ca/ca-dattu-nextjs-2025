import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";


import clsx from "clsx";
import UnderConstruction from "#/components/under-construction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "bg-slate-100"
        )}
      >
        <UnderConstruction/>
        {children}
      </body>
    </html>
  );
}
