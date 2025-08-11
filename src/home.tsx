import Body from "./body/body";
import Nav from "./nav/nav";
import History from "./history/histtory";
import Footer from "./footer/footer";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home(){
        interface contentData{
        id:number,
        content:string,
        summary:string,
        type:string,
        created_at:string
    }
        const [data,setData]=useState<contentData|null>(null)
        const [dataId,setDataId]=useState<number|null>(null)
        const [refresh, setRefresh] = useState<boolean>(false);


        useEffect(()=>{
            if(dataId!==null){
                axios.post("https://contentsummarizer-ybo5.onrender.com/db/content/data",{dataId:dataId})
                .then((res)=>{
                    setData(res.data.data[0])
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        },[dataId])
    return <main className="bg-white w-full flex flex-col">
        <Nav/>
        <Body selectedData={data} onRefresh={() => setRefresh((prev) => !prev)}/>
        <History onSelectId={setDataId} refreshTrigger={refresh}/>
        <Footer/>
    </main>
}