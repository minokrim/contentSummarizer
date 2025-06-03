import OpenAI from "openai";

const client = new OpenAI({
});


export  const summarizeText=async(text:string)=>{
    console.log(text)
    try {
    const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
    { role: "system", content: "You are a helpful assistant that summarizes text." },
    { role: "user", content: `Summarize this: ${text}` },
  ],});
console.log(response)
return response.choices[0].message.content;

    } catch (error:any) {
    console.error("Error while summarizing:", error.message || error);
    return error;
    }
}