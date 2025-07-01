import { useEffect, useState } from "react";
import axios from "axios";

export default function History(){

    interface contentData{
        id:number,
        content:string,
        summary:string,
        type:string,
        created_at:string
    }
    const [data,setData]=useState<contentData[]>([])
    function handleDataOutput(){
        axios.get("http://localhost:7000/content/data/all")
        .then((res)=>{
            setData(res.data.data)
            console.log(res.data)
            return 
        })
        .catch((err)=>{
            return err
        })
    }

    useEffect(()=>{
        handleDataOutput()
    },[])

    return <main className="w-full p-10 bg-amber-50">
        <h2 className="font-semibold text-2xl">SUMMARIES</h2>
        <table className="w-full border-solid border-amber-100 border-3">
            <tbody>
                <tr className="flex justify-around">
                <th className="w-[5rem] flex items-center justify-center">Content</th>
                <th className="w-[5rem] flex items-center justify-center">Summary</th>
                <th className="w-[5rem] flex items-center justify-center">Type</th>
                <th className="w-[5rem] flex items-center justify-center">Date</th>
                <th className="w-[5rem] flex items-center justify-center">Link</th>
                <th className="w-[5rem] flex items-center justify-center">Id</th>
            </tr>

                {data.map((item)=>(
                    <tr key={item.id} className="flex justify-around pb-5">
                        <td className="w-[5rem] flex items-center justify-center">{item.id}</td>
                        <td className="max-w-[5rem] truncate ">{item.content}</td>
                        <td className="max-w-[5rem] truncate">{item.summary}</td>
                        <td className="w-[5rem] flex items-center justify-center">{item.type}</td>
                        <td className="w-[5rem] flex items-center justify-center">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="w-[5rem] flex items-center justify-center bg-blue-600 rounded-lg text-white text-lg font-bold cursor-pointer">Restore</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </main>
}