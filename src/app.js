import * as dotenv from "dotenv";
dotenv.config(); // Load .env variables

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai"; // ✅ Fix here
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";

async function main() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY! Check your .env file.");
    }
    console.log("✅ API Key Loaded Successfully");

    const loader = new CSVLoader("./documents/constituents-financials_csv.csv");
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });
    const splittedDocs = await splitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY // ✅ Explicitly pass API key
    });

    const vectorstores = await HNSWLib.fromDocuments(splittedDocs, embeddings);

    const model = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0
    });

    const vectorstoresRetrieval = vectorstores.asRetriever();
    const chain = RetrievalQAChain.fromLLM(model, vectorstoresRetrieval);

    const question = "What was the EBITDA for Advanced Auto Parts?";
    const answer = await chain.call({ query:question });

    const question2 = "What is the divident yield for the EBITDA for Advanced Auto Parts?";
    const answer2 = await chain.call({ query: question2 });

    console.log("✅ Answer:", answer);
    console.log("--");
    
    console.log("✅ Answer:", answer2);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main();
