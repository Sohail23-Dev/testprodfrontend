import React, { useState } from 'react';
import './App.css';

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://user-details-backend-9clh.onrender.com';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/user-details`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      const data = await response.json();
      setUserDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>User Details Fetcher</h1>
      
      <button 
        onClick={fetchUserDetails} 
        disabled={loading}
        className="fetch-button"
      >
        {loading ? 'Loading...' : 'Fetch My Details'}
      </button>

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {userDetails && !error && (
        <div className="user-details">
          <h2>Your Details:</h2>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Sex:</strong> {userDetails.sex}</p>
        </div>
      )}
    </div>
  );
}

export default App;