import { response } from "express";
import { supabase } from "../config/db";

export const getAllContent=async()=>{
    try {
        const data=await supabase.from("content").select("*")
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}

export const getContent=async(id:number)=>{
    try {
        const data=await supabase.from("content").select().eq('id',id)
        return data
    } catch (error) {
        return error
    }
}
export const insertContent=async(content:string,summary:string,type:string)=>{
    try {
        const data=await supabase.from("content").insert([{content:content,summary:summary,type:type}])
        console.log(data)
                return data
    } catch (error) {
        return error
    }
}