import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://dieticain.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const verifyAuth = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://dieticain.onrender.com/api/auth/verify",
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "https://dieticain.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      return null;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const forgotpassword = createAsyncThunk(
  'auth/forgot-password',
  async(email)=>{
    try {
      const res = await axios.post('https://dieticain.onrender.com/api/auth/forgot-password',{email});
      const data = res.data;
    } catch (error) {
       return rejectWithValue(error.response?.data || "Forgot password  failed");
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('https://dieticain.onrender.com/api/auth/update-password', {
        email,
        otp,
        password
      });
      const data = res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password reset failed");
    }
  }
);

export const updateUser = createAsyncThunk('auth/update-user',
  async (formData, { rejectWithValue }) => { 
    try {
      const res = await axios.post(
        'https://dieticain.onrender.com/api/auth/update-profile',
        formData,
        { 
          withCredentials: true 
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "User updatation failed");
    }
  }
);

const authSlice = createSlice({ 
  name: "auth",
  initialState: {
    user: null,
    isInitialized: false,
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
        state.isInitialized = true;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(forgotpassword.pending,(state)=>{
        state.loading = true;
      })
      .addCase(forgotpassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotpassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.pending,(state)=>{
        state.loading = true;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.pending,(state)=>{
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action?.payload?.message || "User updation failed"
      })
      .addCase(updateUser.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload
      })
  },
});

export default authSlice.reducer;