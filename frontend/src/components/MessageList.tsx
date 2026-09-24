import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import MessageBubble from "./MessageBubble"
import LoadingAnimation from "./LoadingAnimation"
import { useEffect, useRef } from "react"


const MessageList = () => {
     const {messages}=useSelector((state:RootState)=>state.message)
        const {selectedConversation}=useSelector((state:RootState)=>state.conversation)
        const {loading}=useSelector((state:RootState)=>state.message)
        const bottomRef=useRef<HTMLInputElement|null>(null)

         useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages, loading])
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
    
    {
      messages.length==0 || !selectedConversation?(
        <div className="h-full flex-col flex items-center justify-center gap-4 text-center">
          <div className="flex flex-col gap-1.5">
              <h1 className="text-[20px] font-semibold text-slate-200 tracking-tight ">Agentix</h1>
              <p className="text-[15px] font-semibold text-slate-400 tracking-tight ">How can I help you?</p>
              <p className="text-[13px] text-slate-600 max-w-[260px] leading-relaxed">Ask me anything - code, ideas, explanations, or just a quick question.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
        {
          ["Write a Netflix clone","Explain Js","Build a dashboard"].map((s,index)=>(
              <button key={index}
               className="text-[12px] text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg hover:bg-white/[0.08] hover:text-slate-200 transition-colors duration-150 cursor-pointer"
              >
                 {s}
              </button>
          ))
        }
          </div>
        </div>
      ):
      <div className="space-y-5">
        {
         messages?.map((msg,i)=>(
          <div key={i}>
            <MessageBubble role={msg?.role} content={msg?.content} images={msg.images || []}/>
          </div>
         ))
        }
      </div>
    }
   {loading&&<LoadingAnimation/>} 
   <div ref={bottomRef} />

    </div>
  )
}

export default MessageList