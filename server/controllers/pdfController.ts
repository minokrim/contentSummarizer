import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
import { summarizePdf } from "../services/pdfService.js";
import { Request, Response } from "express"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const summarizepdf=async(req:Request,res:Response):Promise<void>=>{

    if(!req.file || !req.file.path){
        res.status(400).send("No file uploaded.");
        return
    }
const filePath = path.resolve(req.file.path).replace(/\\/g, "/");
console.log(filePath)

    try{
        const summary=await summarizePdf(filePath)
        res.setHeader('Content-Type', 'application/json');
        res.send({summary});
        fs.unlinkSync(filePath);
    }
    catch(err){
        res.status(500).send("summarisation failed");
    }
}