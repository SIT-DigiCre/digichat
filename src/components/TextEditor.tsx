"use client";

import { RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import "@mantine/tiptap/styles.css";
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
    <MantineRichTextEditor editor={editor}>
      <MantineRichTextEditor.Content className={styles.Content} />
      <MantineRichTextEditor.Toolbar className={styles.Toolbar}>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
        </MantineRichTextEditor.ControlsGroup>
      </MantineRichTextEditor.Toolbar>
    </MantineRichTextEditor>
  );
};

export default TextEditor;
