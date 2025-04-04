import { payloadServices } from "#/services/payload";
import { Metadata } from "next";
import { LexicalRichTextRenderer } from "#/components/lexicalRenderer";

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
    <div className="prose lg:prose-sm prose-neutral">
      <pre>{JSON.stringify({ slug }, null, 2)}</pre>
      <h1>Page: {page?.heading}</h1>
      {page?.content && <LexicalRichTextRenderer data={page.content} />}
    </div>
  );
};

export default Page;
