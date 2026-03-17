import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage'

// Import slices
import authSlice from './slices/authSlice'
import clinicSlice from './slices/clinicSlice'
import doctorSlice from './slices/doctorSlice'
import appointmentSlice from './slices/appointmentSlice'
import superAdminSlice from './slices/superAdminSlice'
import quickActionsSlice from './quickActionsSlice'

// Root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  clinic: clinicSlice,
  doctors: doctorSlice,
  appointments: appointmentSlice,
  superAdmin: superAdminSlice,
  quickActions: quickActionsSlice,
})

// Load persisted state
const preloadedState = undefined; // Temporarily disable localStorage to fix login issue

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

// Save state to localStorage on changes
store.subscribe(() => {
  saveState(store.getState());
});

// Export persistor as null for compatibility
export const persistor = null
