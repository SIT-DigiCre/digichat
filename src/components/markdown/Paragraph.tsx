import { Text } from "@mantine/core";
import { clsx } from "clsx";

import styles from "./Paragraph.module.css";

const Paragraph = (props: React.ComponentProps<"p">) => {
  const { className, ...others } = props;
  return (
    <Text
      size="md"
      className={clsx(styles["paragraph"], className)}
      {...others}
    />
  );
};

export default Paragraph;
