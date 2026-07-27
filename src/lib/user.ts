import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function createUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("User not found");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const freePlan = await prisma.plan.findUnique({
    where: {
      name: "FREE",
    },
  });

  if (!freePlan) {
    throw new Error("Free plan not found");
  }

  const user = await prisma.user.create({
    data: {
      userId,

      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),

      email: clerkUser.emailAddresses[0].emailAddress,

      planId: freePlan.id,

      credits: freePlan.credits,

      totalCredits: freePlan.credits,
    },
  });

  return user;
}
