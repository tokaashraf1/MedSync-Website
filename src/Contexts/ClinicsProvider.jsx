import React, { createContext, useEffect, useState } from 'react'
import API_ENDPOINT from '../utils/constants';
import axios from 'axios';

export const ClinicsContext = createContext();
function ClinicsProvider({ children }) {
  const[token,settoken]=useState(null)
  const [clinics, setClinics] = useState([]);
  const [clinicsCount, setClinicsCount] = useState(0);
  const [percent, setPercent] = useState(); 

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

  useEffect(()=>{
    const getPercentage = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/doctor/get/profile-completion`, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
    
        console.log("kjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",response.data.completion_percentage)
        setPercent(response.data.completion_percentage)
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    
    };
    getPercentage();
   },[token]);


  return (
<ClinicsContext.Provider value={{clinics,clinicsCount,percent}}>
        {children}
    </ClinicsContext.Provider>
  )
}

export default ClinicsProvider