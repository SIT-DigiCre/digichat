import { useState } from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Drawer, Popover } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  RichTextEditorControl,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { IconMoodSmile } from "@tabler/icons-react";

import styles from "./EmojiPicker.module.css";

import { EmojiData } from "#/types/emoji";

const EmojiPickerControl = () => {
  const { editor } = useRichTextEditorContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleEmojiSelect = (emoji: EmojiData) => {
    editor?.chain().focus().insertContent(emoji.native).run();
    if (isDesktop) {
      setDrawerOpened(false);
    }
  };

  if (isDesktop) {
    return (
      <Popover position="bottom">
        <Popover.Target>
          <RichTextEditorControl
            title="絵文字を入力する"
            aria-label="絵文字を入力する"
          >
            <IconMoodSmile stroke={1.5} size="1rem" />
          </RichTextEditorControl>
        </Popover.Target>
        <Popover.Dropdown className={styles.PopoverDropdown}>
          <Picker theme="light" data={data} onEmojiSelect={handleEmojiSelect} />
        </Popover.Dropdown>
      </Popover>
    );
  } else {
    return (
      <>
        <RichTextEditorControl
          title="Insert emoji"
          aria-label="Insert emoji"
          onClick={() => setDrawerOpened(true)}
        >
          <IconMoodSmile stroke={1.5} size="1rem" />
        </RichTextEditorControl>
        <Drawer
          classNames={{
            content: styles.DrawerContent,
            body: styles.DrawerBody,
          }}
          withCloseButton={false}
          position="bottom"
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
        >
          <Picker
            style={{
              width: "100%",
            }}
            dynamicWidth
            theme="light"
            data={data}
            onEmojiSelect={handleEmojiSelect}
          />
        </Drawer>
      </>
    );
  }
};

export default EmojiPickerControl;
