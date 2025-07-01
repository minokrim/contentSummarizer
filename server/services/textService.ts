import OpenAI from "openai";
import env from "dotenv"

env.config()
const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
});


export  const summarizeText=async(text:string):Promise<string>=>{
    console.log(text)
    try {
    const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
    { role: "system", content: "You are a helpful assistant that summarizes text." },
    { role: "user", content: `Summarize this: ${text}` },
  ],});
console.log(response)
const res= response.choices[0].message.content;
if(res===null){
    return 'no summary'
}
return res

    } catch (error:unknown) {
        if(error instanceof Error){
            return `"Error while summarizing:" ${error.message}`;
        }
    return "summary failed";
    }
}