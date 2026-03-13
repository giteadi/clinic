import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import clinicSlice from './clinicSlice';
import superAdminSlice from './superAdminSlice';
import quickActionsSlice from './quickActionsSlice';

// Create custom storage using localStorage directly
const createLocalStorageStorage = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    return {
      getItem(_key) {
        return Promise.resolve(null);
      },
      setItem(_key, value) {
        return Promise.resolve(value);
      },
      removeItem(_key) {
        return Promise.resolve();
      },
    };
  }
  
  return {
    getItem(key) {
      try {
        const value = localStorage.getItem(key);
        return Promise.resolve(value);
      } catch (error) {
        console.warn('Error getting item from localStorage:', error);
        return Promise.resolve(null);
      }
    },
    setItem(key, value) {
      try {
        localStorage.setItem(key, value);
        return Promise.resolve(value);
      } catch (error) {
        console.warn('Error setting item to localStorage:', error);
        return Promise.resolve(value);
      }
    },
    removeItem(key) {
      try {
        localStorage.removeItem(key);
        return Promise.resolve();
      } catch (error) {
        console.warn('Error removing item from localStorage:', error);
        return Promise.resolve();
      }
    },
  };
};

// Simple persist configuration
const persistConfig = {
  key: 'root',
  storage: createLocalStorageStorage(),
  version: 1
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  clinic: clinicSlice,
  superAdmin: superAdminSlice,
  quickActions: quickActionsSlice
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

// Create persistor
export const persistor = persistStore(store);

export default store;
