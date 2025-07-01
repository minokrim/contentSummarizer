import { summarizeUrl } from "../services/urlService";
import { Request,Response } from "express";

export const summarizeurl=async(req:Request,res:Response):Promise<void>=>{
    const url=req.body.content;

    try {
    const result=await summarizeUrl(url)
     res.send(result)
    } catch (error) {
    res.status(500).json({
      success: false,
      message: "Summarization failed",
    });
    }
}