import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { graph } from "@/graph/graph";
import prisma from "@/lib/prisma";

function generateTitle(prompt: string) {
  return prompt.length > 40 ? prompt.slice(0, 40) + "..." : prompt;
}

export async function POST(req: Request) {
  try {
    const { prompt, conversationId } = await req.json();

    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    let convoId = conversationId;
    let isNewConversation = false;

    if (!convoId) {
      const newConversation = await prisma.conversation.create({
        data: {
          userId,
          title: generateTitle(prompt),
        },
      });

      convoId = newConversation.id;
      isNewConversation = true;
    }

    await prisma.message.create({
      data: {
        content: prompt,
        role: "USER",
        conversationId: convoId,
      },
    });

    const result = await graph.invoke({
      prompt,
      conversationId: convoId,
    });

    await prisma.message.create({
      data: {
        content: result.aiResponse,
        role: "AI",
        conversationId: convoId,
      },
    });

    return NextResponse.json({
      success: true,
      response: result.aiResponse,
      conversationId: convoId,
      isNewConversation,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
      },
      { status: 500 },
    );
  }
}
