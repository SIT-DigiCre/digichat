"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

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

import type { Channel } from "@prisma/client";

import { searchChannels } from "#/libs/actions";

type ViewChannelsModalProps = {
  opened: boolean;
  onClose: () => void;
};

const ViewChannelsModal: React.FC<ViewChannelsModalProps> = ({
  opened,
  onClose,
}) => {
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (opened) {
      startTransition(async () => {
        const channels = await searchChannels();
        setChannels(channels);
      });
    }
  }, [opened]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
    startTransition(async () => {
      const updatedChannels = await searchChannels({
        keyword: event.currentTarget.value,
      });
      setChannels(updatedChannels);
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="チャンネル一覧">
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
        <Box>{channels.length}件の結果</Box>
        <Box>
          {isPending && (
            <Flex c="gray" gap="xs" align="center" justify="center" fz="xs">
              <IconLoader stroke={1.5} size={16} className="spin" />
              読み込み中
            </Flex>
          )}
        </Box>
      </Flex>
      {channels.map((channel) => (
        <NavLink
          component={Link}
          href={`/channels/${channel.id}`}
          key={channel.id}
          label={channel.slug}
          description={channel.name}
          rightSection={
            <IconChevronRight stroke={1.5} className="mantine-rotate-rtl" />
          }
          onClick={onClose}
        />
      ))}
    </Modal>
  );
};

export default ViewChannelsModal;
