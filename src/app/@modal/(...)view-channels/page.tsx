import ViewChannelsModal from "#/components/ViewChannelsModal/ViewChannelsModal";
import { prisma } from "#/libs/prisma";

async function ViewChannelsModalRoute() {
  const channels = await prisma.channel.findMany();

  return <ViewChannelsModal channels={channels.map((channel) => channel.id)} />;
}

export default ViewChannelsModalRoute;
