import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { conversationId } = await params;

  const { title } = await request.json();

  const conversation = await prisma.conversation.update({
    where: {
      id: conversationId,
      userId,
    },
    data: {
      title,
    },
  });

  return NextResponse.json(conversation);
}
