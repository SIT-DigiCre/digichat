"use client";

import dynamic from "next/dynamic";
import React, { useState, useTransition } from "react";

import { ActionIcon, Box, Image, Textarea, Tooltip } from "@mantine/core";
import { Asset } from "@prisma/client";
import { IconEye, IconEyeOff, IconSend2, IconTrash } from "@tabler/icons-react";

import FileUploadControl from "../FileUploadControl";

import styles from "./TextEditor.module.css";

import { sendMessage } from "#/libs/actions";

const Markdown = dynamic(() => import("#/components/Markdown"), { ssr: false });

type TextEditorProps = {
  user_id: string;
  channel_id: string;
};

const TextEditor: React.FC<TextEditorProps> = ({ user_id, channel_id }) => {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [assets, setAssets] = useState<Pick<Asset, "url" | "type">[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      await sendMessage({
        channelId: channel_id,
        userId: user_id,
        type: "NORMAL",
        content: value,
        assets,
      });
      setAssets([]);
      setValue("");
      setShowPreview(false);
    });
  };

  const handleUpload = (file: File[]) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file[0]);
      const res = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200) {
        const body = await res.json();
        setAssets([...assets, { url: body.url, type: "IMAGE" }]);
      }
    });
  };

  return (
    <Box className={styles["editor"]}>
      <FileUploadControl onUpload={handleUpload} disabled={isPending} />
      <div className={styles.textareaWrapper}>
        <Textarea
          minRows={3}
          maxRows={10}
          autosize
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="メッセージをMarkdownで入力..."
          disabled={isPending}
          className={
            styles["content"] +
            (showPreview ? ` ${styles.hideWhenPreview}` : "")
          }
        />
        {showPreview && (
          <div className={styles.previewOverlay}>
            <div className={styles.actionArea}>
              <Tooltip label="プレビューを隠す">
                <ActionIcon
                  variant="filled"
                  color="gray"
                  onClick={() => setShowPreview(false)}
                  aria-label="プレビュー切替"
                >
                  <IconEyeOff />
                </ActionIcon>
              </Tooltip>
              <ActionIcon
                w="3rem"
                size="xl"
                disabled={
                  (value.trim() === "" && assets.length === 0) || isPending
                }
                onClick={handleClick}
                aria-label="送信"
              >
                <IconSend2 />
              </ActionIcon>
            </div>
            <Markdown content={value} />
          </div>
        )}
        {!showPreview && (
          <div className={styles.actionArea}>
            <Tooltip label="プレビューを表示">
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setShowPreview(true)}
                aria-label="プレビュー切替"
              >
                <IconEye />
              </ActionIcon>
            </Tooltip>
            <ActionIcon
              w="3rem"
              size="xl"
              disabled={
                (value.trim() === "" && assets.length === 0) || isPending
              }
              onClick={handleClick}
              aria-label="送信"
            >
              <IconSend2 />
            </ActionIcon>
          </div>
        )}
      </div>
      {assets.length > 0 && (
        <div className={styles["assets-area"]}>
          {assets.map((asset, index) => (
            <div key={asset.url} className={styles["asset-wrapper"]}>
              <Image
                className={styles.asset}
                key={index}
                src={asset.url}
                alt=""
              />
              <ActionIcon
                variant="white"
                color="gray"
                className={styles["asset-delete"]}
                onClick={() => {
                  setAssets(assets.filter((_, i) => i !== index));
                }}
              >
                <IconTrash />
              </ActionIcon>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default TextEditor;
