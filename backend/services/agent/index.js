import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/connectDb.js'
import agentRouter from './routes/agentRouter.js'



dotenv.config()

const app=express()
app.use(express.json())

const port=process.env.PORT
app.use('/',agentRouter)
app.use((err,req,res,next)=>{
    console.log(err)
    if(err.status){
        return res.status(err.status).json(err.data)
    }
    return res.status(500).json({message:`agent error ${err}`})
})
app.get('/',(req,res)=>{
    return res.json({response:"Hello from agent"})
})
app.listen(port,()=>{
    console.log(`agent service started at ${port}`)
    connectDb()
})
