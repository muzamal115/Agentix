import { MessageSquare } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"


const Nav = () => {
  const {selectedConversation}=useSelector((state:RootState)=>state.conversation)
  const {messages}=useSelector((state:RootState)=>state.message)
  return (
      <>
    {selectedConversation &&(
       <div className="h-14 flex gap-2.5 items-center px-5 border-b border-white/[0.06] bg-[#0d0f14]">
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 ">
        <MessageSquare size={13} className="text-indigo-400"/>
      </div>
      <div className="text-[14px] font-semibold text-slate-100 tracking-tight">
        {selectedConversation?.title || "New Chat"}
      </div>
      <div className="text-[10px] font-medium text-slate-600 bg-white/[0.04] border border-white/[0.06] py-0.5 rounded-full px-2">
        {messages?.length} Messages
      </div>
    </div>
    )}
    </>
  )
}

export default Nav