import { createSlice } from "@reduxjs/toolkit";
import type { Conversation } from "../../types/conversation";


const conversationSlice = createSlice({
    name: "conversation",

    initialState: {
        conversations: [] as Conversation[],
        selectedConversation:null as Conversation | null
    },

    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        addConversation:(state,action)=>{
             state.conversations.unshift(action.payload)
        },
        setSelectedConversation:(state,action)=>{
            state.selectedConversation=action.payload
        },
          setConvTitle:(state,action)=>{
            const{title,conversationId}= action.payload
               const conversation = state.conversations.find(
        (conv) => conv._id === conversationId
    )

    if (conversation) {
        conversation.title = title
    }


              if ( state.selectedConversation && state.selectedConversation?._id === conversationId) {
                state.selectedConversation.title = title
    }
        }
    }
});

export const { setConversations ,addConversation,setSelectedConversation,setConvTitle} = conversationSlice.actions;

export default conversationSlice.reducer;