import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice'
import authReducer from './authSlice'
import  blogReducer from './blogSlice'

const store = configureStore({
    reducer:{
        service:serviceReducer,
        auth:authReducer,
        blog:blogReducer
    }
});

export default store;