import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching doctors
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/doctors')
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching doctor schedule
export const fetchDoctorSchedule = createAsyncThunk(
  'doctors/fetchDoctorSchedule',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/doctors/${doctorId}/schedule`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctor schedule')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching available slots
export const fetchAvailableSlots = createAsyncThunk(
  'doctors/fetchAvailableSlots',
  async ({ doctorId, date }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/doctors/${doctorId}/available-slots?date=${date}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch available slots')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for adding doctor
export const addDoctor = createAsyncThunk(
  'doctors/addDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add doctor')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    schedules: {},
    availableSlots: {},
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateDoctorAvailability: (state, action) => {
      const { doctorId, available } = action.payload
      const doctor = state.doctors.find(d => d.id === doctorId)
      if (doctor) {
        doctor.available = available
      }
    },
    setDoctors: (state, action) => {
      state.doctors = action.payload
      state.lastFetched = Date.now()
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false
        // Transform backend data to match frontend structure
        const transformedDoctors = action.payload.data.map(doctor => ({
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialization || 'General Physician',
          clinic: 'Current Clinic',
          rating: 4.5 + Math.random() * 0.5,
          experience: doctor.experience || '5+ years',
          patients: Math.floor(1000 + Math.random() * 4000),
          available: Math.random() > 0.3,
          fee: parseFloat(doctor.fee) || 500
        }))
        state.doctors = transformedDoctors
        state.lastFetched = Date.now()
        state.error = null
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch doctor schedule
      .addCase(fetchDoctorSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false
        state.schedules[action.meta.arg] = action.payload.data
        state.error = null
      })
      .addCase(fetchDoctorSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch available slots
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false
        const { doctorId } = action.meta.arg
        state.availableSlots[`${doctorId}-${action.meta.arg.date}`] = action.payload.data
        state.error = null
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add doctor
      .addCase(addDoctor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false
        const newDoctor = {
          ...action.payload.data,
          specialty: action.payload.data.specialization || 'General Physician',
          rating: 4.5 + Math.random() * 0.5,
          patients: Math.floor(1000 + Math.random() * 4000),
          available: true,
        }
        state.doctors.push(newDoctor)
        state.error = null
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, updateDoctorAvailability, setDoctors } = doctorSlice.actions
export default doctorSlice.reducer
