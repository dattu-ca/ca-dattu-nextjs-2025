import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import clsx from "clsx";
import UnderConstruction from "#/components/under-construction";
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

    if (!siteMetadata) return null;

    const favicon =
      typeof siteMetadata.favicon === "object" &&
      siteMetadata.favicon !== null &&
      "url" in siteMetadata.favicon
        ? siteMetadata.favicon.url || undefined
        : undefined;

    return {
      title: {
        template: `%s | ${
          siteMetadata.defaultTitleTempalte || siteMetadata.metadata?.metaTitle
        }`,
        default: siteMetadata.metadata?.metaTitle,
      },
      icons: {
        icon: favicon || "https://dattu.ca/favicon.ico",
      },
      ...proessAndGetMetadata({ metadata: siteMetadata.metadata }),
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
        <UnderConstruction />
        {children}
      </body>
    </html>
  );
}
