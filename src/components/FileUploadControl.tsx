import { ActionIcon, FileButton } from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons-react";

const FileUploadControl = () => {
  const setFile = (payload: File[]) => {
    console.log(payload);
  };
  return (
    <FileButton onChange={setFile} accept="image/png,image/jpeg" multiple>
      {(props) => (
        <ActionIcon variant="light" color="gray" {...props}>
          <IconCloudUpload stroke={1.5} />
        </ActionIcon>
      )}
    </FileButton>
  );
};

export default FileUploadControl;
