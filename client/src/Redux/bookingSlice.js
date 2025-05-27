import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from 'axios'
export const fetchBookings = createAsyncThunk(
  "booking/fetchBooking",
  async () => {
    try {
      const response = await axios.get("https://dieticain.onrender.com//api/bookings");
      return response.data.data;
    } catch (error) {
      console.log('Error fetching bookings :  ',error);
    }
  }
);

const bookingSlice = createSlice({
  name: "Booking",
  initialState: {
    bookings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.payload?.message || "Error fetching bookings";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "success";
        state.bookings = action.payload;
      });
  },
});


export default bookingSlice.reducer;