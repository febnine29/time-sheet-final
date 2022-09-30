import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  DataFormRegister,
  LoginResponse,
  RegisterResponse,
  DataFormLogin,
  ResultLoginResponse,
  GetCurLoginInfoResponse,
  UserInfo,
} from "../type/Auth";
import { loginApi, registerApi } from "../api/authapi";
import axios from "axios";
import { Navigate } from "react-router-dom";
import setToken from "../configs/setToken";
import { RootState } from "../app/store";
export interface AuthState {
  isAuthenticate: boolean;
  userId: number | null;
  authLoading: boolean;
  userInfo: UserInfo | null;
}
export const login = createAsyncThunk(
  "auth/login",
  async (dataForm: DataFormLogin, { dispatch }) => {
    const response = await axios.post<LoginResponse>(loginApi, dataForm);
    if (response.status === 200) {
      dispatch(setTokenLocalStorage(response.data.result.accessToken));
      setToken(response.data.result.accessToken);
      
    } else {
      dispatch(removeTokenLocalStorage());
      setToken(null);
    }
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/login",
  async (dataForm: DataFormRegister) => {
    const response = await axios.post<GetCurLoginInfoResponse>(
      registerApi,
      dataForm
    );

    return response.data;
  }
);

export const getCurLoginInfo = createAsyncThunk(
  "auth/getCurLoginInfo",
  async (url: string, thunkApi) => {
    const response = await axios.get(url);
    return response.data;
  }
);

const initialState: AuthState = {
  isAuthenticate: false,
  userId: null,
  authLoading: false,
  userInfo: null,
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticate = false;
      state.userId = null;
    },
    setTokenLocalStorage: (state, action) => {
      localStorage.setItem("accesstoken", action.payload);
    },
    removeTokenLocalStorage: (state) => {
      localStorage.removeItem("accesstoken");
    },
    loginToken: (state, { payload }) => {
      state.isAuthenticate = true;
      state.userId = payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.authLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.authLoading = false;
      state.isAuthenticate = true;
      state.userId = payload.result.userId;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authLoading = false;
      state.userId = null;
      state.isAuthenticate = false;
      console.log("error");
    });
    // Get infomation

    builder.addCase(getCurLoginInfo.fulfilled, (state, { payload }) => {
      state.authLoading = false;
      if (payload.result.user) {
        state.isAuthenticate = true;
        state.userInfo = payload.result.user;
      } else {
        state.isAuthenticate = false;
        state.userInfo = null;
      }
    });
    builder.addCase(getCurLoginInfo.pending, (state, { payload }) => {
      state.authLoading = true;
    });
    builder.addCase(getCurLoginInfo.rejected, (state, { payload }) => {
      state.authLoading = false;
    });
  },
});
export const { logout, setTokenLocalStorage, removeTokenLocalStorage } =
  AuthSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default AuthSlice.reducer;
