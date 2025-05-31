import React from "react";

import { Blockquote as MantineBlockquote } from "@mantine/core";
import { clsx } from "clsx";

import styles from "./Blockquote.module.css";

const Blockquote = (props: React.ComponentProps<"blockquote">) => {
  const { className, ...others } = props;
  return (
    <MantineBlockquote
      color="dark"
      className={clsx(styles["blockquote"], className)}
      {...others}
    />
  );
};

export default Blockquote;
