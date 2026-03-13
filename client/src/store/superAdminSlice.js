import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalStats: {
    totalClinics: 156,
    totalPatients: 45200,
    totalRevenue: 84000000, // in rupees
    activeDoctors: 1248,
    monthlyGrowth: {
      clinics: 8,
      patients: 12,
      revenue: 18,
      doctors: 15
    }
  },
  clinics: [
    { id: 1, name: "City Medical Center", city: "Mumbai", state: "Maharashtra", patients: 2456, revenue: 1240000, status: "active", rating: 4.8, doctors: 12, established: "2018" },
    { id: 2, name: "Heart Care Clinic", city: "Delhi", state: "Delhi", patients: 1823, revenue: 820000, status: "active", rating: 4.9, doctors: 8, established: "2019" },
    { id: 3, name: "Children's Hospital", city: "Bangalore", state: "Karnataka", patients: 1567, revenue: 680000, status: "active", rating: 4.7, doctors: 15, established: "2017" },
    { id: 4, name: "Bone & Joint Center", city: "Chennai", state: "Tamil Nadu", patients: 987, revenue: 420000, status: "maintenance", rating: 4.6, doctors: 6, established: "2020" },
    { id: 5, name: "Skin Care Clinic", city: "Kolkata", state: "West Bengal", patients: 1234, revenue: 560000, status: "active", rating: 4.5, doctors: 4, established: "2021" },
    { id: 6, name: "Neuro Care Center", city: "Hyderabad", state: "Telangana", patients: 876, revenue: 780000, status: "active", rating: 4.9, doctors: 10, established: "2018" }
  ],
  systemHealth: {
    serverStatus: "healthy",
    uptime: "99.9%",
    responseTime: "120ms",
    errorRate: "0.1%",
    lastBackup: "2 hours ago"
  },
  recentActivities: [
    { id: 1, type: "clinic_added", clinic: "New Life Clinic", city: "Pune", timestamp: "2 hours ago", admin: "Dr. Rajesh" },
    { id: 2, type: "system_update", version: "v2.4.1", timestamp: "4 hours ago", status: "success" },
    { id: 3, type: "user_registered", role: "admin", clinic: "City Medical Center", timestamp: "6 hours ago" },
    { id: 4, type: "revenue_milestone", amount: "₹1Cr", period: "Monthly", timestamp: "1 day ago" }
  ],
  loading: false,
  error: null
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    // Clinic Management
    addClinic: (state, action) => {
      const newClinic = {
        id: Date.now(),
        ...action.payload,
        patients: 0,
        revenue: 0,
        status: "pending"
      };
      state.clinics.push(newClinic);
      state.globalStats.totalClinics += 1;
    },
    
    updateClinic: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.clinics.findIndex(clinic => clinic.id === id);
      if (index !== -1) {
        state.clinics[index] = { ...state.clinics[index], ...updates };
      }
    },
    
    deleteClinic: (state, action) => {
      const clinicId = action.payload;
      state.clinics = state.clinics.filter(clinic => clinic.id !== clinicId);
      state.globalStats.totalClinics -= 1;
    },
    
    toggleClinicStatus: (state, action) => {
      const clinicId = action.payload;
      const clinic = state.clinics.find(c => c.id === clinicId);
      if (clinic) {
        clinic.status = clinic.status === "active" ? "maintenance" : "active";
      }
    },
    
    // Stats Updates
    updateGlobalStats: (state, action) => {
      state.globalStats = { ...state.globalStats, ...action.payload };
    },
    
    incrementPatients: (state, action) => {
      const amount = action.payload || 1;
      state.globalStats.totalPatients += amount;
    },
    
    addRevenue: (state, action) => {
      const amount = action.payload;
      state.globalStats.totalRevenue += amount;
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
    
    // Bulk Operations
    bulkUpdateClinics: (state, action) => {
      const { clinicIds, updates } = action.payload;
      state.clinics.forEach(clinic => {
        if (clinicIds.includes(clinic.id)) {
          Object.assign(clinic, updates);
        }
      });
    },
    
    // Analytics
    getTopPerformingClinics: (state) => {
      return [...state.clinics]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    },
    
    getClinicsByStatus: (state) => {
      const statusCounts = {};
      state.clinics.forEach(clinic => {
        statusCounts[clinic.status] = (statusCounts[clinic.status] || 0) + 1;
      });
      return statusCounts;
    }
  }
});

export const {
  addClinic,
  updateClinic,
  deleteClinic,
  toggleClinicStatus,
  updateGlobalStats,
  incrementPatients,
  addRevenue,
  updateSystemHealth,
  addActivity,
  bulkUpdateClinics
} = superAdminSlice.actions;

export default superAdminSlice.reducer;
