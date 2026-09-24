export interface CreateOrderResponse {
  checkoutURL: string
  plan: {
    id: string
    name: string
    amount: number
    credits: number
    validity: number
  }
}