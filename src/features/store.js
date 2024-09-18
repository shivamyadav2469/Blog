import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginSuccess'],
        ignoredActionPaths: ['payload.user'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;
