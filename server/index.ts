import textRoutes from "../server/routes/textRoute.js"
import pdfRoutes from "../server/routes/pdfRoute.js"
import urlRoutes from "../server/routes/urlRoute.js"
import dbRoutes from "../server/routes/dbroute.js"
import express from "express"
import cors from "cors"

const app=express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:7000',  
    credentials: true   ,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']             
  }));

app.get("/",(req,res)=>{
    res.json("hello")
})

app.use("/",textRoutes)
app.use("/",pdfRoutes)
app.use("/",urlRoutes)
app.use("/",dbRoutes)



app.listen(7000,()=>{
      console.log("Server running on port 7000");
})


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});