
import { createSlice } from "@reduxjs/toolkit";
import type { Message } from "../../types/message";
import type { Artifact } from "../../types/artifact";


const messageSlice = createSlice({
    name: "conversation",

    initialState: {
        messages: [] as Message[]  ,
        artifacts:[] as Artifact[],
        loading:false
    },

    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
         addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
         setArtifacts: (state, action) => {
            state.artifacts=action.payload
        },
          setLoading: (state, action) => {
            state.loading=action.payload
        },
    
    }
});

export const { setMessages,addMessage,setArtifacts,setLoading} = messageSlice.actions;

export default messageSlice.reducer;