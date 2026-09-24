import { Coins, LogOut, Menu, MessageSquare, PanelLeftIcon, PenSquare, Plus, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import { getConversations } from "../features/getConversations"
import { useDispatch, useSelector } from "react-redux"
import {  setConversations, setSelectedConversation } from "../redux/slice/conversationSlice"

import type { RootState } from "../redux/store"
import { logOut } from "../features/logOut"
import { setUserData } from "../redux/slice/userSlice"
import BillingDrawer from "./BillingDrawer"


const SideBar = () => {
    const {conversations,selectedConversation}=useSelector((state:RootState)=>state.conversation)
    const {userData}=useSelector((state:RootState)=>state.user)
    const [mobileOpen,setMobileOpen]=useState<boolean>(false)

    const[collapsed,setCollapsed]=useState<boolean>(false)
    const [showBilling,setShowBilling]=useState<boolean>(false)
    const dispatch=useDispatch()
    useEffect(()=>{
        const getCon=async () => {
          const data= await getConversations()  
        
           dispatch(setConversations(data))
        }
        getCon()
    },[userData])
 
    if (collapsed) {
  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[68px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
      <div className="flex flex-col h-full items-center">
        <div className="flex items-center justify-center px-2 py-4 border-b border-white/[0.06] w-full">
          <div
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={() => setCollapsed(false)}
          >
            <PanelLeftIcon />
          </div>
        </div>

        <div className="px-2 pt-4 pb-1">
          <button
            className="flex items-center justify-center w-9 h-9 text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={()=>dispatch(setSelectedConversation(null))}
          >
            <Plus size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2 w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-3">
          {conversations?.map((conv) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                key={conv._id}
                className={`flex items-center justify-center cursor-pointer mb-0.5 py-2.5 rounded-[10px] border transition-colors duration-150
                ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]" : "bg-transparent border-transparent"}
                `}
                onClick={() => dispatch(setSelectedConversation(conv))}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-color duration-150
                    ${isActive ? "bg-indigo-500/15 text-indigo-400 " : "bg-white-[0.05] text-slate-500"}`}
                >
                  <MessageSquare size={13} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-2.5 border-t border-white/[0.06] w-full flex justify-center">
          <div className="px-2 py-3.5">
            {userData ? (
              <div className="flex items-center justify-center cursor-pointer rounded-xl p-1 hover:bg-white/[0.05] transition-colors duration-150">
                <div className="relative shrink-0">
                  {userData?.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="image"
                      className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/15"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-[10px] object-cover border-2 flex items-center justify-center bg-white/[0.06]">
                      <User size={15} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-[10px] object-cover border-2 flex items-center justify-center bg-white/[0.06]">
                <User size={15} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  return (
    <>
    <button 
        className='lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer' 
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={14} />
      </button>
      {
        mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className='lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
        />
      )
        
      }
    <div className={`fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06] transition-transform duration-250 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
    <div className="flex flex-col h-full ">
        <div className="flex items-center  gap-2.5 px-4 py-4 border-b border-white/[0.06]">
        <div className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200  hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
        onClick={()=>setCollapsed(true)}
        >
            <PanelLeftIcon/>
        </div>
        <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1 ">
            Agentix
        </span>
        <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">{userData?.plan||"free"}</span>
        <button className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200  hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
        onClick={()=>dispatch(setSelectedConversation(null))}
        >
            <PenSquare size={14}/>
        </button>
        <button
  className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] bg-transparent border-none cursor-pointer"
  onClick={() => setMobileOpen(false)}
>
  <X size={16}/>
</button>
        </div>
        <div className="px-4 pt-4 pb-1">
            <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={()=>dispatch(setSelectedConversation(null))}
            >
          <Plus size={15}/>
          New Chat
            </button>
        </div>
        {
         conversations?.length==0?  
         <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
                No Recent Conversations
         </div>:(
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
               Recents
            </div>
         )
        }

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

       {conversations?.map((conv)=>{
        const isActive=selectedConversation?._id==conv?._id
        return(
            <div key={conv._id} className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px]  border transition-colors duration-150 
            ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]":"bg-transparent border-transparent"}
            `}
            onClick={()=>dispatch(setSelectedConversation(conv))}
            >
                <div className={`flex items-center   justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-color duration-150 
                    ${isActive?'bg-indigo-500/15 text-indigo-400 ':"bg-white-[0.05] text-slate-500"}`}>
                     <MessageSquare size={13}/>
                </div>
              <span className={`text-[13px] font-medium truncate ${isActive?"text-slate-100":"text-slate-300"}`}>{conv?.title|| "NEW CHAT "}</span>
            </div>
        )
       })}
   
        </div>

        <div className="mx-2.5  border-t border-white/[0.06]  ">
            <div className="px-3.5 py-3.5">
                {
                    userData?(
                        <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
                            <div className="relative shrink-0">
                                {
                                    (userData?.avatar)?
                                    <img src={userData.avatar} alt="image" className=" w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/15" />
                                    :
                                    <div className="w-9 h-9 rounded-[10px] object-cover border-2 flex  items-center justify-center bg-white/[0.06]">
                                        <User size={15}/>
                                    </div>
                                }
                            </div>

                            <div className="flex-1  min-w-0">
                                 <p className="text-[13.5px] font-semibold text-slate-100 truncate">{userData?.name|| "user"}</p>
                                 <p className="text-[11px] text-slate-600 mt-px">{userData?.plan||"Free Plan"}</p>
                            </div>

                            <div className="flex gap-1">
                                <button
                                onClick={()=>setShowBilling(true)}
                                className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150">
                                    <Coins size={16}/>
                                </button>
                                <button className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                                onClick={()=>{
                                    logOut();
                                    dispatch(setUserData(null))
                                }}
                                >
                                    <LogOut size={16}/>
                                </button>
                            </div>

                        </div>
                    ):(
                        <div className="">No User Data found</div>
                    )
                }
            </div>
        </div>
    </div>
   
    </div>
     <BillingDrawer
    open={showBilling}
    onClose={()=>setShowBilling(false)}
    />
    </>
  )
}

export default SideBar