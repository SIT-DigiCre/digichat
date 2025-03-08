import { Code } from "@mantine/core";

import styles from "./CodeInline.module.css";

const CodeInline = (props: React.HTMLAttributes<HTMLElement>) => {
  const { children } = props;
  return <Code className={styles["code-inline"]}>{children}</Code>;
};

export default CodeInline;
