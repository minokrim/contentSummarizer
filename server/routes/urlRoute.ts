import express from 'express';
import { summarizeurl } from '../controllers/urlController';
import { limiter } from '../config/rateLimiter';

let router=express.Router();

router.post("/summarize/url",summarizeurl,limiter)

export default router;
