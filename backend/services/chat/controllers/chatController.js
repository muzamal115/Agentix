import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"

export const createConversation=async (req,res) => {
    
    try {     
        const userId=req.headers["x-user-id"]
       

        const conversation=await Conversation.create({
            userId:userId
        })
        return res.status(201).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`create conversation error ${error}`})
    }
}

export const getConversation=async (req,res) => {
    try {
        const userId=req.headers["x-user-id"]
        const conversation=await Conversation.find({
           userId:userId
        }).sort({updatedAt:-1})

        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`conversation get error ${error}`})
    }
}

export const updateConversation=async (req,res) => {
       
    try {
        const{id,title}=req.body
        const conversation=await Conversation.findByIdAndUpdate(id,{
            title
        })

        return res.status(200).json(conversation)
        
    } catch (error) {
        return res.status(500).json({message:`update conversation error ${error}`})
    }
}

export const saveMessage=async (req,res) => {
    try {
        
       console.log("SAVE MESSAGE BODY:", req.body)
        const{conversationId,role,content,images,artifacts}=req.body
         
        const message=await Message.create({
            conversationId,
            role,
            content,
            images,
            artifacts
        })
              console.log("CREATED MESSAGE:", message)
        return res.status(201).json(message)
    } catch (error) {
        return res.status(500).json({message:`save message error ${error}`})
    }
}

export const getMessages=async (req,res) => {
    try {
        const conversationId=req.params.conversationId
     
        const messages=await Message.find({
            conversationId
        })
             
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({message:`get message error ${error}`})
    }
}

