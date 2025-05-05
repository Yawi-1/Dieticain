import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice'
import authReducer from './authSlice'
import  blogReducer from './blogSlice'
import bookingReducer from './bookingSlice'
import contactReducer from './contactSlice'
const store = configureStore({
    reducer:{
        service:serviceReducer,
        auth:authReducer,
        blog:blogReducer,
        booking:bookingReducer,
        contact:contactReducer
    }
});

export default store;