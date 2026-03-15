import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { loginUser, registerUser, loginClinicAdmin, logout } from './slices/authSlice'
import { fetchDoctors, fetchDoctorSchedule, fetchAvailableSlots, addDoctor } from './slices/doctorSlice'
import { bookAppointment, fetchUserAppointments, fetchClinicAppointments, updateAppointmentStatus } from './slices/appointmentSlice'
import { fetchCurrentClinic, fetchAllClinics, createClinic } from './slices/clinicSlice'
import { 
  fetchSuperAdminStats, 
  fetchAllClinics as fetchAllClinicsSA, 
  createClinic as createClinicSA, 
  updateClinicStatus, 
  deleteClinic as deleteClinicSA, 
  addDoctorToClinic 
} from './slices/superAdminSlice'

// Custom hooks for common operations
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  
  const login = (credentials) => {
    dispatch(loginUser(credentials))
  }
  
  const register = (userData) => {
    dispatch(registerUser(userData))
  }
  
  const adminLogin = (credentials) => {
    dispatch(loginClinicAdmin(credentials))
  }
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  return {
    ...auth,
    login,
    register,
    adminLogin,
    logout: handleLogout,
  }
}

export const useDoctors = () => {
  const dispatch = useAppDispatch()
  const doctors = useAppSelector(state => state.doctors)
  
  const fetchDoctorsData = () => {
    dispatch(fetchDoctors())
  }
  
  const fetchSchedule = (doctorId) => {
    dispatch(fetchDoctorSchedule(doctorId))
  }
  
  const fetchSlots = (doctorId, date) => {
    dispatch(fetchAvailableSlots({ doctorId, date }))
  }
  
  const addNewDoctor = (doctorData) => {
    dispatch(addDoctor(doctorData))
  }
  
  return {
    ...doctors,
    fetchDoctors: fetchDoctorsData,
    fetchSchedule,
    fetchSlots,
    addDoctor: addNewDoctor,
  }
}

export const useAppointments = () => {
  const dispatch = useAppDispatch()
  const appointments = useAppSelector(state => state.appointments)
  const auth = useAppSelector(state => state.auth)
  
  const bookAppointment = (appointmentData) => {
    dispatch(bookAppointment({ ...appointmentData, token: auth.token }))
  }
  
  const fetchUserAppointmentsData = () => {
    dispatch(fetchUserAppointments(auth.token))
  }
  
  const fetchClinicAppointmentsData = (date) => {
    dispatch(fetchClinicAppointments({ date }))
  }
  
  const updateStatus = (appointmentId, status) => {
    dispatch(updateAppointmentStatus({ appointmentId, status }))
  }
  
  return {
    ...appointments,
    bookAppointment,
    fetchUserAppointments: fetchUserAppointmentsData,
    fetchClinicAppointments: fetchClinicAppointmentsData,
    updateStatus,
  }
}

export const useClinic = () => {
  const dispatch = useAppDispatch()
  const clinic = useAppSelector(state => state.clinic)
  
  const fetchCurrentClinicData = () => {
    dispatch(fetchCurrentClinic())
  }
  
  const fetchAllClinicsData = () => {
    dispatch(fetchAllClinics())
  }
  
  const createNewClinic = (clinicData) => {
    dispatch(createClinic(clinicData))
  }
  
  return {
    ...clinic,
    fetchCurrentClinic: fetchCurrentClinicData,
    fetchAllClinics: fetchAllClinicsData,
    createClinic: createNewClinic,
  }
}

export const useSuperAdmin = () => {
  const dispatch = useAppDispatch()
  const superAdmin = useAppSelector(state => state.superAdmin)
  
  const fetchStats = useCallback(() => {
    dispatch(fetchSuperAdminStats())
  }, [dispatch])
  
  const fetchClinics = useCallback(() => {
    dispatch(fetchAllClinicsSA())
  }, [dispatch])
  
  const addNewClinic = (clinicData) => {
    dispatch(createClinicSA(clinicData))
  }
  
  const toggleClinicStatus = (clinicId, status) => {
    dispatch(updateClinicStatus({ id: clinicId, status }))
  }
  
  const removeClinic = (clinicId) => {
    dispatch(deleteClinicSA(clinicId))
  }
  
  const addDoctor = (doctorData) => {
    dispatch(addDoctorToClinic(doctorData))
  }
  
  return {
    ...superAdmin,
    fetchStats,
    fetchClinics,
    addClinic: addNewClinic,
    updateClinicStatus: toggleClinicStatus,
    deleteClinic: removeClinic,
    addDoctor,
  }
}
