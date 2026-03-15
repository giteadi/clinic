import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useDoctors, useAppointments } from '../store/hooks';
import { THEMES } from '../contexts/ThemeContext';

export default function ReduxDemo() {
  const { theme, colors } = useTheme();
  
  // Redux hooks
  const auth = useAuth();
  const doctors = useDoctors();
  const appointments = useAppointments();
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [appointmentForm, setAppointmentForm] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: ''
  });

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(loginForm);
  };

  // Handle appointment booking
  const handleBookAppointment = (e) => {
    e.preventDefault();
    appointments.bookAppointment(appointmentForm);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === THEMES.WHITE ? '#F8F9FA' : colors.navy,
      padding: '20px',
      color: theme === THEMES.WHITE ? colors.slate : colors.white
    }}>
      <h1>Redux Toolkit Integration Demo</h1>
      
      {/* Auth Section */}
      <div style={{
        background: theme === THEMES.WHITE ? '#FFFFFF' : `${colors.navy}F0`,
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h2>Authentication State</h2>
        <p>Is Authenticated: {auth.isAuthenticated ? 'Yes' : 'No'}</p>
        {auth.user && <p>User: {auth.user.name}</p>}
        {auth.admin && <p>Admin: {auth.admin.name}</p>}
        {auth.loading && <p>Loading...</p>}
        {auth.error && <p style={{ color: 'red' }}>Error: {auth.error}</p>}
        
        <form onSubmit={handleLogin} style={{ marginTop: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button type="submit" style={{
            padding: '8px 16px',
            background: colors.teal,
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>
            Login
          </button>
        </form>
        
        <button 
          onClick={auth.logout}
          style={{
            padding: '8px 16px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '10px'
          }}
        >
          Logout
        </button>
      </div>

      {/* Doctors Section */}
      <div style={{
        background: theme === THEMES.WHITE ? '#FFFFFF' : `${colors.navy}F0`,
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h2>Doctors State</h2>
        <p>Doctors Count: {doctors.doctors.length}</p>
        <p>Loading: {doctors.loading ? 'Yes' : 'No'}</p>
        {doctors.error && <p style={{ color: 'red' }}>Error: {doctors.error}</p>}
        
        <button 
          onClick={doctors.fetchDoctors}
          style={{
            padding: '8px 16px',
            background: colors.teal,
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Fetch Doctors
        </button>
        
        {doctors.doctors.slice(0, 3).map(doctor => (
          <div key={doctor.id} style={{
            background: theme === THEMES.WHITE ? '#F8F9FA' : `${colors.navy}F0`,
            padding: '10px',
            margin: '10px 0',
            borderRadius: '8px'
          }}>
            <h4>{doctor.name}</h4>
            <p>{doctor.specialty} - ₹{doctor.fee}</p>
            <p>Available: {doctor.available ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>

      {/* Appointments Section */}
      <div style={{
        background: theme === THEMES.WHITE ? '#FFFFFF' : `${colors.navy}F0`,
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h2>Appointments State</h2>
        <p>User Appointments: {appointments.userAppointments.length}</p>
        <p>Clinic Appointments: {appointments.clinicAppointments.length}</p>
        <p>Booking Loading: {appointments.bookingLoading ? 'Yes' : 'No'}</p>
        {appointments.error && <p style={{ color: 'red' }}>Error: {appointments.error}</p>}
        
        <button 
          onClick={() => appointments.fetchUserAppointments()}
          style={{
            padding: '8px 16px',
            background: colors.teal,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Fetch User Appointments
        </button>
        
        <button 
          onClick={() => appointments.fetchClinicAppointments()}
          style={{
            padding: '8px 16px',
            background: colors.teal,
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Fetch Clinic Appointments
        </button>
      </div>
    </div>
  );
}
