import { Text } from "@mantine/core";

import styles from "./Paragraph.module.css";

const Paragraph = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <Text size="md" className={styles["paragraph"]} {...props} />;
};

export default Paragraph;
