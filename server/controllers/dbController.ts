import { getAllContent,getContent,insertContent } from "../services/dbService";
import { Express,Request,Response } from "express";

export const getallcontent=async(req:Request,res:Response):Promise<void>=>{
    try {
        const result=await getAllContent()
        console.log(result)
            res.status(200).json(result);
        return 
    } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve content' });
        return 
    }
}

export const getcontent=async(req:Request,res:Response):Promise<void>=>{
    const id=req.body.id;
    try {
        const result=await getContent(id)
        res.status(200).json(result);
        return 
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve content' });
        return 
    }
}

export const insertcontent=async(req:Request,res:Response)=>{
    const content=req.body.content
    const summary=req.body.summary
    const type=req.body.type;

    try {
        const result=await insertContent(content,summary,type)
                res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Failed to insert content' });
        return
    }

}