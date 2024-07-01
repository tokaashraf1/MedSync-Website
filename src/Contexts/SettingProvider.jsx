import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import API_ENDPOINT from "../utils/constants";

export const SettingsContext =createContext()

function SettingsProvider({ children }) {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    updatedProfileImg: "",
    Medicaldgree: "",
    phone: "add phone number",
    Yearsofexperience: "add Years of experience",
    gender: "add gender",
    Medicalboardorganization: "",
    spciality: "",
    university: "",
  });
  const [loading, setLoading] = useState(false);
  const [token, settoken] = useState();
  const [profile, setProfile] = useState(true);
  const [wallet, setwallet] = useState(false);
  const [clinics, setclincs] = useState(false);


  const handleProfileClick=()=>{
setProfile(true)
setwallet(false)
setclincs(false)
  }
const handlewalletClick=()=>{
setProfile(false)
setwallet(true)
setclincs(false)
  }
const handleClincsClick=()=>{
setProfile(false)
setwallet(false)
setclincs(true)
  }
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
  }, []);

  useEffect(() => {
    setLoading(true)
    const apiUrl = `${API_ENDPOINT}/api/get/profile`;
    const fetchData = async () => {
      if (!token) {
        console.error("API token is missing!");
        return; 
      }
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setProfileInfo({
          ...profileInfo,
          name: response.data.user.name,
          email: response.data.user.email,
          Medicaldgree: response.data.doctor.medical_Degree.english_name,
          updatedProfileImg: response.data.user.profile_photo_path,
          Yearsofexperience: response.data.doctor.years_of_experience,
          phone: response.data.doctor.phone,
          gender: response.data.doctor.gender,
          Medicalboardorganization:
            response.data.doctor.medical_board_organization,
          university: response.data.doctor.university.english_name,
          spciality: response.data.doctor.Medical_Speciality.english_name,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setLoading(false)
  }, [token]);


  return (
    <SettingsContext.Provider value={{profileInfo,token,loading,handleProfileClick,handlewalletClick,handleClincsClick,profile,wallet,clinics}}>
        {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider