import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice'
import authReducer from './authSlice'
import  blogReducer from './blogSlice'
import bookingReducer from './bookingSlice'
const store = configureStore({
    reducer:{
        service:serviceReducer,
        auth:authReducer,
        blog:blogReducer,
        booking:bookingReducer
    }
});

export default store;