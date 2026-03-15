import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks with mock data for now
export const fetchSuperAdminStats = createAsyncThunk(
  'superAdmin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      // Mock data for now - replace with actual API later
      const mockData = {
        totalClinics: 12,
        totalPatients: 4850,
        totalRevenue: 2450000,
        totalDoctors: 85,
        monthlyGrowth: {
          clinics: 8.5,
          patients: 12.3,
          revenue: 15.7,
          doctors: 6.2
        }
      };
      return mockData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllClinics = createAsyncThunk(
  'superAdmin/fetchClinics',
  async (_, { rejectWithValue }) => {
    try {
      // Mock data for now - replace with actual API later
      const mockClinics = [
        {
          id: 1,
          name: "City Medical Center",
          slug: "city-medical",
          email: "admin@citymedical.com",
          phone: "+91 22 2345 6789",
          address: "123 MG Road, Mumbai",
          patients: 1250,
          doctors_count: 25,
          total_revenue: 850000,
          status: "active",
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          name: "Apollo Healthcare",
          slug: "apollo-health",
          email: "admin@apollo.com",
          phone: "+91 11 9876 5432",
          address: "456 Nehru Place, Delhi",
          patients: 980,
          doctors_count: 18,
          total_revenue: 620000,
          status: "active",
          created_at: "2024-02-20T14:15:00Z"
        },
        {
          id: 3,
          name: "Fortis Clinic",
          slug: "fortis-clinic",
          email: "admin@fortis.com",
          phone: "+91 80 1234 5678",
          address: "789 Brigade Road, Bangalore",
          patients: 750,
          doctors_count: 15,
          total_revenue: 480000,
          status: "active",
          created_at: "2024-03-10T09:45:00Z"
        }
      ];
      return mockClinics;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createClinic = createAsyncThunk(
  'superAdmin/createClinic',
  async (clinicData, { rejectWithValue }) => {
    try {
      // Mock clinic creation - replace with actual API later
      const newClinic = {
        id: Date.now(),
        ...clinicData,
        patients: 0,
        doctors_count: 0,
        total_revenue: 0,
        status: "active",
        created_at: new Date().toISOString()
      };
      return newClinic;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateClinicStatus = createAsyncThunk(
  'superAdmin/updateClinicStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // Mock status update - replace with actual API later
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClinic = createAsyncThunk(
  'superAdmin/deleteClinic',
  async (clinicId, { rejectWithValue }) => {
    try {
      // Mock deletion - replace with actual API later
      return clinicId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDoctorToClinic = createAsyncThunk(
  'superAdmin/addDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      // Mock doctor addition - replace with actual API later
      return { ...doctorData, id: Date.now() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  globalStats: {
    totalClinics: 0,
    totalPatients: 0,
    totalRevenue: 0,
    totalDoctors: 0,
    monthlyGrowth: {
      clinics: 0,
      patients: 0,
      revenue: 0,
      doctors: 0
    }
  },
  clinics: [],
  systemHealth: {
    serverStatus: "healthy",
    uptime: "99.9%",
    responseTime: "120ms",
    errorRate: "0.1%",
    lastBackup: "2 hours ago"
  },
  recentActivities: [],
  loading: false,
  error: null
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    // Clinic Management (for optimistic updates)
    addClinicOptimistic: (state, action) => {
      const newClinic = {
        id: Date.now(),
        ...action.payload,
        patients: 0,
        doctors_count: 0,
        total_revenue: 0,
        status: "active"
      };
      state.clinics.unshift(newClinic);
      state.globalStats.totalClinics += 1;
    },
    
    updateClinicOptimistic: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.clinics.findIndex(clinic => clinic.id === id);
      if (index !== -1) {
        state.clinics[index] = { ...state.clinics[index], ...updates };
      }
    },
    
    deleteClinicOptimistic: (state, action) => {
      const clinicId = action.payload;
      state.clinics = state.clinics.filter(clinic => clinic.id !== clinicId);
      state.globalStats.totalClinics -= 1;
    },
    
    // Stats Updates
    updateGlobalStats: (state, action) => {
      state.globalStats = { ...state.globalStats, ...action.payload };
    },
    
    // System Health
    updateSystemHealth: (state, action) => {
      state.systemHealth = { ...state.systemHealth, ...action.payload };
    },
    
    // Activity Tracking
    addActivity: (state, action) => {
      const newActivity = {
        id: Date.now(),
        ...action.payload,
        timestamp: "Just now"
      };
      state.recentActivities.unshift(newActivity);
      // Keep only last 10 activities
      if (state.recentActivities.length > 10) {
        state.recentActivities = state.recentActivities.slice(0, 10);
      }
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchSuperAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.globalStats = action.payload;
        state.error = null;
      })
      .addCase(fetchSuperAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Clinics
      .addCase(fetchAllClinics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClinics.fulfilled, (state, action) => {
        state.loading = false;
        state.clinics = action.payload;
        state.error = null;
      })
      .addCase(fetchAllClinics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Clinic
      .addCase(createClinic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClinic.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new clinic to the list
        state.clinics.unshift({
          id: action.payload.clinicId,
          name: action.payload.name || 'New Clinic',
          slug: action.payload.slug || 'new-clinic',
          email: action.payload.adminEmail,
          phone: '',
          address: '',
          patients: 0,
          doctors_count: 0,
          total_revenue: 0,
          status: 'active',
          created_at: new Date().toISOString()
        });
        state.globalStats.totalClinics += 1;
        state.error = null;
      })
      .addCase(createClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Clinic Status
      .addCase(updateClinicStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const clinic = state.clinics.find(c => c.id === id);
        if (clinic) {
          clinic.status = status;
        }
      })
      
      // Delete Clinic
      .addCase(deleteClinic.fulfilled, (state, action) => {
        const clinicId = action.payload;
        state.clinics = state.clinics.filter(clinic => clinic.id !== clinicId);
        state.globalStats.totalClinics -= 1;
      })
      
      // Add Doctor
      .addCase(addDoctorToClinic.fulfilled, (state, action) => {
        // Update clinic doctor count
        const clinic = state.clinics.find(c => c.id === action.payload.clinic_id);
        if (clinic) {
          clinic.doctors_count += 1;
        }
      });
  }
});

export const {
  addClinicOptimistic,
  updateClinicOptimistic,
  deleteClinicOptimistic,
  updateGlobalStats,
  updateSystemHealth,
  addActivity,
  clearError
} = superAdminSlice.actions;

export default superAdminSlice.reducer;
