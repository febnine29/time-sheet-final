import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from 'history';
import { RootState } from "../app/store";
import {DataSingleProject} from "../type/Project";
import {Customer} from "../type/Customer";
import {UserNotPagging} from "../type/User"
interface idState{
    pId: DataSingleProject,
    users: UserNotPagging[],
    customers: Customer[] 
}
const initialState: idState = {
    pId: {
        name: "",
        code: "",
        status: 0,
        pms: [],
        activeMember: 0,
        projectType: 0,
        timeStart: "",
        timeEnd: "",
        id: 0
    },
    users: [],
    customers: []
}
const storeidSlice = createSlice({
    name: 'storeId',
    initialState,
    reducers:{
        addId:(state, action) => {
            state.pId = action.payload
        },
        storeUsers:(state, action) => {
            state.users = action.payload
        },
        storeCustomers:(state, action) => {
            state.customers = action.payload
        }
    }
})
export const {addId, storeUsers ,storeCustomers} = storeidSlice.actions
export const idSelector = (state: RootState) => state.storeId
export const userSelector = (state: RootState) => state.user
export const customerSelector = (state: RootState) => state.customer
export default storeidSlice.reducer