import textRoutes from "../server/routes/textRoute.js"
import pdfRoutes from "../server/routes/pdfRoute.js"
import urlRoutes from "../server/routes/urlRoute.js"
import dbRoutes from "../server/routes/dbroute.js"
import express from "express"
import cors from "cors"
import env from "dotenv";

const app=express();
app.use(express.json());

const allowedOrigins=['http://localhost:5173',"https://contentsummarizer-ybo5.onrender.com"]
app.use(cors({
    origin: function(origin,callback){
            if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },  
    credentials: true   ,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']             
  }));

let PORT=process.env.SERVER_PORT;

console.log("PORT", PORT)
  app.use("/text", textRoutes);
  app.use("/url", urlRoutes);
  app.use("/pdf", pdfRoutes);
  app.use("/db", dbRoutes);



app.listen(PORT,()=>{
      console.log(`Server running on port ${PORT}`);
})


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});