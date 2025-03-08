import { Blockquote as MantineBlockquote } from "@mantine/core";

import styles from "./Blockquote.module.css";

const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
  return (
    <MantineBlockquote
      color="dark"
      className={styles["blockquote"]}
      {...props}
    />
  );
};

export default Blockquote;
