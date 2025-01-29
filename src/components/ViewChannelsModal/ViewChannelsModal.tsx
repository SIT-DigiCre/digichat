"use client";

import { useRouter } from "next/navigation";

import { Modal } from "@mantine/core";

const ViewChannelsModal: React.FC = () => {
  const router = useRouter();
  return (
    <Modal
      opened={true}
      onClose={() => router.back()}
      title="チャンネル一覧"
    ></Modal>
  );
};

export default ViewChannelsModal;
