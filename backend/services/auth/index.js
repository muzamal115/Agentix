import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/connectDb.js'
import authRouter from './routes/authRouter.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())
const port=process.env.PORT
app.use('/',authRouter)
app.get('/',(req,res)=>{
    return res.json({response:"Hello from billing"})
})
app.listen(port,()=>{
    console.log(`auth service started at ${port}`)
    connectDb()
})
