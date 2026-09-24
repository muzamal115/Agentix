import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import conversatioReducer from './slice/conversationSlice'
import messageReducer from './slice/messageSlice'
export const store=configureStore({
    reducer:{
     user:userReducer,
     conversation:conversatioReducer,
     message:messageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


