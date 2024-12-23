import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  RichTextEditorControl,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { IconMoodSmile } from "@tabler/icons-react";
import { useState } from "react";

const EmojiPickerControl = () => {
  const { editor } = useRichTextEditorContext();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <>
      <RichTextEditorControl
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        title="Insert emoji"
        aria-label="Insert emoji"
      >
        <IconMoodSmile stroke={1.5} size="1rem" />
      </RichTextEditorControl>
      {showEmojiPicker && (
        <Picker
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            zIndex: 1000,
          }}
          data={data}
          onEmojiSelect={(emoji) => {
            editor?.chain().focus().insertContent(emoji.native).run();
          }}
        />
      )}
    </>
  );
};

export default EmojiPickerControl;
