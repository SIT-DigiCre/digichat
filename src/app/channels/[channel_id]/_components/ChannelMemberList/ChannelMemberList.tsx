"use client";

import { Avatar, Stack, Text, Group } from "@mantine/core";

import type { ChannelMember, User } from "@prisma/client";

type ChannelMemberListProps = {
  members: (ChannelMember & { user: User })[];
};

const ChannelMemberList: React.FC<ChannelMemberListProps> = ({ members }) => {
  return (
    <Stack gap="sm" p="md">
      <Text size="sm" fw={500}>メンバー ({members.length})</Text>
      {members.map((member) => (
        <Group key={member.id} gap="sm">
          <Avatar src={member.user.image} alt={member.user.name} size="sm" radius="xl" />
          <Text size="sm">{member.user.name}</Text>
        </Group>
      ))}
    </Stack>
  );
};

export default ChannelMemberList;
