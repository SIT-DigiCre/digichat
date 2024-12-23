import { EmojiData } from "#/types/emoji";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover } from "@mantine/core";
import {
  RichTextEditorControl,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { IconMoodSmile } from "@tabler/icons-react";

import styles from "./EmojiPicker.module.css";

const EmojiPickerControl = () => {
  const { editor } = useRichTextEditorContext();

  return (
    <Popover width={200} position="bottom">
      <Popover.Target>
        <RichTextEditorControl title="Insert emoji" aria-label="Insert emoji">
          <IconMoodSmile stroke={1.5} size="1rem" />
        </RichTextEditorControl>
      </Popover.Target>
      <Popover.Dropdown className={styles.PopoverDropdown}>
        <Picker
          data={data}
          onEmojiSelect={(emoji: EmojiData) => {
            editor?.chain().focus().insertContent(emoji.native).run();
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export default EmojiPickerControl;
