import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actions: [
    {
      id: 1,
      label: "Schedule Appointment",
      icon: "Calendar",
      color: "#14B8A6",
      route: "schedule-appointment",
      description: "Create and manage patient appointments",
      enabled: true
    },
    {
      id: 2,
      label: "Manage Patients",
      icon: "Users",
      color: "#F59E0B",
      route: "manage-patients",
      description: "View and manage patient records",
      enabled: true
    },
    {
      id: 3,
      label: "View Reports",
      icon: "Activity",
      color: "#9C27B0",
      route: "view-reports",
      description: "Access clinic reports and analytics",
      enabled: true
    },
    {
      id: 4,
      label: "Clinic Settings",
      icon: "Settings",
      color: "#64748B",
      route: "clinic-settings",
      description: "Configure clinic preferences and settings",
      enabled: true
    }
  ],
  loading: false,
  error: null
};

const quickActionsSlice = createSlice({
  name: 'quickActions',
  initialState,
  reducers: {
    toggleAction: (state, action) => {
      const actionId = action.payload;
      const actionItem = state.actions.find(a => a.id === actionId);
      if (actionItem) {
        actionItem.enabled = !actionItem.enabled;
      }
    },
    updateAction: (state, action) => {
      const { id, updates } = action.payload;
      const actionIndex = state.actions.findIndex(a => a.id === id);
      if (actionIndex !== -1) {
        state.actions[actionIndex] = { ...state.actions[actionIndex], ...updates };
      }
    },
    addAction: (state, action) => {
      const newAction = {
        id: Date.now(),
        enabled: true,
        ...action.payload
      };
      state.actions.push(newAction);
    },
    removeAction: (state, action) => {
      const actionId = action.payload;
      state.actions = state.actions.filter(a => a.id !== actionId);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  toggleAction,
  updateAction,
  addAction,
  removeAction,
  setLoading,
  setError,
  clearError
} = quickActionsSlice.actions;

export default quickActionsSlice.reducer;
