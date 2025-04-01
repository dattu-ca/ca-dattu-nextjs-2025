import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import clsx from "clsx";
import UnderConstruction from "#/components/under-construction";
import { payloadServices } from "#/services/payload";
import { Metadata } from "next";

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

    const ogImage =
      typeof siteMetadata.socialMedia?.og?.ogImage === "object" &&
      siteMetadata.socialMedia?.og?.ogImage !== null &&
      "url" in siteMetadata.socialMedia?.og?.ogImage
        ? siteMetadata.socialMedia?.og?.ogImage.url || undefined
        : undefined;

    const twitterImage =
      typeof siteMetadata.socialMedia?.twitter?.twitterImage === "object" &&
      siteMetadata.socialMedia?.twitter?.twitterImage !== null &&
      "url" in siteMetadata.socialMedia?.twitter?.twitterImage
        ? siteMetadata.socialMedia?.twitter?.twitterImage.url || undefined
        : undefined;

    return {
      title: {
        template: `%s | ${siteMetadata.defaultTitleTempalte}`,
        default: siteMetadata.metaTitle,
      },
      description: siteMetadata.metaDescription,
      alternates: {
        canonical: siteMetadata.canonicalURL || undefined,
      },
      keywords: siteMetadata.keywords
        ? siteMetadata.keywords.split(", ")
        : undefined,
      robots: siteMetadata.noindex ? "noindex, nofollow" : "index, follow",
      openGraph: {
        title: siteMetadata.socialMedia?.og?.ogTitle || siteMetadata.metaTitle,
        description:
          siteMetadata.socialMedia?.og?.ogDescription ||
          siteMetadata.metaDescription ||
          undefined,
        url:
          siteMetadata.socialMedia?.og?.ogURL ||
          siteMetadata.canonicalURL ||
          undefined,
        type: siteMetadata.socialMedia?.og?.ogType || "website",
        images: ogImage,
      },
      twitter: {
        card:
          siteMetadata.socialMedia?.twitter?.twitterCardType ||
          "summary_large_image",
        title:
          siteMetadata.socialMedia?.twitter?.twitterTitle ||
          siteMetadata.metaTitle,
        description:
          siteMetadata.socialMedia?.twitter?.twitterDescription ||
          siteMetadata.metaDescription ||
          undefined,
        images: twitterImage,
        creator: siteMetadata.socialMedia?.twitter?.twitterCreator || undefined,
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
        <UnderConstruction />
        {children}
      </body>
    </html>
  );
}
