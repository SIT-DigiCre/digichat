"use client";

import { Box } from "@mantine/core";

import TextEditor from "../TextEditor/TextEditor";

import styles from "./ChannelFooter.module.css";

const ChannelFooter: React.FC = () => {
  return (
    <Box className={styles["channel-footer"]}>
      <TextEditor
        value="aaa"
        onChange={() => {
          return 0;
        }}
        onSend={() => {
          return 0;
        }}
      />
    </Box>
  );
};

export default ChannelFooter;
