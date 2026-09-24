
import type { SendMessageResponse } from "../types/message"
import api from "../utils/axios"



export const sendMessage=async (formData:FormData) => {
   
   
    try {
    
        const {data} = await api.post<SendMessageResponse>("/api/agent/chat",formData)
      
           return data

    } catch (error) {
       
       console.log("API ERROR:", error);
    }
    
}