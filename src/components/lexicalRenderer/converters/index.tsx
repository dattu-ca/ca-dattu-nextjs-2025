import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

type NodeTypes = DefaultNodeTypes;

function getSlug(
  relationTo: string | undefined,
  item: string | { [key: string]: unknown; id: string } | undefined
): string {
  if (typeof item === "object" && item !== null && "slug" in item) {
    const slug = String(item.slug ?? "");
    if (relationTo === "page") {
      return `/page/${slug}`;
    }
    return slug;
  }
  return "";
}

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  link: ({ node, nodesToJSX }) => {
    console.log(node);
    const text = nodesToJSX({ nodes: node.children });
    if (node.fields.linkType === "internal") {
      const relationTo = node.fields.doc?.relationTo;
      const internalLink = getSlug(relationTo, node.fields.doc?.value);
      return (
        <Link
          href={internalLink}
          target={node.fields.newTab ? "_blank" : undefined}
        >
          {text}
        </Link>
      );
    }
    return (
      <Link
        href={node.fields.url!}
        target={node.fields.newTab ? "_blank" : "_self"}
      >
        {text}
      </Link>
    );
  },
});
