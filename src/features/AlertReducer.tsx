import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from 'history';
import { string } from 'yup';
import { RootState } from "../app/store";
import { Task } from "../type/Task";
interface TaskState{
    task: Task
}
const initialState: TaskState = {
    task: {
        name: "",
        type: 0,
        isDeleted: false,
        id: 0
    }
}
const AlertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        storeId: (state, action) => {
            state.task = action.payload;

        }
    }
}) 
export const {storeId} = AlertSlice.actions
export const alertSelector = (state: RootState) => state.alert
export default AlertSlice.reducer