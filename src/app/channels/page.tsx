import Link from "next/link";

import { Anchor, List, ListItem } from "@mantine/core";

import AppShell from "#/components/AppShell";
import { prisma } from "#/libs/prisma";

async function ChannelsPage() {
  const channels = await prisma.channel.findMany();

  return (
    <AppShell>
      <List type="unordered">
        {channels.map((channel) => (
          <ListItem key={channel.id}>
            <Anchor component={Link} href={`/channels/${channel.id}`}>
              {channel.name}
            </Anchor>
          </ListItem>
        ))}
      </List>
    </AppShell>
  );
}

export default ChannelsPage;
