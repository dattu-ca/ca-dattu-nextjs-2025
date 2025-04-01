import type { CollectionConfig, Field } from "payload";
import { MetadataBaseFields } from "./Metadata";


export const SiteMetadata: CollectionConfig = {
  slug: "siteMetadata",
  access: {
    create: async ({ req }) => {
      const existingDocs = await req.payload.find({
        collection: "siteMetadata",
        limit: 1,
      });
      return existingDocs.totalDocs === 0; // Allow creation only if no document exists
    },
    delete: () => false, // Disallow deletion
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation === "create") {
          const existingDocs = await req.payload.find({
            collection: "siteMetadata",
            limit: 1,
          });
          if (existingDocs.totalDocs > 0) {
            throw new Error("Only one Site Metadata document is allowed.");
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
      name: "defaultTitleTempalte",
      type: "text",
      required: true,
    },
    ...MetadataBaseFields
  ],
};
