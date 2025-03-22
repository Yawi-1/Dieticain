import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchService = createAsyncThunk(
  "service/fetchService",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/service`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addService = createAsyncThunk(
  "fservice/addService",
  async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/service`, formData);
      return response.data.data;
    } catch (error) {
      console.log(error)
      throw error.response?.data || error.message;
    }
  }
);

export const bookService = createAsyncThunk(
  "fservice/bookService",
  async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/service/book`,data,{
        headers: {
          'Content-Type': 'application/json',
          },
      });
      console.log('Backend response :',response)
      return response.data.data;
    } catch (error) {
      console.log(error)
    }
  }
)

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state, action) => {
        state.status === "loading";
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.services = [...action.payload];
        state.status = "success";
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(addService.pending, (state, action) => {
        state.status === "loading";
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services = state.services.push(action.payload);
        state.status = "success";
      })
      .addCase(addService.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(bookService.pending, (state, action) => {
        state.status === "loading";
      })
      .addCase(bookService.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(bookService.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
  },
});

export default serviceSlice.reducer;
