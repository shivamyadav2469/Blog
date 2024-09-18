// store.js
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
// Import authReducer if you have an auth slice
import authReducer from './authSlice'; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer, // Add auth slice if needed
  },
});

export default store;
