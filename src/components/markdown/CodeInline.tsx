import { Code } from "@mantine/core";

import styles from "./CodeInline.module.css";

const CodeInline = ({ children }: React.ComponentProps<"code">) => {
  return <Code className={styles["code-inline"]}>{children}</Code>;
};

export default CodeInline;
