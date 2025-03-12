import React from "react";

import { Blockquote as MantineBlockquote } from "@mantine/core";

import styles from "./Blockquote.module.css";

const Blockquote = ({ children }: React.ComponentProps<"blockquote">) => {
  return (
    <MantineBlockquote color="dark" className={styles["blockquote"]}>
      {children}
    </MantineBlockquote>
  );
};

export default Blockquote;
