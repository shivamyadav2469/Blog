// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initial state for user, can be null or a user object if authenticated
  token: null, // Optional: if you want to manage authentication tokens
  status: 'idle', // Optional: can be 'idle', 'loading', 'succeeded', 'failed'
  error: null, // Optional: to store any errors related to authentication
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // If you're managing tokens
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { loginSuccess, logout, loginFailure, setStatus } = authSlice.actions;
export default authSlice.reducer;
