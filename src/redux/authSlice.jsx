import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, signUpUserApi } from "./api";

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  const response = await loginUserApi(credentials.email, credentials.password);
  return response.data.body;
});

export const signUpUser = createAsyncThunk("auth/signUpUser", async (user) => {
  const response = await signUpUserApi(user.email, user.password, user.firstName, user.lastName);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null; // Reset the error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null; // Reset the error
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
