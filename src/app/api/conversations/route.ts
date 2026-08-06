import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function generateTitle(prompt: string) {
  return prompt.length > 40
    ? toTitleCase(prompt.slice(0, 40)) + "..."
    : toTitleCase(prompt);
}

export async function POST(request: Request) {
  const { prompt } = await request.json();

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
        title: generateTitle(prompt),
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
