import { payloadServices } from "#/services/payload";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata | null> => {
  try {
    const { slug } = await props.params;
    const page = await payloadServices.fetchPageBySlug({ slug });
    if (!page) {
      return null;
    }
    if (!page.metadata) {
      return {
        title: page.heading,
      };
    }
    return {
      title: page.metadata.metaTitle || page.heading,
      description: page.metadata.metaTitle,
      
    };
  } catch (error) {
    console.error("Error fetching page:", error);
  }
  return null;
};

const Page = async (props: { params: tParams }) => {
  const { slug } = await props.params;
  const page = await payloadServices.fetchPageBySlug({ slug });

  return (
    <div>
      <pre>{JSON.stringify({ slug }, null, 2)}</pre>
      <h1 className="text-2xl/7 font-bold">Post: {page?.heading}</h1>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </div>
  );
};

export default Page;
