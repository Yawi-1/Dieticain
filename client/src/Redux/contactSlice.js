import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'http://localhost:8000'
export const createContact = createAsyncThunk('contact/add', async (data)=>{
  try {
      const res = await axios.post(`${API_URL}/api/contact`,data);
      console.log('Backend response :',res.data.data)
      return res.data.data;
  } catch (error) {
      console.log('Error creating contact : ',error)
  }
});

export const getContacts = createAsyncThunk('contact/get',async ()=>{
    try {
        const res = await axios.get(`${API_URL}/api/contact`);
        console.log('Get Contacts response : ',res.data.data)
        return res.data.data
    } catch (error) {
        console.log('Error at fetching contacts',error)
    }
})
        

const contactSlice = {
    name:'Contact',
    initialState:{
        contacts:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getContacts.pending,(state,action)=>{
            state.status = 'pending';
        })
        .addCase(getContacts.fulfilled,(state,action)=>{
            state.status = 'success';
            state.contacts = action.payload;
        })
        .addCase(getContacts.failed,(state,action)=>{
            state.status = 'failed';
            state.error = action.payload?.error || 'Something went wrong';
        })
    }
}

export default contactSlice.reducer;