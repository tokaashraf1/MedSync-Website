import React, { useEffect, useState } from 'react'
import API_ENDPOINT from '../../utils/constants';

function Try() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = 'your_token_here'; // replace with your actual token
  const id = 110;

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT}/api/doctor/patient-profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>T</div>
  )
}

export default Try