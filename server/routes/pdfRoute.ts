import  {summarizepdf}  from "../controllers/pdfController.js";
import upload from "../middleware/multer.js";
import  express  from "express";
import { limiter } from '../config/rateLimiter';


const router=express.Router();

router.post("/summarize/file",limiter,upload.single("file"),summarizepdf)

export default router
