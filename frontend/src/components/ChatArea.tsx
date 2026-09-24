import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"
import Nav from "./Nav"
import { useEffect } from "react"
import { getMessages } from "../features/getMessages"
import { setArtifacts, setMessages } from "../redux/slice/messageSlice"


const ChatArea = () => {
   const {selectedConversation}=useSelector((state:RootState)=>state.conversation)
   const dispatch=useDispatch()
   useEffect(() => {
    const loadMessages = async () => {
        if (!selectedConversation?._id) return

        dispatch(setMessages([]))

        if (selectedConversation.title === "New Chat") {
            return
        }

        const data = await getMessages(selectedConversation._id)

        dispatch(setMessages(data ?? []))
        const latestArtifactMessage=[...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length > 0)
        
        dispatch(setArtifacts(latestArtifactMessage?.artifacts || []))
    }

    loadMessages()
}, [selectedConversation?._id])
  return (
    <div className=" flex-1 flex flex-col min-w-0">
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea