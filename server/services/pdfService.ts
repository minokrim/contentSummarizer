import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import fs from "fs";
import OpenAI from "openai";
import env from "dotenv";
import AdmZip from "adm-zip";
import * as path from 'path';
import { fileURLToPath } from 'url';

env.config();

const publicKey = process.env.ILOVEPDF_PUBLIC;
const secretKey = process.env.ILOVEPDF_SECRET;

let ilovepdf:ILovePDFApi|undefined

if(publicKey && typeof(publicKey)==="string" && secretKey && typeof(secretKey)==="string"){
 ilovepdf = new ILovePDFApi(publicKey, secretKey);
}
else{
  console.error("missing api keys")
}


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const summarizePdf = async (file: string): Promise<string> => {
  try {
      if (!ilovepdf) {
    return "PDF summarization unavailable: ILovePDF not initialized.";
  }
        const task = ilovepdf.newTask("extract");
        await task.start();

        await task.addFile(file);

        await task.process();

        const tmpPath = path.resolve(__dirname, 'output.zip');;
        const fileBuffer = await task.download();

        fs.writeFileSync(tmpPath, fileBuffer); 

    const zip = new AdmZip(tmpPath);
    const textfileEntries = zip.getEntries().find(e => e.entryName.endsWith('.txt'));

      if (!textfileEntries) {
      throw new Error("No .txt file found in the extracted ZIP.");
    }
    

    const extractedText = textfileEntries.getData().toString("utf8");
    console.log(extractedText)
    fs.unlinkSync(tmpPath); 

    
    try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text.",
          },
          { role: "user", content: `Summarize this: ${extractedText}` },
        ],
      });
      const res = response.choices[0].message.content;
      if (res === null) {
        return "no summary";
      }
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `"Error while summarizing:" ${error.message}`;
      }
      return "summary failed";
    }

  } catch (error: any) {
    console.error("PDF summarization error:", error.message);
    throw new Error("Failed to summarize PDF.");
  }
};
