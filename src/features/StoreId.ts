import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from 'history';
import { RootState } from "../app/store";
import { storeId } from './AlertReducer';
import {DataSingleProject} from "../type/Project"
interface idState{
    pId: DataSingleProject
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
    }
}
const storeidSlice = createSlice({
    name: 'storeId',
    initialState,
    reducers:{
        addId:(state, action) => {
            state.pId = action.payload
        }
    }
})
export const {addId} = storeidSlice.actions
export const idSelector = (state: RootState) => state.storeId
export default storeidSlice.reducer