import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:'claimedTask',
    initialState: "-1",
    reducers:{
        assignTask(state,action){
            // console.log(action.payload)
            return action.payload
        }
    }
})

export const {assignTask} = UserSlice.actions
export default UserSlice