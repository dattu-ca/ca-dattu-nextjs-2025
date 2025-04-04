import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

type NodeTypes = DefaultNodeTypes;

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  link: ({ node, nodesToJSX }) => {
    console.log(node);
    const text = nodesToJSX({ nodes: node.children }).join("");
    if(node.fields.linkType === 'internal'){
        return <Link href={node.fields.url!} target={node.fields.newTab ? "_blank" : "_self"}>{text}</Link>
    }
    return <Link href={node.fields.url!} target={node.fields.newTab ? "_blank" : "_self"}>{text}</Link>
  }
});
