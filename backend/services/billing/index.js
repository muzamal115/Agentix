import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/connectDb.js'
import router from './routes/billingRoute.js'
import { verifyPayment } from './controllers/billingController.js'
dotenv.config()

const app=express()
app.post("/webhook", express.raw({ type: "application/json" }),verifyPayment)
app.use(express.json())

const port=process.env.PORT
app.use('/',router)
app.get('/',(req,res)=>{
    return res.json({response:"Hello from billing"})
})
app.listen(port,()=>{
    console.log(`billing service started at ${port}`)
    connectDb()
})
