import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8000';

export const createContact = createAsyncThunk('contact/add', async (data) => {
  try {
    const res = await axios.post(`${API_URL}/api/contact`, data);
    console.log('Backend response:', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log('Error creating contact:', error);
    throw error; 
  }
});

export const getContacts = createAsyncThunk('contact/get', async () => {
  try {
    const res = await axios.get(`${API_URL}/api/contact`);
    return res.data.data;
  } catch (error) {
    console.log('Error at fetching contacts', error);
    throw error;
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error?.message || 'Something went wrong';
      })
      .addCase(createContact.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error?.message || 'Something went wrong';
      })
  }
});
 
export default contactSlice.reducer;
