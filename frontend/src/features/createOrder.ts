import type { CreateOrderResponse } from "../types/billing"
import api from "../utils/axios"
interface createOrderProps {
plan:string
}
export const createOrder =async (payload:createOrderProps):Promise<CreateOrderResponse|null> => {
    try {
        const {data}=await api.post<CreateOrderResponse>('/api/billing/create-order',payload)
           console.log(data)
           return data
        
    } catch (error) {
        console.log(error)
       return null
    }
}