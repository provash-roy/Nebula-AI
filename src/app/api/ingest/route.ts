import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  console.log("file", file);

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  return NextResponse.json({ message: "File received" });
}
