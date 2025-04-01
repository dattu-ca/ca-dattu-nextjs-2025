import { Metadatum } from "#/payload-types";

export const proessAndGetSocialMetadata = ({
  metadata,
}: {
  metadata: Omit<Metadatum, "id" | "slug" | "updatedAt" | "createdAt">;
}) => {
  const ogImage =
    typeof metadata.socialMedia?.og?.ogImage === "object" &&
    metadata.socialMedia?.og?.ogImage !== null &&
    "url" in metadata.socialMedia?.og?.ogImage
      ? metadata.socialMedia?.og?.ogImage.url || undefined
      : undefined;

  const twitterImage =
    typeof metadata.socialMedia?.twitter?.twitterImage === "object" &&
    metadata.socialMedia?.twitter?.twitterImage !== null &&
    "url" in metadata.socialMedia?.twitter?.twitterImage
      ? metadata.socialMedia?.twitter?.twitterImage.url || undefined
      : undefined;

  if (metadata && metadata.socialMedia) {
    return {
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      alternates: {
        canonical: metadata.canonicalURL || undefined,
      },
      keywords: metadata.keywords ? metadata.keywords.split(", ") : undefined,
      robots: metadata.noindex ? "noindex, nofollow" : "index, follow",
      openGraph: {
        title: metadata.socialMedia?.og?.ogTitle || metadata.metaTitle || undefined,
        description:
          metadata.socialMedia?.og?.ogDescription ||
          metadata.metaDescription ||
          undefined,
        url:
          metadata.socialMedia?.og?.ogURL || metadata.canonicalURL || undefined,
        type: metadata.socialMedia?.og?.ogType || "website",
        images: ogImage || undefined,
      },
      twitter: {
        card:
          metadata.socialMedia?.twitter?.twitterCardType ||
          "summary_large_image",
        title:
          metadata.socialMedia?.twitter?.twitterTitle || metadata.metaTitle,
        description:
          metadata.socialMedia?.twitter?.twitterDescription ||
          metadata.metaDescription ||
          undefined,
        images: twitterImage,
        creator: metadata.socialMedia?.twitter?.twitterCreator || undefined,
      },
    };
  }
  return {};
};
