import { payload } from "./payload.config";

export const fetchPageBySlug = async ({ slug }: { slug: string }) => {
  const response = await payload.find({
    collection: "page",
    where: {
      isPublished: { equals: true },
      slug: { equals: slug },
    },
    limit: 1,
  });

  if (response.docs.length > 0) {
    return response.docs[0];
  }
  return undefined;
};
