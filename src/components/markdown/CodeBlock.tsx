import React, { Children, isValidElement } from "react";

import { CodeHighlight } from "@mantine/code-highlight";
import { clsx } from "clsx";

import styles from "./CodeBlock.module.css";

const languageClassPattern = /^language-(.+)/;

const CodeBlock = (props: React.ComponentProps<"pre">) => {
  const { children, className } = props;
  const listedChildren = Children.toArray(children);
  if (isValidElement(listedChildren[0])) {
    const codeElement = listedChildren[0] as React.ReactElement<HTMLElement>;

    const language = codeElement.props.className
      ? languageClassPattern.exec(codeElement.props.className)?.[1]
      : undefined;

    return (
      <CodeHighlight
        className={clsx(styles["code-block"], className)}
        code={codeElement.props.children.toString()}
        language={language}
        withCopyButton={false}
      />
    );
  }

  return <pre {...props} />;
};

export default CodeBlock;
