import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

const userSlice =createSlice({
    name:"user",
        initialState:{
            userData:null as User | null
        },
    reducers:{
        setUserData:(state,action)=>{
          state.userData=action.payload
        }
    }
})

export const {setUserData} =userSlice.actions
export default userSlice.reducer