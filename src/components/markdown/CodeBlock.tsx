import React, { Children, isValidElement } from "react";

import { CodeHighlight } from "@mantine/code-highlight";

import styles from "./CodeBlock.module.css";

const languageClassPattern = /^language-(.+)/;

const CodeBlock = ({ children }: React.ComponentProps<"pre">) => {
  const listedChildren = Children.toArray(children);
  if (isValidElement(listedChildren[0])) {
    const codeElement = listedChildren[0] as React.ReactElement<HTMLElement>;

    const language = codeElement.props.className
      ? languageClassPattern.exec(codeElement.props.className)?.[1]
      : undefined;

    return (
      <CodeHighlight
        className={styles["code-block"]}
        code={codeElement.props.children.toString()}
        language={language}
        withCopyButton={false}
      />
    );
  }

  return <pre>{children}</pre>;
};

export default CodeBlock;
