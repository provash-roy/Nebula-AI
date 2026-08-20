import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  console.log("file", file);

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const tempDir = path.join(process.cwd(), "temp");

  await fs.mkdir(tempDir, { recursive: true });

  const filePath = path.join(tempDir, `${Date.now()}-${file.name}`);

  await fs.writeFile(filePath, buffer);


// const data = await fs.readFile(filePath);
// const result = await pdf(data);

  const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 5,
    });

    const chunks = await splitter.splitDocuments(docs);



  return NextResponse.json({ message: "File received" });
}



    

  

    

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    await QdrantVectorStore.fromDocuments(chunks, embeddings, {
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY!,
      collectionName: "medibot-ai",
    });

    return NextResponse.json({
      success: true,
      pages: docs.length,
      chunks: chunks.length,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }

