import { Text } from "@mantine/core";

import styles from "./Paragraph.module.css";

const Paragraph = ({ children }: React.ComponentProps<"p">) => {
  return (
    <Text size="md" className={styles["paragraph"]}>
      {children}
    </Text>
  );
};

export default Paragraph;
