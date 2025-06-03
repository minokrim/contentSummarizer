import express,{Request,Response} from "express"
import textRoutes from "../server/routes/textRoute"
const app=express();

app.get("/",(req,res)=>{
    res.json("hello")
})

app.use("/",textRoutes)

app.listen(7000,()=>{
      console.log("Server running on port 7000");
})