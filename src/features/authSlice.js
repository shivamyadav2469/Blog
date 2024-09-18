import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (e) {
    console.error('Failed to load user from localStorage:', e);
    return null;
  }
};

const saveUserToLocalStorage = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user to localStorage:', e);
  }
};

const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.error('Failed to remove user from localStorage:', e);
  }
};

const extractUserData = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || null,
  photoURL: user.photoURL || null,
});

const initialState = {
  user: loadUserFromLocalStorage(), 
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = extractUserData(user); 
      state.token = token;
      state.status = 'succeeded';
      state.error = null;
      saveUserToLocalStorage(state.user); 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      removeUserFromLocalStorage(); 
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
