import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../features/AuthSlice";
import TaskSliceReducer from "../features/TaskSlice";
import ProjectSliceReducer from "../features/ProjectSlice";
import AlertReducer from "../features/AlertReducer";
import storeid from "../features/StoreId"
const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    task: TaskSliceReducer,
    project: ProjectSliceReducer,
    alert: AlertReducer,
    storeId: storeid
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
