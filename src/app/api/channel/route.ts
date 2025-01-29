import { NextResponse } from "next/server";

import { prisma } from "#/libs/prisma";

export async function GET(request: Request) {
  const channels = await prisma.channel.findMany({
    where: {
      type: "PUBLIC",
    },
  });

  return NextResponse.json({
    status: "success",
    channels: channels,
  });
}
