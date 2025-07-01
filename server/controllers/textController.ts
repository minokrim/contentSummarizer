import { Request, Response } from "express"; 
import { summarizeText } from "../services/textService";

export const summarizetext=async(req:Request,res:Response)=>{
    const text=req.body.content;

    try {
        const result=await summarizeText(text)
        res.status(200).json({ summary: result });

    } catch (error) {
        res.status(500).send("summarisation failed");
    }
}