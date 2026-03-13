import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import clinicSlice from './clinicSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    clinic: clinicSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export default store;
