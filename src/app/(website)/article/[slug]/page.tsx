import { payloadServices } from "#/services/payload";
import { Metadata } from "next";
import { LexicalRichTextRenderer } from "#/components/lexicalRenderer";

type tParams = Promise<{ slug: string }>;

export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata | null> => {
  try {
    const { slug } = await props.params;
    const article = await payloadServices.fetchArticleBySlug({ slug });
    if (!article) {
      return null;
    }
    if (!article.metadata) {
      return {
        title: article.heading,
      };
    }
    return {
      title: article.metadata.metaTitle || article.heading,
      description: article.metadata.metaTitle,
    };
  } catch (error) {
    console.error("Error fetching page:", error);
  }
  return null;
};

const Page = async (props: { params: tParams }) => {
  const { slug } = await props.params;
  const article = await payloadServices.fetchArticleBySlug({ slug });

  return (
    <div className="prose lg:prose-sm prose-neutral">
      <pre>{JSON.stringify({ slug }, null, 2)}</pre>
      <h1>Page: {article?.heading}</h1>
      {article?.content && <LexicalRichTextRenderer data={article.content} />}
    </div>
  );
};

export default Page;
