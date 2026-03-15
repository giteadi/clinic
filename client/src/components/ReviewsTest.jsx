import React from 'react';
import clinicService from '../services/clinicService';

export default function ReviewsTest() {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const testReviews = async () => {
      try {
        setLoading(true);
        const data = await clinicService.getClinicReviews('dental');
        setReviews(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testReviews();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h2>Reviews API Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
        <p><strong>Reviews Count:</strong> {reviews.length}</p>
      </div>

      {reviews.length > 0 && (
        <div>
          <h3>Clinic Reviews:</h3>
          {reviews.map(review => (
            <div key={review.id} style={{
              background: 'white',
              padding: '15px',
              margin: '10px 0',
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <strong>{review.patientName}</strong>
                <span style={{ marginLeft: '10px', color: '#ffa500' }}>
                  {'⭐'.repeat(review.rating)}
                </span>
              </div>
              <p style={{ margin: '5px 0', color: '#666' }}>{review.comment}</p>
              <small style={{ color: '#999' }}>{review.date}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
