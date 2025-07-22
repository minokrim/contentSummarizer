import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import fs from "fs";
import OpenAI from "openai";
import env from "dotenv";
import AdmZip from "adm-zip";
import * as path from 'path';
import { fileURLToPath } from 'url';
// import { text } from 'body-parser';

env.config();

const publicKey = process.env.ILOVEPDF_PUBLIC;
const secretKey = process.env.ILOVEPDF_SECRET;

let ilovepdf:ILovePDFApi|undefined

if(publicKey && typeof(publicKey)==="string" && secretKey && typeof(secretKey)==="string"){
 ilovepdf = new ILovePDFApi(publicKey, secretKey);
 console.log("api connected succesfully")
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

      const fullPath = path.join(file);
      const fullfile = new ILovePDFFile(fullPath)
       await task.addFile(fullfile);

        await task.process();

        const fileBuffer = await task.download();

        let textfileEntries = fileBuffer.toString(); 

    if (textfileEntries.length > 12000) {
      textfileEntries = textfileEntries.slice(0, 12000); 
      }    
    try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text.",
          },
          { role: "user", content: `Summarize this: ${textfileEntries}` },
        ],
      });
      
      let res
      if(response.choices[0].finish_reason === "content_filter"){
         res="Sorry, the content cannot be summarized due to content policy restrictions.";
      }else{
       res = response.choices[0].message.content;
      }
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
    console.error("PDF summarization error:", error);
    throw new Error("Failed to summarize PDF.");
  }
};
