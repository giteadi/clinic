import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for booking appointment
export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${appointmentData.token}`,
        },
        body: JSON.stringify(appointmentData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to book appointment')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching user appointments
export const fetchUserAppointments = createAsyncThunk(
  'appointments/fetchUserAppointments',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/appointments/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching clinic appointments
export const fetchClinicAppointments = createAsyncThunk(
  'appointments/fetchClinicAppointments',
  async ({ date }, { rejectWithValue }) => {
    try {
      const url = date ? `/api/appointments/clinic?date=${date}` : '/api/appointments/clinic'
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch clinic appointments')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for updating appointment status
export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateAppointmentStatus',
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update appointment')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    userAppointments: [],
    clinicAppointments: [],
    loading: false,
    error: null,
    bookingLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearBookingError: (state) => {
      state.bookingLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Book appointment
      .addCase(bookAppointment.pending, (state) => {
        state.bookingLoading = true
        state.error = null
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.bookingLoading = false
        state.userAppointments.push(action.payload.data)
        state.error = null
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.bookingLoading = false
        state.error = action.payload
      })
      // Fetch user appointments
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.loading = false
        state.userAppointments = action.payload.data
        state.error = null
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch clinic appointments
      .addCase(fetchClinicAppointments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClinicAppointments.fulfilled, (state, action) => {
        state.loading = false
        state.clinicAppointments = action.payload.data
        state.error = null
      })
      .addCase(fetchClinicAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update appointment status
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false
        const { appointmentId, status } = action.meta.arg
        
        // Update in user appointments
        const userIndex = state.userAppointments.findIndex(a => a.id === appointmentId)
        if (userIndex !== -1) {
          state.userAppointments[userIndex].status = status
        }
        
        // Update in clinic appointments
        const clinicIndex = state.clinicAppointments.findIndex(a => a.id === appointmentId)
        if (clinicIndex !== -1) {
          state.clinicAppointments[clinicIndex].status = status
        }
        
        state.error = null
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearBookingError } = appointmentSlice.actions
export default appointmentSlice.reducer
