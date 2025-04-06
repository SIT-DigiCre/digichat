import Link from "next/link";

import { Anchor, List, ListItem } from "@mantine/core";

import { prisma } from "#/libs/prisma";

async function ChannelsPage() {
  const channels = await prisma.channel.findMany();

  return (
    <List type="unordered">
      {channels.map((channel) => (
        <ListItem key={channel.id}>
          <Anchor component={Link} href={`/channels/${channel.id}`}>
            {channel.slug}
          </Anchor>
        </ListItem>
      ))}
    </List>
  );
}

export default ChannelsPage;
