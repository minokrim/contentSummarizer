import { getcontent,getallcontent,insertcontent } from "../controllers/dbController";
import express from "express"

const router=express.Router();

router.get("/content/data/all",getallcontent)
router.post("/content/data",getcontent)
router.post("/insert/content",insertcontent)

export default router