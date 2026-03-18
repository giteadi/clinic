import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async ({ clinicId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/admin/dashboard?clinicId=${clinicId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching patients
export const fetchPatients = createAsyncThunk(
  'admin/fetchPatients',
  async ({ clinicId, token, search = '', page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        clinicId,
        page,
        limit,
      });
      if (search) params.append('search', search);

      const response = await fetch(`/api/admin/patients?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching appointments
export const fetchAppointments = createAsyncThunk(
  'admin/fetchAppointments',
  async (
    { clinicId, token, status = 'all', doctorId = null, page = 1, limit = 10 },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        clinicId,
        page,
        limit,
      });
      if (status !== 'all') params.append('status', status);
      if (doctorId) params.append('doctorId', doctorId);

      const response = await fetch(`/api/admin/appointments?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating appointment status
export const updateAppointmentStatus = createAsyncThunk(
  'admin/updateAppointmentStatus',
  async ({ appointmentId, status, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting appointment
export const deleteAppointment = createAsyncThunk(
  'admin/deleteAppointment',
  async ({ appointmentId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      return { appointmentId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching clinic settings
export const fetchClinicSettings = createAsyncThunk(
  'admin/fetchClinicSettings',
  async ({ clinicId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/clinic-settings?clinicId=${clinicId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clinic settings');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating clinic settings
export const updateClinicSettings = createAsyncThunk(
  'admin/updateClinicSettings',
  async ({ clinicId, settings, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/clinic-settings/${clinicId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to update clinic settings');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching doctors
export const fetchDoctors = createAsyncThunk(
  'admin/fetchDoctors',
  async ({ clinicId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/doctors?clinicId=${clinicId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating doctor
export const createDoctor = createAsyncThunk(
  'admin/createDoctor',
  async ({ clinicId, doctorData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/doctors?clinicId=${clinicId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error('Failed to create doctor');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating doctor
export const updateDoctor = createAsyncThunk(
  'admin/updateDoctor',
  async ({ doctorId, doctorData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting doctor
export const deleteDoctor = createAsyncThunk(
  'admin/deleteDoctor',
  async ({ doctorId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }

      return { doctorId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: {
    totalPatients: 0,
    totalAppointments: 0,
    confirmedAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
    averageFee: 0,
    totalDoctors: 0,
    recentAppointments: [],
  },
  patients: [],
  appointments: [],
  doctors: [],
  settings: null,
  loading: false,
  error: null,
  success: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetAdmin: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Dashboard Stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Patients
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data || [];
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
        state.error = null;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Appointments
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.data || [];
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
        state.error = null;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Appointment Status
    builder
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (apt) => apt.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.success = 'Appointment updated successfully';
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Appointment
    builder
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (apt) => apt.id !== action.payload.appointmentId
        );
        state.success = 'Appointment cancelled successfully';
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Clinic Settings
    builder
      .addCase(fetchClinicSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(fetchClinicSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Clinic Settings
    builder
      .addCase(updateClinicSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClinicSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.success = 'Settings updated successfully';
      })
      .addCase(updateClinicSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Doctors
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        state.error = null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Doctor
    builder
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.push(action.payload);
        state.success = 'Doctor created successfully';
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Doctor
    builder
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
        state.success = 'Doctor updated successfully';
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Doctor
    builder
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(
          (doc) => doc.id !== action.payload.doctorId
        );
        state.success = 'Doctor deleted successfully';
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
