import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dieticain.onrender.com/api/blog";

export const fetchBlogs = createAsyncThunk(
  "blog/fetch",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { blogs, lastFetched } = state.blog;
      
      // Check if we have cached data and it's less than 5 minutes old
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      if (blogs.length > 0 && lastFetched && (now - lastFetched) < fiveMinutes) {
        // Return cached data if it's fresh
        return blogs;
      }
      
      const response = await axios.get(`${API_URL}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addBlog = createAsyncThunk(
  "blog/add",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}`, blogData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${blogId}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const singleBlog = createAsyncThunk(
  "blog/single",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${blogId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "blog/comment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${commentData.blogId}/comment`,
        commentData,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: { 
    singleBlog: {}, 
    blogs: [], 
    status: "idle", 
    error: null,
    lastFetched: null 
  },
  reducers: {
    clearCache: (state) => {
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = "success";
        state.lastFetched = Date.now();
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
      .addCase(addComment.pending,(state,action)=>{
             state.status = 'loading'
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "success";
        // Update the blog with new comment
        const blogIndex = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = action.payload;
        }
        if (state.singleBlog._id === action.payload._id) {
          state.singleBlog = action.payload;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCache } = blogSlice.actions;
export default blogSlice.reducer;
