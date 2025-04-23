import { Account, Channel, ChannelMember, User } from "@prisma/client";

export type UserWithAccounts = User & {
  accounts: Account[];
};

export type EditableUserParams = Pick<
  User,
  "image" | "name" | "slug" | "description"
>;

export type ChannelMemberWithChannel = ChannelMember & {
  channel: Channel;
};
