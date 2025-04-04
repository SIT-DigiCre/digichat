"use client";

import { useRef } from "react";

import { ActionIcon, FileButton } from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons-react";

type FileUploadControlProps = {
  onUpload: (file: File[]) => void;
  disabled: boolean;
};

/**
 * メッセージ送信欄のファイルアップロードボタン
 * @description アップロード可能なフォーマットは[Discord](https://www.reddit.com/r/discordapp/comments/f2kt5r/guide_file_formats_discord_can_embed/)を参考にした。これに`image/webp`, `image/avif`を追加
 **/
const FileUploadControl = ({ onUpload, disabled }: FileUploadControlProps) => {
  const resetRef = useRef<() => void>(null);

  const handleClick = (payload: File[]) => {
    onUpload(payload);
    resetRef.current?.();
  };

  return (
    <FileButton
      onChange={handleClick}
      accept="image/jpeg,image/png,image/gif,video/webm,video/mp4,audio/wav,audio/mp3,audio/ogg,image/webp,image/avif"
      multiple
      disabled={disabled}
    >
      {(props) => (
        <ActionIcon variant="light" color="gray" {...props}>
          <IconCloudUpload stroke={1.5} />
        </ActionIcon>
      )}
    </FileButton>
  );
};

export default FileUploadControl;
