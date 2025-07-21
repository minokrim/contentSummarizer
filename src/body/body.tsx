import { MdOutlineTextFields } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import axios from "axios";
import { useState,useEffect } from "react";
import spinner from "../assets/spinner.svg"
import { v4 as uuidv4 } from 'uuid';


interface contentData{
        id:number,
        content:string,
        summary:string,
        type:string,
        created_at:string
}

export default function Body({selectedData}:{selectedData:contentData|null}){
    const [content,setContent]=useState<string>()
    const [summarisedContent,setSummarisedContent]=useState<string>("")
    const [inputType,setInputType]=useState("")
    const[loading,setLoading]=useState(false)
    const[style,setStyle]=useState<React.CSSProperties>({})
    const [userId, setUserId] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);


function handleTextClick() {
    setLoading(true);
    
    if (inputType === "file") {
        if (!file) {
            alert("Please upload a file first.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

        axios.post("http://localhost:7000/pdf/summarize/file", formData)
            .then((res) => {
                const summary = res.data.summary || res.data;
                setSummarisedContent(summary);
                return axios.post("http://localhost:7000/db/insert/content", {
                    content: content,
                    summary: summary,
                    type: inputType,
                    userId: userId,
                });
            })
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

    } else {
        axios.post(`http://localhost:7000/${inputType}/summarize/${inputType}`, { content: content })
            .then((res) => {
                const summary = res.data.summary || res.data;
                setSummarisedContent(summary);
                return axios.post("http://localhost:7000/insert/content", {
                    content: content,
                    summary: summary,
                    type: inputType,
                    userId: userId,
                });
            })
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    if (inputType === "text") {
        setStyle({ border: "1px solid green" });
    }
}


    useEffect(() => {
        if (selectedData) {
            console.log(selectedData)
            setContent(selectedData.content);
            setSummarisedContent(selectedData.summary);
            setInputType(selectedData.type );
        }
    }, [selectedData]);

        useEffect(() => {
      const id = localStorage.getItem("userId") || uuidv4();
      localStorage.setItem("userId", id);
      setUserId(id);

    }, []);


    return <main className="p-5 flex flex-col gap-10 md:gap-0">
        <div>
            <h2 className="font-semibold text-xl md:text-4xl pl-0 md:pl-5 pb-5">Step 1: Select your content type</h2>
        <section className="flex gap-5 items-center pl:0 md:pl-5 pb-5">
            <button className={`bg-green-200 p-5 md:p-8 rounded-2xl font-bold transition-all duration-200 ${ inputType === "text" ? "bg-green-400 text-white shadow-lg scale-105" : "bg-green-200" }`}  onClick={()=>setInputType("text")}>
                <MdOutlineTextFields/>
                Text
            </button>

            <button className={`bg-red-200 p-5 md:p-8 rounded-2xl font-bold transition-all duration-200 ${ inputType === "url" ? "bg-red-400 text-white shadow-lg scale-105" : "bg-red-200" }`} onClick={()=>setInputType("url")}>
                <FaLink/>
                URL
            </button>

            <button className={`bg-blue-200 p-5 md:p-8 rounded-2xl font-bold transition-all duration-200 ${ inputType === "file" ? "bg-blue-400 text-white shadow-lg scale-105" : "bg-blue-200" }`} onClick={()=>setInputType("file")}>
                <FaFilePdf/>
                Docs
            </button>

        </section>
        </div>

        <section className="flex flex-col  md:flex-row justify-between gap-5 md:gap-0 mb-10">
            <div className="flex flex-col w-full md:w-[50%] pl-0 md:pl-5">
            <h2 className="font-semibold text-xl md:text-3xl pb-5">Step 2: Paste your Content</h2>

            <div className="flex flex-col w-[100%] pl-0 md:pl-10">
            {inputType === "file" ? (
    <input type="file" disabled={!inputType} onChange={(e) => {setFile(e.target.files?.[0] || null); setContent(e.target.files?.[0].name)}}  className="border-solid border-1 border-amber-200 h-[5em]"/>
) : (
    <textarea
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Paste your ${inputType} here...`}
        disabled={!inputType}
        className="border border-amber-200 w-full h-[15em] bg-white text-start p-2"
    />
)}


            <div className="flex w-full items-center justify-between">
            <h2 className="font-semibold text-md md:text-2xl">Step 3: Summarize</h2>
            <button className="bg-black text-white font-bold mt-5 h-[4em] w-[35%] self-end rounded-3xl"  onClick={handleTextClick}>Summarize</button>
            </div>

            </div>

            </div>

            <section className="flex items-center justify-center">
                {loading && (<img src={spinner}/>)}
            </section>

            <div data-placeholder="AI Summary" className="w-full md:w-[40%] h-[20em] md:h-[25em] bg-amber-50 shadow-black shadow-sm font-serif">
                <h4 className="text-black">{summarisedContent}</h4>
            </div>
        </section>
    </main>
}