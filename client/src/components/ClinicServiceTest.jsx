import React from 'react';
import clinicService from '../services/clinicService';

export default function ClinicServiceTest() {
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const testClinicService = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing clinicService.getClinicReviews("dental")...');
      const response = await clinicService.getClinicReviews('dental');
      console.log('Response received:', response);
      console.log('Type of response:', typeof response);
      console.log('Is array?', Array.isArray(response));
      console.log('Has data property?', response && response.data);
      console.log('Data type?', typeof response.data);
      console.log('Data is array?', Array.isArray(response.data));
      
      setResult(response);
    } catch (err) {
      console.error('Test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h2>ClinicService Test</h2>
      
      <button 
        onClick={testClinicService}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Test getClinicReviews("dental")'}
      </button>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div>
          <h3>Result:</h3>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
          
          <div style={{ marginTop: '20px' }}>
            <p><strong>Type:</strong> {typeof result}</p>
            <p><strong>Is Array:</strong> {Array.isArray(result) ? 'Yes' : 'No'}</p>
            {result && result.data && (
              <>
                <p><strong>Has Data:</strong> Yes</p>
                <p><strong>Data Type:</strong> {typeof result.data}</p>
                <p><strong>Data Is Array:</strong> {Array.isArray(result.data) ? 'Yes' : 'No'}</p>
                <p><strong>Data Length:</strong> {result.data.length}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
