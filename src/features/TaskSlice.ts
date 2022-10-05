import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ResponseEditTask, ResponseGetTask, Task } from "../type/Task";
import axios from "axios";
import {
  archiveTaskApi,
  deArchiveTaskApi,
  deleteTaskApi,
  getAllTaskApi,
  saveTaskApi,
} from "../api/taskapi";
import { RootState } from "../app/store";

type TypeMess = "info" | "warning" | "success" | "error" | undefined;
interface Message {
  type: TypeMess;
  mess: string;
}
interface TaskState {
  task: Task | null;
  tasks: Task[] | null;
  taskLoading: boolean;
  message: Message;
}

export const getAllTask = createAsyncThunk("task/getAll", async () => {
  const response = await axios.get<ResponseGetTask>(getAllTaskApi);

  return response.data;
});
export const editTask = createAsyncThunk(
  "task/editTask",
  async (dataForm: Task, { dispatch }) => {
    try {
      const response = await axios.post<ResponseEditTask>(
        saveTaskApi,
        dataForm
      );
      if (response.data.result) {
        dispatch(getAllTask());
      }
      dispatch(setMess({ type: "success", mess: "Edit Success" }));
    } catch (error) {
      console.log(error);
    }
  }
);
export const newTask = createAsyncThunk(
  "task/editTask",
  async (dataForm: Partial<Task>, { dispatch }) => {
    try {
      const response = await axios.post<ResponseEditTask>(
        saveTaskApi,
        dataForm
      );
      if (response.data.result) {
        dispatch(getAllTask());
      }
      dispatch(setMess({ type: "success", mess: "Add New Task Success" }));
    } catch (error) {
      console.log(error);
    }
  }
);
export const archiveTask = createAsyncThunk(
  "task/archiveTask",
  async (id: number, { dispatch }) => {
    try {
      const response = await axios.delete(`${archiveTaskApi}?Id=${id}`);
      if (response.data.success) {
        dispatch(getAllTask());
        dispatch(
          setMess({
            type: "success",
            mess: "Archive Task Success",
          })
        );
      }
    } catch (error) {
      dispatch(
        setMess({
          type: "error",
          mess: "This task is in a project, you can't delete task",
        })
      );
    }
  }
);
export const deArchiveTask = createAsyncThunk(
  "task/deArchiveTask",
  async (body: { id: number }, { dispatch }) => {
    try {
      const response = await axios.post(deArchiveTaskApi, body);
      if (response.status === 200) {
        dispatch(getAllTask());
        dispatch(
          setMess({
            type: "success",
            mess: "UnArchive Task Success",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setMess({
          type: "error",
          mess: "UnArchive Task Fail",
        })
      );
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: number, { dispatch }) => {
    try {
      const response = await axios.delete(`${deleteTaskApi}?Id=${id}`);
      if (response.status === 200) {
        dispatch(getAllTask());
        dispatch(
          setMess({
            type: "success",
            mess: "Delete Success",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setMess({
          type: "success",
          mess: "Delete Fail",
        })
      );
    }
  }
);

const initialState: TaskState = {
  task: null,
  tasks: null,
  taskLoading: false,
  message: {
    type: "success",
    mess: "",
  },
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setEditTask: (state, action: { payload: Task }) => {
      const indexTask = state.tasks?.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexTask) {
        (state.tasks as Task[])[indexTask] = action.payload;
      }
    },
    setMess: (state, { payload }: { payload: Message }) => {
      state.message.type = payload.type;
      state.message.mess = payload.mess;
    },
  },
  extraReducers: (builder) => {
    // Get All Task
    builder.addCase(getAllTask.pending, (state, action) => {
      state.taskLoading = true;
    });
    builder.addCase(getAllTask.fulfilled, (state, { payload }) => {
      state.taskLoading = false;
      state.tasks = payload?.result;
    });
    builder.addCase(getAllTask.rejected, (state, action) => {
      state.taskLoading = false;
      state.tasks = null;
    });
    //Edit Task
  },
});
export const { setEditTask, setMess } = TaskSlice.actions;
export const taskSelector = (state: RootState) => state.task;

export default TaskSlice.reducer;
