import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        title: "New Conversation",
      },
    });

    return NextResponse.json({
      id: conversation.id,
    });
  } catch (error) {
    console.error("Create Conversation Error:", error);

    return NextResponse.json(
      {
        message: "Failed to create conversation",
      },
      {
        status: 500,
      },
    );
  }
}
