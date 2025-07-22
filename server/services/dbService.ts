import { UUID } from "crypto";
import { supabase } from "../config/db";

export const getAllContent=async(userId:string)=>{
    try {
        console.log(userId)
        const data=await supabase.from("content").select("*").eq("userId", userId)
        console.log(data)
        return data
    } catch (error) {
                console.log(error)
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
export const insertContent=async(content:string,summary:string,type:string,userId:string)=>{
    try {
        const data=await supabase.from("content").insert([{content:content,summary:summary,type:type,userId:userId}])
        console.log(data)
                return data
    } catch (error) {
        return error
    }
}