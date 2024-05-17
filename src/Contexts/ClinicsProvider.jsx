import React, { createContext, useEffect, useState } from 'react'
import API_ENDPOINT from '../hooks/constants';
import axios from 'axios';

export const ClinicsContext = createContext();
function ClinicsProvider({ children }) {
  const[token,settoken]=useState(null)
  const [clinics, setClinics] = useState([]);
  const [clinicsCount, setClinicsCount] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
    const apiUrl = `${API_ENDPOINT}/api/doctor/get/workplaces`;
    const fetchData = async () => {
      // Check if API_TOKEN exists before making the API request
      if (!token) {
        console.error("API token is missing!");
        return; // Exit early if token is missing
      }

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setClinics(response.data.workplaces);
        setClinicsCount(response.data.workplaces.length)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  return (
<ClinicsContext.Provider value={{clinics,clinicsCount}}>
        {children}
    </ClinicsContext.Provider>
  )
}

export default ClinicsProvider