import { MdOutlineTextFields } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import spinner from "../assets/spinner.svg"

export default function Body(){
    const [content,setContent]=useState<string>()
    const [summarisedContent,setSummarisedContent]=useState<string>("")
    const [inputType,setInputType]=useState("")
    const[loading,setLoading]=useState(false)
    const[style,setStyle]=useState<React.CSSProperties>({})

    function handleTextClick(){
        setLoading(true)
         axios.post(`http://localhost:7000/summarize/${inputType}`,{content:content})
        .then((res)=>{
            console.log(res)
            setSummarisedContent(res.data.summary)
            setLoading(false)
        axios.post("http://localhost:7000/insert/content",{content:content,summary:res.data.summary,type:inputType})
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })

        })
        .catch((err)=>{
            console.log(err)
            setLoading(true)
        })
        if(inputType==="text"){
            setStyle({ border: "1px solid green" });
        }


    }

    return <main className="p-5">
        <div>
            <h2 className="font-semibold text-4xl pl-5 pb-5">Step 1: Select your content type</h2>
        <section className="flex gap-5 items-center pl-5 pb-5">
            <button className={`bg-green-200 p-8 rounded-2xl font-bold transition-all duration-200 ${ inputType === "text" ? "bg-green-400 text-white shadow-lg scale-105" : "bg-green-200" }`}  onClick={()=>setInputType("text")}>
                <MdOutlineTextFields/>
                Text
            </button>
            <button className={`bg-red-200 p-8 rounded-2xl font-bold transition-all duration-200 ${ inputType === "url" ? "bg-red-400 text-white shadow-lg scale-105" : "bg-red-200" }`} onClick={()=>setInputType("url")}>
                <FaLink/>
                URL
            </button>
            <button className={`bg-blue-200 p-8 rounded-2xl font-bold transition-all duration-200 ${ inputType === "file" ? "bg-blue-400 text-white shadow-lg scale-105" : "bg-blue-200" }`} onClick={()=>setInputType("file")}>
                <FaFilePdf/>
                Docs
            </button>
        </section>
        </div>

        <section className="flex justify-between">
            <div className="flex flex-col w-[50%] pl-5">
            <h2 className="font-semibold text-3xl pb-5">Step 2: Paste your Content</h2>

            <div className="flex flex-col w-[100%] pl-10">
            <input type={inputType} onChange={(e)=>{setContent(e.target.value)}} placeholder="Paste your text here..." draggable="false" className="border-solid border-1 border-amber-200 w-full h-[15em] bg-white text-start"></input>

            <div className="flex w-full items-center justify-between">
            <h2 className="font-semibold text-2xl">Step 3: Summarize</h2>
            <button className="bg-black text-white font-bold mt-5 h-[4em] w-[35%] self-end rounded-3xl"  onClick={handleTextClick}>Summarize</button>
            </div>

            </div>

            </div>

            <section className="flex items-center justify-center">
                {loading && (<img src={spinner}/>)}
            </section>

            <div data-placeholder="AI Summary" className="w-[40%] h-[25em] bg-amber-50 shadow-black shadow-sm">
                <h4 className="text-black">{summarisedContent}</h4>
            </div>
        </section>
    </main>
}