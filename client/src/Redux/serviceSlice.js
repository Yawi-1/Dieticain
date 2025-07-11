// Redux: serviceSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dieticain.onrender.com";

// Fetch services
export const fetchService = createAsyncThunk("service/fetchService", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const { services, lastFetched } = state.service;
    
    // Check if we have cached data and it's less than 5 minutes old
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; 
    
    if (services.length > 0 && lastFetched && (now - lastFetched) < fiveMinutes) {
      // Return cached data if it's fresh 
      return services;
    }
    
    const response = await axios.get(`${API_URL}/api/service`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add service
export const addService = createAsyncThunk(
  "service/addService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/service`, serviceData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Book service
export const bookService = createAsyncThunk(
  "service/bookService",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/payment/razorpay/create`,
        bookingData,
        { withCredentials: true }
      );
      return response.data.url;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete service
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/service/${serviceId}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: { 
    services: [], 
    status: "idle", 
    error: null,
    lastFetched: null 
  },
  reducers: {
    addServiceFromSocket: (state, action) => {
      state.services.unshift(action.payload);
    },
    clearCache: (state) => {
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => { 
        state.status = "loading"; 
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = "success";
        state.lastFetched = Date.now();
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(bookService.fulfilled, (_, action) => {
        window.location.href = action.payload; 
      })
      .addCase(deleteService.pending,(state,action)=>{
        state.status="loading"
      })
      .addCase(deleteService.fulfilled,(state,action)=>{
        state.status="success"
        state.services = state.services.filter((service)=> service._id !== action.payload._id)
      })
      .addCase(deleteService.rejected,(state,action)=>{
        state.status="failed"
        state.error = action.payload.error || 'Something went wrong...'
      })
  },
});
export const { addServiceFromSocket, clearCache } = serviceSlice.actions;
export default serviceSlice.reducer;
