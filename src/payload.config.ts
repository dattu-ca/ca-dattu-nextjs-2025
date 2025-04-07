// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Metadata } from "./payload/collections/Metadata";
import { SiteMetadata } from "./payload/collections/SiteMetadata";
import { Page } from "./payload/collections/Page";
import { Article } from "./payload/collections/Article";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const MONGODB = {
  APP: {
    URI_PREFIX: process.env.MONGODB_APP_URI_PREFIX as string,
    URI: process.env.MONGODB_APP_URI as string,
    URI_QS: process.env.MONGODB_APP_URI_QS as string,
    USERNAME: process.env.MONGODB_APP_USERNAME as string,
    PASSWORD: process.env.MONGODB_APP_PASSWORD as string,
  },
  DB_NAME: process.env.MONGODB_DBNAME_PAYLOAD as string,
};

const DATABASE_URI = `${MONGODB.APP.URI_PREFIX}${MONGODB.APP.USERNAME}:${MONGODB.APP.PASSWORD}@${MONGODB.APP.URI}${MONGODB.DB_NAME}?${MONGODB.APP.URI_QS}`;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Metadata, SiteMetadata, Page, Article],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: DATABASE_URI,
  }),
  routes: {
    admin: "/payload/admin",
    api: "/payload/api",
    graphQL: "/payload/api/graphql",
    graphQLPlayground: "/payload/api/graphql-playground",
  },
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // storage-adapter-placeholder
  ],
});
