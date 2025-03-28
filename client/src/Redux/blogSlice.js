import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchBlogs = createAsyncThunk(
  "blog/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/blog`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a new BLog
export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/blog`, formData);
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = "success";
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(addBlog.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.status = "success";
      })
      .addCase(addBlog.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      });
  },
});

export default blogSlice.reducer;
