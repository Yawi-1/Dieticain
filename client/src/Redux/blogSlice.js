import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dieticain.onrender.com/api/blog";

export const fetchBlogs = createAsyncThunk(
  "blog/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
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
      const response = await axios.post(`${API_URL}`, formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Get a single blog
export const singleBlog = createAsyncThunk('blog/fetchOne', async(id, {rejectWithValue}) => {
  try {
     const response = await axios.get(`${API_URL}/${id}`);
     return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
})



const blogSlice = createSlice({
  name: "blogs",
  initialState: { singleBlog:{}, blogs: [], status: "idle", error: null },
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
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id
        );
        state.status = "success";
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      .addCase(singleBlog.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(singleBlog.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
        state.status = "success";     
      })
      .addCase(singleBlog.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
  },
});

export default blogSlice.reducer;
