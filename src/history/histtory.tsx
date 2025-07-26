    import { useEffect, useState } from "react";
    import axios from "axios";

    export default function History({onSelectId,refreshTrigger}:{onSelectId:(id:number)=>void,refreshTrigger:boolean}) {

        interface contentData{
            id:number,
            content:string,
            summary:string,
            type:string,
            created_at:string
        }
        const [data,setData]=useState<contentData[]>([])

        const userId = localStorage.getItem("userId");
        const handleDataOutput=()=>{
            axios.get(`http://contentsummarizer-ybo5.onrender.com/db/content/data/all`,{params:{userId}})
            .then((res)=>{
                setData(res.data.data)
                return 
            })
            .catch((err)=>{
                return err
            })
        }

        useEffect(()=>{
                handleDataOutput()
        },[refreshTrigger])
        



        return <main className="w-full p-5 md:p-10 bg-amber-50">
            <h2 className="font-semibold text-3xl font-serif pb-5">SUMMARIES</h2>
            <section className="w-full overflow-x-scroll" style={{scrollbarWidth:'none',msOverflowStyle: 'none'}}>
                <table className="w-[70em] md:w-[100%] border-solid border-amber-100 border-3 flex">
                <tbody className="w-full flex flex-col ">
      
                    <tr className="flex gap-5 justify-around text-base md:text-xl">
                    <th className="w-[5rem] flex items-center justify-center">Content</th>
                    <th className="w-[5rem] flex items-center justify-center">Summary</th>
                    <th className="w-[5rem] flex items-center justify-center">Type</th>
                    <th className="w-[5rem] flex items-center justify-center">Date</th>
                    <th className="w-[5rem] flex items-center justify-center">Link</th>
                </tr>

                    {data.map((item)=>(
                        <tr key={item.id} className="flex gap-10 justify-around pb-5">
                            <td className="max-w-[5rem] truncate">{item.content}</td>
                            <td className="max-w-[5rem] truncate">{item.summary||"error gen Summ"}</td>
                            <td className="w-[5rem] flex items-center justify-center ">{item.type}</td>
                            <td className="w-[5rem] flex items-center justify-center">{new Date(item.created_at).toLocaleDateString()}</td>
                            <td className="w-[5rem] flex items-center justify-center bg-blue-600 rounded-lg text-white text-lg font-bold cursor-pointer" onClick={()=>{onSelectId(item.id)}}>Restore</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </section>
        </main>
    }