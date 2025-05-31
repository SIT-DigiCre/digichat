"use client";

import Channel from "../Channel/Channel";
import ChannelMemberList from "../ChannelMemberList/ChannelMemberList";

import type {
  Asset,
  ChannelMember,
  MessageLink,
  Message as MessageModel,
  User,
} from "@prisma/client";

import AppShell from "#/app/_components/AppShell";

type ChannelWithMembersProps = {
  channel_id: string;
  user_id: string;
  members: (ChannelMember & { user: User })[];
  messages: (MessageModel & {
    user: User;
    links: MessageLink[];
    assets: Asset[];
  })[];
};

const ChannelWithMembers: React.FC<ChannelWithMembersProps> = ({ 
  channel_id, 
  messages, 
  user_id, 
  members 
}) => {
  return (
    <AppShell aside={<ChannelMemberList members={members} />}>
      <Channel 
        channel_id={channel_id} 
        messages={messages} 
        user_id={user_id} 
      />
    </AppShell>
  );
};

export default ChannelWithMembers;
