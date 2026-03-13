import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clinics: [
    {
      id: 1,
      name: "City Medical Center",
      address: "123 Main St, City",
      phone: "+91 98765 43210",
      email: "info@citymedical.com",
      rating: 4.8,
      doctors: [
        { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", rating: 4.8, experience: "10+ years", patients: 2500, available: true },
        { id: 4, name: "Dr. James Wilson", specialty: "Orthopedic", rating: 4.8, experience: "12+ years", patients: 2100, available: true }
      ],
      services: ["General Medicine", "Orthopedics", "Emergency Care"],
      timings: "24/7 Emergency, 8AM-8PM OPD",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400"
    },
    {
      id: 2,
      name: "Heart Care Clinic",
      address: "456 Oak Ave, City",
      phone: "+91 98765 43211",
      email: "info@heartcare.com",
      rating: 4.9,
      doctors: [
        { id: 2, name: "Dr. Michael Chen", specialty: "Cardiologist", rating: 4.9, experience: "15+ years", patients: 3200, available: true }
      ],
      services: ["Cardiology", "ECG", "Echo Test", "Stress Test"],
      timings: "9AM-6PM Mon-Sat",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"
    },
    {
      id: 3,
      name: "Children's Hospital",
      address: "789 Pine Rd, City",
      phone: "+91 98765 43212",
      email: "info@childshospital.com",
      rating: 4.7,
      doctors: [
        { id: 3, name: "Dr. Emily Davis", specialty: "Pediatrician", rating: 4.7, experience: "8+ years", patients: 1800, available: false }
      ],
      services: ["Pediatrics", "Vaccination", "Child Development"],
      timings: "8AM-8PM Daily",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400"
    },
    {
      id: 4,
      name: "Bone & Joint Center",
      address: "321 Elm St, City",
      phone: "+91 98765 43213",
      email: "info@bonejoint.com",
      rating: 4.8,
      doctors: [
        { id: 4, name: "Dr. James Wilson", specialty: "Orthopedic", rating: 4.8, experience: "12+ years", patients: 2100, available: true }
      ],
      services: ["Orthopedics", "Joint Replacement", "Sports Medicine"],
      timings: "9AM-7PM Mon-Sat",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400"
    },
    {
      id: 5,
      name: "Skin Care Clinic",
      address: "654 Maple Dr, City",
      phone: "+91 98765 43214",
      email: "info@skincare.com",
      rating: 4.6,
      doctors: [
        { id: 5, name: "Dr. Lisa Anderson", specialty: "Dermatologist", rating: 4.6, experience: "6+ years", patients: 1500, available: true }
      ],
      services: ["Dermatology", "Cosmetic Procedures", "Skin Treatment"],
      timings: "10AM-6PM Mon-Sat",
      image: "https://images.unsplash.com/photo-1579684385121-8b0df5d6b7b4?w=400"
    },
    {
      id: 6,
      name: "Neuro Care Center",
      address: "987 Cedar Ln, City",
      phone: "+91 98765 43215",
      email: "info@neurocare.com",
      rating: 4.9,
      doctors: [
        { id: 6, name: "Dr. Robert Taylor", specialty: "Neurologist", rating: 4.9, experience: "20+ years", patients: 4000, available: false }
      ],
      services: ["Neurology", "EEG", "Brain Imaging"],
      timings: "9AM-5PM Mon-Fri",
      image: "https://images.unsplash.com/photo-1587854692152-cbb638b2f6c0?w=400"
    }
  ],
  selectedClinic: null,
  loading: false,
  error: null
};

const clinicSlice = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    setSelectedClinic: (state, action) => {
      state.selectedClinic = action.payload;
    },
    clearSelectedClinic: (state) => {
      state.selectedClinic = null;
    },
    updateClinic: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.clinics.findIndex(clinic => clinic.id === id);
      if (index !== -1) {
        state.clinics[index] = { ...state.clinics[index], ...updates };
      }
    },
    addDoctorToClinic: (state, action) => {
      const { clinicId, doctor } = action.payload;
      const clinic = state.clinics.find(c => c.id === clinicId);
      if (clinic) {
        clinic.doctors.push(doctor);
      }
    },
    removeDoctorFromClinic: (state, action) => {
      const { clinicId, doctorId } = action.payload;
      const clinic = state.clinics.find(c => c.id === clinicId);
      if (clinic) {
        clinic.doctors = clinic.doctors.filter(d => d.id !== doctorId);
      }
    }
  }
});

export const {
  setSelectedClinic,
  clearSelectedClinic,
  updateClinic,
  addDoctorToClinic,
  removeDoctorFromClinic
} = clinicSlice.actions;

export default clinicSlice.reducer;
