"use client";

import React from "react";

import { ActionIcon } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconSend2 } from "@tabler/icons-react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "@mantine/tiptap/styles.css";
import EmojiPickerControl from "./EmojiPickerControl";
import FileUploadControl from "./FileUploadControl";
import "./TextEditor.css";
import styles from "./TextEditor.module.css";

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <RichTextEditor editor={editor} className={styles.Editor}>
      <RichTextEditor.Toolbar className={styles.Toolbar}>
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
      <RichTextEditor.Content className={styles.Content} />
      <RichTextEditor.Toolbar className={styles.Toolbar}>
        <RichTextEditor.ControlsGroup>
          <FileUploadControl />
        </RichTextEditor.ControlsGroup>
        <ActionIcon w="3rem" disabled={value.trim() === ""}>
          <IconSend2 />
        </ActionIcon>
      </RichTextEditor.Toolbar>
    </RichTextEditor>
  );
};

export default TextEditor;
