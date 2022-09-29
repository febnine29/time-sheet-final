import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from 'history';
import { RootState } from "../app/store";

interface RenderState {
    render: boolean
}
const initialState: RenderState = {
    render: false
}

const RenderSlice = createSlice({
    name: 'render',
    initialState,
    reducers: {
        isRender: (state, action) => {
            state.render = action.payload
        }
    }
})
export const {isRender} = RenderSlice.actions
export const renderSelector = (state: RootState) => state.render
export default RenderSlice.reducer