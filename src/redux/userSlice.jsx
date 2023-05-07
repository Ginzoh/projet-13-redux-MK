import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileApi, updateProfileApi } from "./api";

export const fetchProfile = createAsyncThunk("user/fetchProfile", async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetchProfileApi(token);
  return response.data;
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (data, { getState }) => {
  const token = getState().auth.token;
  const response = await updateProfileApi(token, data.firstName, data.lastName);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.profile = action.payload.body;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // Update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.profile = action.payload.body;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
