// Simple localStorage persistence for Redux
// This avoids the redux-persist library issues

const STORAGE_KEY = 'clinic_redux_state';

// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    console.log('📦 Loading state from localStorage:', parsedState);
    return parsedState;
  } catch (error) {
    console.warn('Error loading state from localStorage:', error);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    // Only persist auth and clinic data
    const stateToPersist = {
      auth: state.auth,
      clinic: state.clinic,
    };
    const serializedState = JSON.stringify(stateToPersist);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.warn('Error saving state to localStorage:', error);
  }
};

// Clear persisted state
export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Error clearing state from localStorage:', error);
  }
};
