import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true } // Ensures cookies are sent
      );
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk to verify admin authentication
export const verifyAuth = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/verify",
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      return null; // Clears user from state
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
