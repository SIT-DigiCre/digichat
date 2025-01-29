"use client";

import { Modal } from "@mantine/core";

type ViewChannelsModalProps = {
  opened: boolean;
  close: () => void;
};

const ViewChannelsModal: React.FC<ViewChannelsModalProps> = ({
  opened,
  close,
}) => {
  return <Modal opened={opened} onClose={close} title="チャンネル一覧"></Modal>;
};

export default ViewChannelsModal;
