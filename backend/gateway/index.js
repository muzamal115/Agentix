import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'
import protect from './middleware/authMiddleware.js'
import { getCurrentUser } from './controllers/authController.js'
import cookieParser from 'cookie-parser'
import { proxyWithHeader } from './utils/proxyWithHeader.js'
import morgan from 'morgan'


const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

const port=process.env.PORT
app.use(morgan("dev"))
app.get('/',(req,res)=>{
    return res.json({response:"Hello from gateway v4"})
})
app.get('/api/me',protect,getCurrentUser)
app.use('/api/auth',proxyWithHeader(process.env.AUTH_SERVICE))
app.use('/api/chat',protect,proxyWithHeader(process.env.CHAT_SERVICE))
app.use('/api/agent',protect,proxyWithHeader(process.env.AGENT_SERVICE))
app.use('/api/billing',protect,proxyWithHeader(process.env.BILLING_SERVICE))
app.listen(port,()=>{
    console.log(`gateway started at ${port}`)   
})
