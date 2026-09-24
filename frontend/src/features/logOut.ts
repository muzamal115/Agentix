import type { LogoutResponse } from "../types/user"
import api from "../utils/axios"

export const logOut=async()=>{
    try {
        const {data}=await api.get<LogoutResponse>("/api/auth/logout")
    console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}