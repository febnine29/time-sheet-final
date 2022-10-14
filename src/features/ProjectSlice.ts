import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllProjectApi,   
  activeProjectApi,
  inActiveProjectApi,
  deleteProjectApi,
  addProjectApi,
} from "../api/projectapi";
import { RootState } from "../app/store";
import {
  DataSingleProject,
  PayloadGetProject,
  PayloadNewProject,
  ResponseGetAllProject,
  ResultResponseGetAllProject,
} from "../type/Project";
type TypeMess = "info" | "warning" | "success" | "error" | undefined;
interface Message {
  type: TypeMess;
  mess: string;
}
interface ProjectState {
  projectLoading: boolean;
  projects: ResultResponseGetAllProject[] | null;
  message: Message;
  project: PayloadNewProject | null;
}
const initialState: ProjectState = {
  projectLoading: false,
  projects: null,
  project: null,
  message: {
    type: "success",
    mess: "",
  },
};
export const getAllProject = createAsyncThunk(
  "project/getAll",
  async (data?: PayloadGetProject) => {
    const { status = "", search = "" } = data!;
    try {
      const response = await axios.get<ResponseGetAllProject>(
        `${getAllProjectApi}?status=${status}&search=${search}`
      );

      return response.data;
      console.log('test result', response.data)
    } catch (error) {
      console.log(error);
    }
  }
);
export const activeProject = createAsyncThunk(
  "project/activeProject",
  async (data: DataSingleProject[] | [], { dispatch }) => {
    Promise.all(
      data.map((item) =>
        axios
          .post(activeProjectApi, { id: item.id })
          .then((result) => {
            dispatch(
              setMess({
                type: "success",
                mess: `${item.name} DeActive Success`,
              })
            );
          })
          .catch((error) => {
            dispatch(
              setMess({ type: "error", mess: `${item.name} DeActive Error` })
            );
          })
      )
    )
      .then((result) => {
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  }
);
export const deActiveProject = createAsyncThunk(
  "project/deActiveProject",
  async (data: DataSingleProject[] | [], { dispatch }) => {
    Promise.all(
      data.map((item) =>
        axios
          .post(inActiveProjectApi, { id: item.id })
          .then((result) => {
            dispatch(
              setMess({
                type: "success",
                mess: `${item.name} DeActive Success`,
              })
            );
          })
          .catch((error) => {
            dispatch(
              setMess({ type: "error", mess: `${item.name} DeActive Error` })
            );
          })
      )
    )
      .then((result) => {
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  }
);
export const deleteProject = createAsyncThunk(
  "project/deActiveProject",
  async (data: DataSingleProject[] | [], { dispatch }) => {
    Promise.all(
      data.map((item) =>
        axios
          .delete(`${deleteProjectApi}?Id=${item.id}`)
          .then((result) => {
            dispatch(
              setMess({
                type: "success",
                mess: `Delete ${item.name} Success`,
              })
            );
          })
          .catch((error) => {
            dispatch(
              setMess({
                type: "error",
                mess: `Delete ${item.name} Error`,
              })
            );
          })
      )
    )
      .then((result) => {
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  }
);
export const saveProject = createAsyncThunk(
  "project/save",
  async (data: PayloadNewProject, { dispatch }) => {
    try {
      const response = await axios.post(addProjectApi, data);
      console.log(response);
      dispatch(getAllProject({status: '', search: ''}));
      dispatch(
        setMess({
          type: "success",
          mess: `Save Project Success`,
        })
      );
    } catch (error) {
      dispatch(
        setMess({
          type: "error",
          mess: "Save Project Fail",
        })
      );
    }
  }
);

export const getSingleProject = createAsyncThunk(
  "project/getSingleProject",
  async (url: string, { dispatch }) => {
    const response = await axios.get(url);

    return response.data;
  }
);
const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setMess: (state, { payload }: { payload: Message }) => {
      state.message.type = payload.type;
      state.message.mess = payload.mess;
    },
    setProjectEmtyl: (state) => {
      state.project = null;
    },
  },
  extraReducers: (builder) => {
    // get all project
    builder.addCase(getAllProject.pending, (state, action) => {
      state.projectLoading = true;
    });
    builder.addCase(getAllProject.fulfilled, (state, { payload }) => {
      state.projectLoading = false;
      state.projects = payload?.result!;
    });
    builder.addCase(getAllProject.rejected, (state, action) => {
      state.projectLoading = false;
    });
    // get single project
    builder.addCase(getSingleProject.pending, (state, action) => {
      // state.projectLoading = true;
    });
    builder.addCase(getSingleProject.fulfilled, (state, { payload }) => {
      // state.projectLoading = false;
      state.project = payload?.result!;
    });
    builder.addCase(getSingleProject.rejected, (state, action) => {
      // state.projectLoading = false;
    });
  },
});
export const { setMess, setProjectEmtyl } = ProjectSlice.actions;
export const projectSelector = (state: RootState) => state.project;
export default ProjectSlice.reducer;
