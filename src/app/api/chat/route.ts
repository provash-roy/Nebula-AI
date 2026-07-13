import { graph } from "@/graph/graph";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, conversationId } = await req.json();

    const result = await graph.invoke({
      prompt,
      conversationId,
    });

    return NextResponse.json(
      {
        success: true,
        response: result.aiResponse,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
      },
      {
        status: 500,
      },
    );
  }
}
