import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist configuration
export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'clinic', 'superAdmin'], // Only persist these slices
  blacklist: [], // Nothing to blacklist
  timeout: null, // no timeout
  debug: process.env.NODE_ENV === 'development'
};

// Create persist reducer
export const createPersistedReducer = (reducer, key) => {
  return persistReducer({
    ...persistConfig,
    key: key || persistConfig.key
  }, reducer);
};

// Create persist store
export const createPersistedStore = (store) => {
  return persistStore(store, null, () => {
    // Optional: Callback after rehydration is complete
    console.log('Redux Persist rehydration complete');
  });
};
