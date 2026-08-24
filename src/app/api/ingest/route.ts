  import { NextRequest, NextResponse } from "next/server";
  import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
  import { Document } from "@langchain/core/documents";
  import { getVectorStore } from "@/lib/ai/qdrant";
  import fs, { readFile } from "fs/promises";
  import path from "path";
  import os from "os";
  import { PDFParse } from "pdf-parse";

  export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    let tempFilePath = "";

    try {
      const buffer = Buffer.from(await file.arrayBuffer());

      tempFilePath = path.join(os.tmpdir(), file.name);

      await fs.writeFile(tempFilePath, buffer);
      const buffer1 = await readFile(tempFilePath);

      const parser = new PDFParse({ data: buffer1 });

      const result = await parser.getText();
      console.log("PDF text extracted:", result.text);

      const docs = [
        new Document({
          pageContent: result.text,
          metadata: {
            fileName: file.name,
          },
        }),
      ];

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 50,
      });

      const chunks = await splitter.splitDocuments(docs);

      const vectorStore = await getVectorStore();
      await vectorStore.addDocuments(chunks);

      return NextResponse.json({
        success: true,
        chunks: chunks.length,
      });
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        { error: "PDF processing failed" },
        { status: 500 },
      );
    }
  }
