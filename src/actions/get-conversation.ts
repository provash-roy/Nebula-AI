import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getConversation = async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  return await prisma.conversation.findMany({
    where: {
      userId,
    },
    include: {
      messages: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getConversationById = async (conversationId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return await prisma.conversation.findUnique({
    where: {
      id: conversationId,
      userId, 
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
};