import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getCurrentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    include: {
      plan: true,
      subscriptions: true,
      payments: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};
