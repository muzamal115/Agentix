import type { Message } from "../types/message"
import api from "../utils/axios"

export const getMessages=async(id:string)=>{
     
    try {
         const {data}=await api.get<Message[]>(`/api/chat/get-messages/${id}`)
          
         return data

    } catch (error) {
        console.log(error)
        return []
    }
 

}