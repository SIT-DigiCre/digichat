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
import {
  IconChevronRight,
  IconLoader,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import type { Channel as ChannelModel } from "@prisma/client";

import { searchChannels } from "#/libs/actions";

type ViewChannelsModalProps = {
  channels: ChannelModel[];
};

const ViewChannelsModal: React.FC<ViewChannelsModalProps> = ({ channels }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [searchedChannels, setSearchedChannels] =
    useState<ChannelModel[]>(channels);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
    startTransition(async () => {
      const updatedChannels = await searchChannels({
        keyword: event.currentTarget.value,
      });
      setSearchedChannels(updatedChannels);
      console.log(channels);
    });
  };

  return (
    <Modal opened={true} onClose={() => router.back()} title="チャンネル一覧">
      <TextInput
        placeholder="チャンネル名で検索"
        leftSection={<IconSearch stroke={1.5} size={20} />}
        value={keyword}
        onChange={handleChange}
        rightSection={
          keyword !== "" && (
            <ActionIcon
              onClick={() => setKeyword("")}
              variant="subtle"
              color="gray"
            >
              <IconX stroke={1.5} />
            </ActionIcon>
          )
        }
      />
      <Flex align="center" justify="space-between" my="sm">
        <Box>{searchedChannels.length}件の結果</Box>
        <Box>
          {!isPending && (
            <Flex c="gray" gap="xs" align="center" justify="center" fz="xs">
              <IconLoader stroke={1.5} size={16} className="spin" />
              読み込み中
            </Flex>
          )}
        </Box>
      </Flex>
      {searchedChannels.map((channel) => (
        <NavLink
          href={`channels/${channel.id}`}
          key={channel.id}
          label={channel.slug}
          description={channel.name}
          rightSection={
            <IconChevronRight stroke={1.5} className="mantine-rotate-rtl" />
          }
        />
      ))}
    </Modal>
  );
};

export default ViewChannelsModal;
