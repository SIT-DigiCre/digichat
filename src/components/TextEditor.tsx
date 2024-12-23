"use client";

import React from "react";

import { ActionIcon } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { IconPlus, IconSend2 } from "@tabler/icons-react";

import "@mantine/tiptap/styles.css";
import EmojiPickerControl from "./EmojiPickerControl";
import "./TextEditor.css";
import styles from "./TextEditor.module.css";

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor} className={styles.Editor}>
      <RichTextEditor.Toolbar className={styles.Toolbar}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <EmojiPickerControl />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content className={styles.Content} />
      <RichTextEditor.Toolbar className={styles.Toolbar}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Control>
            <IconPlus stroke={1.5} size="1rem" />
          </RichTextEditor.Control>
        </RichTextEditor.ControlsGroup>
        <ActionIcon w="3rem">
          <IconSend2 />
        </ActionIcon>
      </RichTextEditor.Toolbar>
    </RichTextEditor>
  );
};

export default TextEditor;
