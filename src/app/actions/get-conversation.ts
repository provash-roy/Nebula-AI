import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getConversation = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
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

export const getConversationById = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.conversation.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      messages: true,
    },
  });
};
