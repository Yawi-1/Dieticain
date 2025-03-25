import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice'
import authReducer from './authSlice'
const store = configureStore({
    reducer:{
        service:serviceReducer,
        auth:authReducer
    }
});

export default store;