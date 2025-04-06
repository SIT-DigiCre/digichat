import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ワークスペース作成
  const workspace = await prisma.workspace.create({
    data: {
      name: "Digichat for Insider",
      description: "テスト用のワークスペースです",
    },
  });

  // ロール作成
  const adminRole = await prisma.userRole.create({
    data: {
      name: "admin",
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    },
  });
  const moderatorRole = await prisma.userRole.create({
    data: {
      name: "moderator",
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: false,
      },
    },
  });
  const memberRole = await prisma.userRole.create({
    data: {
      name: "member",
      permissions: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
    },
  });

  // ユーザー作成
  const adminUser = await prisma.user.create({
    data: {
      name: "テスト管理者",
      slug: "admin",
      email: "admin@example.com",
      image: "https://with.koeni.dev/identicon/admin",
      status: "ONLINE",
      roleId: adminRole.id,
    },
  });

  const modUser = await prisma.user.create({
    data: {
      name: "モデレーター太郎",
      slug: "mod-taro",
      email: "taro@example.com",
      image: "https://with.koeni.dev/identicon/mod-taro",
      status: "AWAY",
      roleId: moderatorRole.id,
    },
  });

  const memberUser = await prisma.user.create({
    data: {
      name: "一般ユーザー花子",
      slug: "member-hanako",
      email: "hanako@example.com",
      image: "https://with.koeni.dev/identicon/hanako",
      status: "OFFLINE",
      roleId: memberRole.id,
    },
  });

  const anotherMemberUser = await prisma.user.create({
    data: {
      name: "一般ユーザー次郎",
      slug: "member-jiro",
      email: "jiro@example.com",
      image: "https://with.koeni.dev/identicon/jiro",
      status: "BUSY",
      roleId: memberRole.id,
    },
  });

  // チャンネル作成
  const generalChannel = await prisma.channel.create({
    data: {
      slug: "general",
      name: "general",
      workspaceId: workspace.id,
      type: "PUBLIC",
      creatorId: adminUser.id,
      description: "全体向けの一般チャンネル",
    },
  });

  const randomChannel = await prisma.channel.create({
    data: {
      slug: "random",
      name: "random",
      workspaceId: workspace.id,
      type: "PUBLIC",
      creatorId: modUser.id,
      description: "雑談用チャンネル",
    },
  });

  const privateChannel = await prisma.channel.create({
    data: {
      slug: "private",
      name: "private",
      workspaceId: workspace.id,
      type: "PRIVATE",
      creatorId: adminUser.id,
      description: "管理者専用チャンネル",
    },
  });

  // ----- general チャンネルのメッセージ -----
  await prisma.message.create({
    data: {
      content: "Hello, World!",
      channelId: generalChannel.id,
      userId: adminUser.id,
      type: "NORMAL",
    },
  });

  await prisma.message.create({
    data: {
      content:
        "This is a *markdown* message with **bold text** and [a link](https://example.com).",
      channelId: generalChannel.id,
      userId: modUser.id,
      type: "IMPORTANT",
    },
  });

  await prisma.message.create({
    data: {
      content:
        "Here is some TeX: \\(E = mc^2\\) which explains the famous equation.",
      channelId: generalChannel.id,
      userId: memberUser.id,
      type: "NORMAL",
    },
  });

  await prisma.message.create({
    data: {
      content:
        "<p>This is a rich text message with <strong>HTML content</strong> and an image: <img src='https://example.com/image.png' alt='sample'></p>",
      channelId: generalChannel.id,
      userId: anotherMemberUser.id,
      type: "PROJECT",
    },
  });

  // URL を含むメッセージを作成し、MessageLink テーブルにもレコードを追加
  const msgWithURL = await prisma.message.create({
    data: {
      content: "Check out our new website: https://digicre.net/",
      channelId: generalChannel.id,
      userId: adminUser.id,
      type: "NORMAL",
    },
  });

  await prisma.messageLink.create({
    data: {
      messageId: msgWithURL.id,
      url: "https://digicre.net/",
      title: "芝浦工業大学 デジクリ",
      description: "芝浦工業大学の公認サークル『デジクリ』の Web サイトです。",
      ogImageUrl: "https://digicre.net/ogp.png",
    },
  });

  // 様々なパターンが入ったメッセージ
  const filePath = path.join(__dirname, "GFM.txt");
  const content = fs.readFileSync(filePath, "utf8");
  await prisma.message.create({
    data: {
      content: content,
      channelId: generalChannel.id,
      userId: memberUser.id,
      type: "NORMAL",
    },
  });

  // ----- random チャンネルのメッセージ -----
  await prisma.message.create({
    data: {
      content: "Random talk: Did you see the latest news?",
      channelId: randomChannel.id,
      userId: modUser.id,
      type: "NORMAL",
    },
  });

  await prisma.message.create({
    data: {
      content: "Another random message with **markdown** and _italic_ style.",
      channelId: randomChannel.id,
      userId: memberUser.id,
      type: "IMPORTANT",
    },
  });

  // メンションを含むメッセージ作成（内容中は @ユーザーID と記載）し、Mention テーブルへレコードを追加
  const mentionMsg = await prisma.message.create({
    data: {
      content: `Hello @${adminUser.id}, please review the latest update.`,
      channelId: randomChannel.id,
      userId: modUser.id,
      type: "NORMAL",
    },
  });

  await prisma.mention.create({
    data: {
      messageId: mentionMsg.id,
      mentionedUserId: adminUser.id,
    },
  });

  // ----- private チャンネルのメッセージ -----
  await prisma.message.create({
    data: {
      content: "管理者専用のシークレットなメッセージです。",
      channelId: privateChannel.id,
      userId: adminUser.id,
      type: "NORMAL",
    },
  });

  await prisma.message.create({
    data: {
      content:
        "Another private message with TeX: \\(\\int_0^1 x^2 dx = \\frac{1}{3}\\)",
      channelId: privateChannel.id,
      userId: modUser.id,
      type: "NORMAL",
    },
  });

  // ----- 各チャンネルでメッセージを投稿しているユーザーを ChannelMember テーブルに登録 -----
  // general チャンネル
  await prisma.channelMember.createMany({
    data: [
      { channelId: generalChannel.id, userId: adminUser.id, role: "ADMIN" },
      { channelId: generalChannel.id, userId: modUser.id, role: "MEMBER" },
      { channelId: generalChannel.id, userId: memberUser.id, role: "MEMBER" },
      {
        channelId: generalChannel.id,
        userId: anotherMemberUser.id,
        role: "MEMBER",
      },
    ],
  });

  // random チャンネル
  await prisma.channelMember.createMany({
    data: [
      { channelId: randomChannel.id, userId: modUser.id, role: "MEMBER" },
      { channelId: randomChannel.id, userId: memberUser.id, role: "MEMBER" },
    ],
  });

  // private チャンネル
  await prisma.channelMember.createMany({
    data: [
      { channelId: privateChannel.id, userId: adminUser.id, role: "ADMIN" },
      { channelId: privateChannel.id, userId: modUser.id, role: "MEMBER" },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
