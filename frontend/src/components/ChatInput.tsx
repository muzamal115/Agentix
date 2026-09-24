import { Code2, FileText, Globe, ImageIcon, MessageSquare, Mic, Paperclip, Presentation, Send, Zap } from "lucide-react"
import { useRef, useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { sendMessage } from "../features/sendMessage"
import { addMessage, setArtifacts, setLoading } from "../redux/slice/messageSlice"
import { createConversation } from "../features/createConversation"
import { addConversation, setConvTitle, setSelectedConversation } from "../redux/slice/conversationSlice"
import { updateConversation } from "../features/updateConversation"
import { X } from "lucide-react"

const ChatInput = () => {
  const[value,setValue]=useState<string>("")
  const[selectedAgent,setSelectedAgent]=useState<string>("Auto")
    const [selectedFile,setSelectedFile]=useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const{selectedConversation}=useSelector((state:RootState)=>state.conversation)
  const{loading}=useSelector((state:RootState)=>state.message)

  const fileRef=useRef<HTMLInputElement | null>(null)
  const formData=new FormData()
  useEffect(() => {
  if (!selectedFile) {
    setPreviewUrl(null)
    return
  }

  if (selectedFile.type.startsWith("image/")) {
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url) 
  }

  setPreviewUrl(null)
}, [selectedFile])

const handleRemoveFile = () => {
  setSelectedFile(null)
  if (fileRef.current) fileRef.current.value = "" }
 
  const dispatch=useDispatch()
 const handleSubmit = async () => {
    const cleanValue = value.trim()

    if (!cleanValue) return

    let conversation = selectedConversation

    if (!conversation) {
        const conv = await createConversation()

        if (!conv) return

        dispatch(addConversation(conv))
        dispatch(setSelectedConversation(conv))

        conversation = conv
    }

    if (conversation.title === "New Chat") {
        const updatedConversation = await updateConversation({
            id: conversation._id,
            title: cleanValue
        })

        if (updatedConversation) {
            dispatch(setConvTitle({
                conversationId: conversation._id,
                title: cleanValue
            }))
        }
    }

    if (!conversation._id) return



    formData.append("prompt",cleanValue)
    formData.append("conversationId",conversation._id)
    formData.append("agent",selectedAgent.toLocaleLowerCase())
    if(selectedFile){
      formData.append("file",selectedFile)
    }
    dispatch(addMessage({
        role: "user",
        content: cleanValue
    }))

    setValue("")
setSelectedFile(null)

    dispatch(setLoading(true))
    const data = await sendMessage(formData)
  dispatch(setLoading(false))

    if (data) {
      dispatch(setArtifacts(data.artifacts || []))
        dispatch(addMessage({
            role: "assistant",
            content: data.answer,
            images: data.images || []
        }))
    }
}
  const agents=[
    {
      id:"auto",
      icon:Zap,
      label:"Auto"
    },
    {
      id:"chat",
      icon:MessageSquare,
      label:"Chat"
    },
     {
      id:"coding",
      icon:Code2,
      label:"Coding"
    },
     {
      id:"pdf",
      icon:FileText,
      label:"PDF"
    },
     {
      id:"ppt",
      icon:Presentation,
      label:"PPT"
    },
     {
      id:"imgae",
      icon:ImageIcon,
      label:"Vision"
    },
     {
      id:"search",
      icon:Globe,
      label:"Search"
    },
  ]
  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3">

      <div className="flex w-[80%] gap-2 pr-2 flex-wrap ">
        {
          agents.map((agent,i)=>{
            const isActive=agent.label==selectedAgent
            const Icon=agent.icon
            return (
              <div key={i} 
              onClick={()=>setSelectedAgent(agent.label)}
              className={`
                cursor-pointer
  flex-shrink-0 
  inline-flex
  items-center
  gap-1.5
  px-3
  py-2
  rounded-full
  text-xs
  font-medium
  border
  transition-all
  ${
    isActive
      ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]"
      : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
  }
`}>
          <Icon size={14}
          className={`
            isActive?"text-white":"text-slate-500"
            `}
          />
          {agent.label}
</div>
            )
          })
        }

      </div>
      
      {selectedFile && (
  <div className="flex items-center gap-2 mb-2">
    {selectedFile.type.startsWith("image/") ? (
      // Image preview
      <div className="relative group">
        <img
          src={previewUrl ?? ""}
          alt={selectedFile.name}
          className="w-16 h-16 object-cover rounded-lg border border-white/[0.08]"
        />
        <button
          onClick={handleRemoveFile}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/80 text-white border border-white/20 hover:bg-red-500 transition-colors cursor-pointer"
        >
          <X size={12} />
        </button>
      </div>
    ) : (
      // PDF chip
      <div className="relative flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 pr-7">
        <FileText size={16} className="text-red-400 flex-shrink-0" />
        <span className="text-xs text-slate-300 truncate max-w-[160px]">
          {selectedFile.name}
        </span>
        <button
          onClick={handleRemoveFile}
          className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={11} />
        </button>
      </div>
    )}
  </div>
)}
      <textarea
      value={value}
      onChange={(e)=>setValue(e.target.value)}
      placeholder="Ask anything..."
      className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scroll]:hidden disabled:opacity-50"
      rows={3}
      />
     <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">

      <input type="file"  accept=".pdf,image/*" hidden ref={fileRef} onChange={(e)=>{
        const file=e.target.files?.[0]
        if(file){
         setSelectedFile(file)
        } 
       

      }}/>
        <button 
        onClick={()=>fileRef.current?.click()}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
          <Paperclip size={16}/>
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
          <Mic size={16}/>
        </button>
        
      </div>

      <button
      onClick={handleSubmit}
      disabled={!value && loading}
       className={`flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all duration-150 ${value?"bg-linear-to-br from-indigo-500 to-violet-700  hover:opacity-90 text-white":"bg-white/[0.05] text-slate-600 cursor-not-allowed"} `}>
        <Send size={15}/>
      </button>

     </div>

     
   </div>
    </div>
  )
}

export default ChatInput