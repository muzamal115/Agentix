import type { Conversation } from "../types/conversation"
import api from "../utils/axios"

interface UpdateConversationProps{
    id:string,
    title:string
}

export const updateConversation= async (payload:UpdateConversationProps):Promise<Conversation|null> => {
    try {
        const{data}=await api.post<Conversation>('/api/chat/update-conversation',payload)
         return data
    } catch (error) {
        console.log(error)
        return null
    }
}   