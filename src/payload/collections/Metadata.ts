import type { CollectionConfig, Field } from "payload";
import slugify from "slugify";

// Base Fields for Metadata, including SEO, Open Graph, and Twitter metadata
export const MetadataBaseFields: Field[] = [
  {
    name: "metaTitle",
    type: "text",
    required: true,
    admin: {
      description:
        "The SEO title of the page, used in search engine results and the browser tab.",
    },
  },
  {
    name: "metaDescription",
    type: "textarea",
    admin: {
      description:
        "The SEO meta description shown in search engine results below the title.",
    },
  },

  {
    name: "canonicalURL",
    label: "Canonical URL",
    type: "text",
    admin: {
      description:
        "The canonical URL for the page to avoid duplicate content issues.",
    },
  },
  {
    name: "keywords",
    type: "text",
    admin: {
      description:
        "SEO keywords (optional, usually ignored by modern search engines).",
    },
  },
  {
    name: "noindex",
    type: "checkbox",
    defaultValue: false,
    admin: {
      description:
        "Prevent search engines from indexing the page (useful for private pages).",
    },
  },
  {
    name: "socialMedia",
    label: "Social Media",
    type: "group",
    fields: [
      {
        name: "og",
        label: "Facebook/Open Graph",
        type: "group",
        fields: [
          {
            name: "ogTitle",
            label: "ogTitle",
            type: "text",
            admin: {
              description:
                "Title for Open Graph metadata when shared on social platforms like Facebook or LinkedIn. Defaults to `metaTitle`.",
            },
          },
          {
            name: "ogDescription",
            label: "ogDescription",
            type: "textarea",
            admin: {
              description:
                "Description for Open Graph metadata when shared on social media. Defaults to `metaDescription`.",
            },
          },
          {
            name: "ogImage",
            label: "ogImage",
            type: "relationship",
            relationTo: "media",
            admin: {
              description:
                "The preview image used for Open Graph sharing (can be different from `metaDescription`).",
            },
          },
          {
            name: "ogType",
            label: "ogType",
            type: "select",
            options: ["website", "article"],
            defaultValue: "website",
            admin: {
              description:
                "The type of content for Open Graph (e.g., `article`, `video`, `website`).",
            },
          },
          {
            name: "ogURL",
            label: "ogURL",
            type: "text",
            admin: {
              description:
                "Override the Open Graph URL (optional, defaults to the current page's URL).",
            },
          },
        ],
      },

      {
        name: "twitter",
        label: "Twitter",
        type: "group",
        fields: [
          {
            name: "twitterCardType",
            label: "twitterCardType",
            type: "select",
            options: ["summary", "summary_large_image"],
            defaultValue: "summary",
            admin: {
              description:
                "Twitter card type (`summary` or `summary_large_image`).",
            },
          },
          {
            name: "twitterTitle",
            label: "twitterTitle",
            type: "text",
            admin: {
              description:
                "The title for the Twitter Card when shared on Twitter. Defaults to `metaTitle`.",
            },
          },
          {
            name: "twitterDescription",
            label: "twitterDescription",
            type: "textarea",
            admin: {
              description:
                "The description for the Twitter Card when shared on Twitter. Defaults to `metaDescription`.",
            },
          },
          {
            name: "twitterImage",
            label: "twitterImage",
            type: "relationship",
            relationTo: "media",
            admin: {
              description:
                "The image used for the Twitter Card. This can be different from the `ogImage`.",
            },
          },
          {
            name: "twitterCreator",
            label: "twitterCreator",
            type: "text",
            admin: {
              description:
                "Twitter handle of the content creator (e.g., `@username`).",
            },
          },
        ],
      },
    ],
  },
];

// Metadata Collection
export const Metadata: CollectionConfig = {
  slug: "metadata",
  hooks: {
    beforeChange: [
      async ({ operation, data }) => {
        if (operation === "create") {
          // Set slug if not provided, based on metaTitle
          if (!data.slug) {
            const slug = slugify(data.metaTitle, {
              lower: true,
            });
            data.slug = slug;
          }
        }
        if (operation === "update") {
          // Automatically set publishedAt on publish
          if (data.isPublished && !data.publishedAt) {
            data.publishedAt = new Date();
          }
        }
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
    },
    ...MetadataBaseFields,
  ],
};
