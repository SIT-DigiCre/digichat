"use client";

import React, { useState, useTransition } from "react";

import { ActionIcon, Image } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { Asset } from "@prisma/client";
import { IconSend2, IconTrash } from "@tabler/icons-react";
import { default as TipTapImage } from "@tiptap/extension-image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "@mantine/tiptap/styles.css";
import EmojiPickerControl from "../EmojiPicker/EmojiPickerControl";
import FileUploadControl from "../FileUploadControl";

import "./TextEditor.css";
import styles from "./TextEditor.module.css";

import { sendMessage } from "#/libs/actions";

type TextEditorProps = {
  user_id: string;
  channel_id: string;
};

const TextEditor: React.FC<TextEditorProps> = ({ user_id, channel_id }) => {
  const [value, setValue] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, Link, TipTapImage],
    content: value,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
    immediatelyRender: false,
  });
  const [isPending, startTransition] = useTransition();
  const [assets, setAssets] = useState<Pick<Asset, "url" | "type">[]>([]);

  const handleClick = () => {
    startTransition(async () => {
      await sendMessage({
        channelId: channel_id,
        userId: user_id,
        type: "NORMAL",
        content: value,
        assets,
      });
      editor?.commands.clearContent();
      setAssets([]);
    });
  };

  const handleUpload = (file: File[]) => {
    startTransition(async () => {
      // TODO: 複数ファイルのアップロードをサポートする
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
    <RichTextEditor editor={editor} className={styles["editor"]}>
      <RichTextEditor.Toolbar className={styles["toolbar"]}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Code />
          <EmojiPickerControl />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content className={styles["content"]} />
      {assets.length > 0 && (
        <div className={styles["assets-area"]}>
          {assets.map((asset, index) => (
            // TODO: assets tableにwidth, height, altカラムを追加する
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
      <RichTextEditor.Toolbar className={styles["toolbar"]}>
        <RichTextEditor.ControlsGroup>
          <FileUploadControl onUpload={handleUpload} disabled={isPending} />
        </RichTextEditor.ControlsGroup>
        <ActionIcon
          w="3rem"
          disabled={(value.trim() === "" && assets.length === 0) || isPending}
          onClick={handleClick}
        >
          <IconSend2 />
        </ActionIcon>
      </RichTextEditor.Toolbar>
    </RichTextEditor>
  );
};

export default TextEditor;
