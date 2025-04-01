import { SiteMetadatum } from "#/payload-types";
import { payload } from "./payload.config";

export const fetchSiteMetaData: () => Promise<
  SiteMetadatum | undefined
> = async () => {
  const response = await payload.find({
    collection: "siteMetadata",
    limit: 1,
  });

  if (response.docs.length > 0) {
    return response.docs[0];
  }
  return undefined;
};
