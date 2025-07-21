import { getAllContent,getContent,insertContent } from "../services/dbService";
import { Request,Response } from "express";

export const getallcontent=async(req:Request,res:Response):Promise<void>=>{
        const userId=req.query.userId;
        console.log(userId)

    try {
            console.log(userId)

        const result=await getAllContent(userId)
            res.status(200).json(result);
        return 
    } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve content' });
        return 
    }
}

export const getcontent=async(req:Request,res:Response):Promise<void>=>{
    const id=req.body.dataId;
    try {
        const result=await getContent(id)
        res.status(200).json(result);
        console.log(result)
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
    const userId=req.body.userId;
    console.log(userId)

    try {
        const result=await insertContent(content,summary,type,userId)
                res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Failed to insert content' });
        return
    }

}