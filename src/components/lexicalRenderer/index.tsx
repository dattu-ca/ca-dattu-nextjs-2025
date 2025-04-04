import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";
import {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import { jsxConverter } from "./converters";

type Props = {
  data?: SerializedEditorState<SerializedLexicalNode> | undefined;
} & HTMLAttributes<HTMLDivElement>;

const LexicalRichTextRenderer = ({ data, className, ...rest }: Props) => {
  return (
    <>
      {data && (
        <SerializedRichText
          {...rest}
          className={clsx(className)}
          data={data}
          converters={jsxConverter}
        />
      )}
    </>
  );
};

export { LexicalRichTextRenderer };
