import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice'
const store = configureStore({
    reducer:{
        service:serviceReducer,
    }
});

export default store;