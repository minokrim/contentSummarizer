import * as cheerio from 'cheerio';
import axios from 'axios';
import OpenAI from "openai";
import env from "dotenv";
env.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeUrl=async(url:string)=>{
    try {
        const res=await axios.get(url,{
            headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
    'Accept': 'text/html',
  }
        })

       if (!res.data) {
      console.log('No content received');
      return;
    }
        const $ = cheerio.load(res.data);
        const fullBodyText = $('body').text().trim().replace(/\s+/g, ' ');
        const maxChars = 6000; 
        const trimmedText = fullBodyText.slice(0, maxChars);
        console.log(fullBodyText)
        try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text.",
          },
          { role: "user", content: `Summarize this: ${trimmedText}` },
        ],
      });
      const summary = response.choices[0].message.content;
      console.log(response)
      console.log("SUMMARY TO INSERT:", summary);
      if (summary === null) {
        return "no summary";
      }
      return summary;
        } catch (error:unknown) {
                if (error instanceof Error) {
        return `"Error while summarizing:" ${error.message}`;
      }
      return "summary failed";
        }
  }
        catch (error) {
    console.error('Error fetching or parsing URL:', error);
    return {
      success: false,
      error: 'Failed to summarize URL',
    };
    }
}