import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import type { CollectionConfig } from "payload";


export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          const uniqueID = uuidv4(); // Generate a unique UUID
          const extension = req.file.name.split(".").pop() || ""; // Get file extension
          const baseName = req.file.name.replace(/\.[^/.]+$/, ""); // Remove extension
          const name = `${baseName}-${uniqueID}.${extension}`; // Append UUID
          req.file.name = slugify(name, {
            lower: true,
          });
        }
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
