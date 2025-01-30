"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  ActionIcon,
  Box,
  Flex,
  Modal,
  NavLink,
  TextInput,
} from "@mantine/core";
import { IconLoader2, IconSearch, IconX } from "@tabler/icons-react";

import type { Channel as ChannelModel } from "@prisma/client";

import { searchChannels } from "#/libs/actions";

type ViewChannelsModalProps = {
  channels: ChannelModel[];
};

const ViewChannelsModal: React.FC<ViewChannelsModalProps> = ({ channels }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
    startTransition(async () => {
      const channels = await searchChannels({
        keyword: event.currentTarget.value,
      });
      console.log(channels);
    });
  };

  return (
    <Modal opened={true} onClose={() => router.back()} title="チャンネル一覧">
      <TextInput
        placeholder="チャンネル名で検索"
        leftSection={<IconSearch />}
        value={keyword}
        onChange={handleChange}
        rightSection={
          keyword !== "" && (
            <ActionIcon
              onClick={() => setKeyword("")}
              variant="subtle"
              color="gray"
            >
              <IconX />
            </ActionIcon>
          )
        }
      />
      <Flex align="center" justify="space-between" my="sm">
        <Box>{channels.length}件の結果</Box>
        <Box>{isPending && <IconLoader2 />}</Box>
      </Flex>
      {channels.map((channel) => (
        <NavLink href={`channels/${channel.id}`} key={channel.id}>
          {channel.name}
        </NavLink>
      ))}
    </Modal>
  );
};

export default ViewChannelsModal;
