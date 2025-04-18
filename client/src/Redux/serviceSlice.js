// Redux: serviceSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

// Fetch services
export const fetchService = createAsyncThunk("service/fetchService", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/service`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Add a new service
export const addService = createAsyncThunk("service/addService", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/service`, formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Book a service 
export const bookService = createAsyncThunk("service/bookService", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/booking`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


// Dleete a service

export const deleteService = createAsyncThunk('service/delete',async(id,{ rejectWithValue })=>{
  try {
    const response = await axios.delete(`${API_URL}/api/service/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
})

const serviceSlice = createSlice({
  name: "services",
  initialState: { services: [], status: "idle", error: null },
  reducers: {
    addServiceFromSocket: (state, action) => {
      state.services.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => { state.status = "loading"; })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = "success";
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
export const { addServiceFromSocket } = serviceSlice.actions;
export default serviceSlice.reducer;
