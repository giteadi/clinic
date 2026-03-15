import React, { useState } from 'react';
import { useSuperAdmin } from '../store/hooks';
import { useTheme } from '../contexts/ThemeContext';

export default function SuperAdminQuickTest() {
  const { colors } = useTheme();
  const { 
    globalStats, 
    clinics, 
    loading, 
    error,
    fetchStats,
    fetchClinics,
    addClinic
  } = useSuperAdmin();

  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    email: 'superadmin@cliniqpro.com',
    password: 'SuperAdmin@123'
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/super-admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (data.success) {
        localStorage.setItem('superAdminToken', data.data.token);
        alert('✅ Login successful! Token saved.');
        // Now fetch data
        fetchStats();
        fetchClinics();
      } else {
        alert('❌ Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Login error: ' + error.message);
    }
  };

  const handleCreateClinic = async () => {
    const clinicData = {
      name: 'Quick Test Clinic ' + Date.now(),
      slug: 'quick-test-' + Date.now(),
      email: `test${Date.now()}@clinic.com`,
      phone: '1234567890',
      address: 'Test Address'
    };

    try {
      await addClinic(clinicData);
      alert('✅ Clinic created successfully!');
    } catch (error) {
      alert('❌ Failed to create clinic: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🚀 Super Admin Quick Test</h1>
      
      {/* Login Section */}
      <div style={{
        background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>🔐 Super Admin Login</h2>
        <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            placeholder="Email"
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            placeholder="Password"
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <button
          onClick={handleLogin}
          style={{
            background: '#007bff', color: 'white', padding: '10px 20px',
            border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px'
          }}
        >
          Login
        </button>
        <button
          onClick={() => { fetchStats(); fetchClinics(); }}
          style={{
            background: '#28a745', color: 'white', padding: '10px 20px',
            border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}
        >
          Load Data
        </button>
      </div>

      {/* Stats Section */}
      <div style={{
        background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>📊 Global Statistics</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3>{globalStats.totalClinics}</h3>
              <p>Total Clinics</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3>{globalStats.totalPatients}</h3>
              <p>Total Patients</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3>{globalStats.totalDoctors}</h3>
              <p>Total Doctors</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3>₹{globalStats.totalRevenue}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        )}
      </div>

      {/* Clinics Section */}
      <div style={{
        background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h2>🏥 All Clinics ({clinics.length})</h2>
        <button
          onClick={handleCreateClinic}
          style={{
            background: '#28a745', color: 'white', padding: '8px 16px',
            border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px'
          }}
        >
          ➕ Add Test Clinic
        </button>
        {clinics.map(clinic => (
          <div key={clinic.id} style={{
            padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '10px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4>{clinic.name}</h4>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  📧 {clinic.email} | 📍 {clinic.address}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  👨‍⚕️ {clinic.doctors_count} doctors | 👥 {clinic.patients_count} patients | 💰 ₹{clinic.total_revenue}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  🌐 {clinic.slug}.localhost:3000 | 📊 Status: {clinic.status}
                </p>
              </div>
              <div style={{
                padding: '5px 10px', borderRadius: '15px', fontSize: '12px',
                background: clinic.status === 'active' ? '#d4edda' : '#f8d7da',
                color: clinic.status === 'active' ? '#155724' : '#721c24'
              }}>
                {clinic.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div style={{
        background: '#fff3cd', padding: '15px', borderRadius: '8px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>📝 Instructions:</h3>
        <ol>
          <li>Click "Login" to authenticate as Super Admin</li>
          <li>Click "Load Data" to fetch stats and clinics</li>
          <li>Click "Add Test Clinic" to create a new clinic</li>
          <li>Each clinic creates an admin account automatically</li>
          <li>Use subdomain URL to access individual clinics</li>
        </ol>
      </div>
    </div>
  );
}
