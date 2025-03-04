import { ActionIcon, FileButton } from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons-react";

/**
 * @description アップロード可能なフォーマットは[Discord](https://www.reddit.com/r/discordapp/comments/f2kt5r/guide_file_formats_discord_can_embed/)を参考にした。これに`image/webp`, `image/avif`を追加
 **/
const FileUploadControl = () => {
  const setFile = (payload: File[]) => {
    console.log(payload);
  };

  return (
    <FileButton
      onChange={setFile}
      accept="image/jpeg,image/png,image/gif,video/webm,video/mp4,audio/wav,audio/mp3,audio/ogg,image/webp,image/avif"
      multiple
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
