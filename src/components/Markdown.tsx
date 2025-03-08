import { createElement } from "react";

import * as prod from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import Anchor from "./_markdown/Anchor";
import Blockquote from "./_markdown/Blockquote";
import CodeBlock from "./_markdown/CodeBlock";
import CodeInline from "./_markdown/CodeInline";
import Divider from "./_markdown/Divider";
import {
  HeadingLevel1,
  HeadingLevel2,
  HeadingLevel3,
  HeadingLevel4,
  HeadingLevel5,
  HeadingLevel6,
} from "./_markdown/Headings";
import Image from "./_markdown/Image";
import { ListItem, OrderedList, UnorderedList } from "./_markdown/List";
import Paragraph from "./_markdown/Paragraph";
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "./_markdown/Table";

type MarkdownProps = {
  content: string;
};

const Markdown = (props: MarkdownProps) => {
  return unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [["className", /^language-./, "math-inline", "math-display"]],
      },
    })
    .use(rehypeKatex)
    .use(rehypeReact, {
      Fragment: prod.Fragment,
      jsx: prod.jsx,
      jsxs: prod.jsxs,
      components: {
        a: Anchor,
        blockquote: Blockquote,
        h1: HeadingLevel1,
        h2: HeadingLevel2,
        h3: HeadingLevel3,
        h4: HeadingLevel4,
        h5: HeadingLevel5,
        h6: HeadingLevel6,
        img: Image,
        p: Paragraph,
        table: Table,
        tr: TableTr,
        td: TableTd,
        th: TableTh,
        thead: TableThead,
        tbody: TableTbody,
        ul: UnorderedList,
        ol: OrderedList,
        li: ListItem,
        pre: CodeBlock,
        code: CodeInline,
        hr: Divider,
      },
      createElement,
    })
    .processSync(props.content).result;
};

export default Markdown;
