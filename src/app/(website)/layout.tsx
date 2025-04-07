import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import clsx from "clsx";
import { payloadServices } from "#/services/payload";
import { Metadata } from "next";
import { proessAndGetSocialMetadata as proessAndGetMetadata } from "#/utils/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata | null> => {
  try {
    const siteMetadata = await payloadServices.fetchSiteMetaData();

    if (!siteMetadata || !siteMetadata.metadata) return null;

    const favicon =
      typeof siteMetadata.favicon === "object" &&
      siteMetadata.favicon !== null &&
      "url" in siteMetadata.favicon
        ? siteMetadata.favicon.url || undefined
        : undefined;

    return {
      ...proessAndGetMetadata({ metadata: siteMetadata.metadata }),
      title: {
        template: `%s | ${
          siteMetadata.defaultTitleTempalte || siteMetadata.metadata?.metaTitle
        }`,
        default: siteMetadata.metadata?.metaTitle ?? "",
      },
      icons: {
        icon: favicon || "https://dattu.ca/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Error fetching site metadata:", error);
    return null;
  }
};

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
        {children}
      </body>
    </html>
  );
}
