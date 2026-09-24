import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/connectDb.js'

import chatRouter from './routes/chatRoute.js'

dotenv.config()

const app=express()
app.use(express.json())

const port=process.env.PORT

app.use('/',chatRouter)
app.get('/',(req,res)=>{
    return res.json({response:"Hello from chat"})
})
app.listen(port,()=>{
    console.log(`chat service started at ${port}`)
    connectDb()
})
