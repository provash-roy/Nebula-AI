import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { graph } from "@/graph/graph";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt, conversationId } = body;

    
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    if (!prompt || !conversationId) {
      return NextResponse.json(
        {
          message: "Prompt and conversationId required",
        },
        {
          status: 400,
        },
      );
    }

   

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: userId,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        {
          message: "Conversation not found",
        },
        {
          status: 404,
        },
      );
    }



    await prisma.message.create({
      data: {
        content: prompt,

        role: "USER",

        conversationId,
      },
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          const result = await graph.stream(
            {
              prompt,

              conversationId,
            },

            {
              streamMode: "messages",
            },
          );

          for await (const [messageChunk, metadata] of result) {
            const text =
              typeof messageChunk.content === "string"
                ? messageChunk.content
                : "";

            if (text) {
             
              fullResponse += text;


              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: "token",
                    content: text,
                  })}\n\n`,
                ),
              );
            }
          }

       

          if (fullResponse) {
            await prisma.message.create({
              data: {
                content: fullResponse,

                role: "AI",

                conversationId,
              },
            });
          }

          controller.enqueue(
            encoder.encode(
              `data:${JSON.stringify({
                type: "done",
              })}\n\n`,
            ),
          );

          controller.close();
        } catch (error) {
          console.error("Graph stream error:", error);

          controller.enqueue(
            encoder.encode(
              `data:${JSON.stringify({
                type: "error",

                message: "Something went wrong",
              })}\n\n`,
            ),
          );

          controller.close();
        }
      },
    });

    return new Response(
      stream,

      {
        headers: {
          "Content-Type": "text/event-stream",

          "Cache-Control": "no-cache, no-transform",

          Connection: "keep-alive",
        },
      },
    );
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },

      {
        status: 500,
      },
    );
  }
}
