import type { User } from "../types/user"
import api from "../utils/axios"

const getCurrentUser=async()=>{
    try {
      const {data} = await api.get<User>("/api/me")
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getCurrentUser