import { Request, Response } from "express"; 
import { summarizeText } from "../services/textService";

export const summarizetext=async(req:Request,res:Response)=>{
    const text="Over the past decade, advancements in artificial intelligence have significantly transformed how businesses operate. From automating customer service with chatbots to enhancing data analysis with machine learning, AI is now embedded in nearly every industry. Despite its rapid growth, many organizations still face challenges integrating these technologies effectively. Concerns around data privacy, ethical use, and the lack of skilled personnel continue to pose barriers to full adoption. As AI continues to evolve, finding the right balance between innovation and responsibility will be key to sustainable progress.";

    try {
        const result=await summarizeText(text)
        res.status(200).json({ summary: result });

    } catch (error) {
        
    }
}