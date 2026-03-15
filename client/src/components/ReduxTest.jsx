import React from 'react';
import { useDoctors } from '../store/hooks';

export default function ReduxTest() {
  const { doctors, loading, error, fetchDoctorsData } = useDoctors();

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h2>Redux Test - Doctors Data</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
        <p><strong>Doctors Count:</strong> {doctors.length}</p>
      </div>

      <button 
        onClick={fetchDoctorsData}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Fetch Doctors
      </button>

      {doctors.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Doctors List:</h3>
          {doctors.slice(0, 3).map(doctor => (
            <div key={doctor.id} style={{
              background: 'white',
              padding: '10px',
              margin: '5px 0',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <strong>{doctor.name}</strong> - {doctor.specialty} - ₹{doctor.fee}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
