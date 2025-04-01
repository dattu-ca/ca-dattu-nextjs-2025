import type { CollectionConfig } from "payload";
import slugify from "slugify";
import { MetadataBaseFields } from "./Metadata";

export const Post: CollectionConfig = {
  slug: "post",
  hooks: {
    beforeChange: [
      async ({ operation, data }) => {
        if (operation === "create") {
          if (!data.slug) {
            const slug = slugify(data.heading, {
              lower: true,
            });
            data.slug = slug;
          }
        }
        if (operation === "update") {
          if (data.isPublished && !data.publishedAt) {
            data.publishedAt = new Date();
          }
        }
      },
    ],
  },
  fields: [
    {
      name: "entryText",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "isPublished",
      type: "checkbox",
      required: true,
      defaultValue: false,
    },
    {
      name: "publishedAt",
      type: "date",
      required: false,
    },
    {
      name: "metadata",
      type: "group",
      fields: MetadataBaseFields,
    },
  ],
};
