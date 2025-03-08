import { createElement } from "react";

import * as prod from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type MarkdownProps = {
  content: string;
};

const Markdown = (props: MarkdownProps) => {
  return unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeReact, {
      Fragment: prod.Fragment,
      jsx: prod.jsx,
      jsxs: prod.jsxs,
      components: {},
      createElement,
    })
    .processSync(props.content).result;
};

export default Markdown;
