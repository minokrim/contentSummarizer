import  express from "express";
import { summarizetext } from "../controllers/textController";

const router=express.Router();

router.get("/summarize/text",summarizetext)

export default router;


