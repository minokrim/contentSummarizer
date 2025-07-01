import  express from "express";
import { summarizetext } from "../controllers/textController";
import { limiter } from '../config/rateLimiter';

const router=express.Router();

router.post("/summarize/text",limiter,summarizetext)

export default router;


