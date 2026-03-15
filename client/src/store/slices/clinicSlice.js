import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching current clinic
export const fetchCurrentClinic = createAsyncThunk(
  'clinic/fetchCurrentClinic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/clinics/current')
      
      if (!response.ok) {
        throw new Error('Failed to fetch clinic')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching all clinics (for super admin)
export const fetchAllClinics = createAsyncThunk(
  'clinic/fetchAllClinics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/clinics')
      
      if (!response.ok) {
        throw new Error('Failed to fetch clinics')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for creating clinic
export const createClinic = createAsyncThunk(
  'clinic/createClinic',
  async (clinicData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/clinics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clinicData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create clinic')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const clinicSlice = createSlice({
  name: 'clinic',
  initialState: {
    currentClinic: null,
    allClinics: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentClinic: (state, action) => {
      state.currentClinic = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch current clinic
      .addCase(fetchCurrentClinic.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentClinic.fulfilled, (state, action) => {
        state.loading = false
        state.currentClinic = action.payload.data
        state.error = null
      })
      .addCase(fetchCurrentClinic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch all clinics
      .addCase(fetchAllClinics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllClinics.fulfilled, (state, action) => {
        state.loading = false
        state.allClinics = action.payload.data
        state.error = null
      })
      .addCase(fetchAllClinics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create clinic
      .addCase(createClinic.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createClinic.fulfilled, (state, action) => {
        state.loading = false
        state.allClinics.push(action.payload.data)
        state.error = null
      })
      .addCase(createClinic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setCurrentClinic } = clinicSlice.actions
export default clinicSlice.reducer
