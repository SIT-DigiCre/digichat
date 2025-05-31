import { Code } from "@mantine/core";
import clsx from "clsx";

import styles from "./CodeInline.module.css";

const CodeInline = (props: React.ComponentProps<"code">) => {
  const { className, ...others } = props;
  return (
    <Code className={clsx(styles["code-inline"], className)} {...others} />
  );
};

export default CodeInline;
