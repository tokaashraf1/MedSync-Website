import React, { createContext, useEffect, useState } from "react";
import API_ENDPOINT from "../utils/constants";
import axios from "axios";
export const ClinicsContext = createContext();
function ClinicsProvider({ children }) {
  const [token, settoken] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [clinicsCount, setClinicsCount] = useState(0);
  const [percent, setPercent] = useState();
  const [ptients, setPatients] = useState(true);
  const [addclinic, setAddclinics] = useState(false);
  const [upcomingStatus, setUpcomingStatus] = useState(true);
  const [completedStatus, setcompletedStatus] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(false);
  const [cancelledStatus, setcancelledStatus] = useState(false);
  const [upcomingResponse, setUpcomingResponse] = useState(null);
  const [completedResponse, setCompletedResponse] = useState(null);
  const [pendingResponse, setPendingResponse] = useState(null);
  const [cancelledResponse, setCancelledResponse] = useState(null);
  const [ClinicsIds, setClinicsIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(1);


  const handlePatientsSectionClick = () => {
    setPatients(true);
    setAddclinics(false);
  };
  const handlClinicsSectionClick = () => {
    setPatients(false);
    setAddclinics(true);
  };
  const handlupcomingStatus = () => {
    setUpcomingStatus(true);
    setcompletedStatus(false);
    setPendingStatus(false);
    setcancelledStatus(false);
  };
  const handlpendingStatus = () => {
    setUpcomingStatus(false);
    setcompletedStatus(false);
    setPendingStatus(true);
    setcancelledStatus(false);
  };
  const handlcancelledStatus = () => {
    setUpcomingStatus(false);
    setcompletedStatus(false);
    setPendingStatus(false);
    setcancelledStatus(true);
  };
  const handlcompletedStatus = () => {
    setUpcomingStatus(false);
    setcompletedStatus(true);
    setPendingStatus(false);
    setcancelledStatus(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
    const apiUrl = `${API_ENDPOINT}/api/doctor/get/workplaces`;
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
        const ids = response.data.workplaces.map((request) => request.id);
        console.log("Clincs ids", ids);
        setClinicsIds(ids);
        setClinics(response.data.workplaces);
        setClinicsCount(response.data.workplaces.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const getPercentage = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/api/doctor/get/profile-completion`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPercent(response.data.completion_percentage);
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };
    getPercentage();
  }, [token]);
  
  const sendStatusUpdate = async (status, setResponse, id) => {
    try {
      const postData = {
        status: status, // Set the status parameter
        clinic_id: id,
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/doctor/get/appointments`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data) {
        console.log("Response:", response.data);
        setResponse(response.data); 
      }
    } catch (error) {
      console.error("Error updating status:", error);
      console.log("llllllllllllllllllllllllllllllllllllllll");
    }
  };
  const handleClick = async () => {
    const nextIndex = (currentIndex + 1) % ClinicsIds.length;
    setCurrentIndex(nextIndex);
    const currentIndexForFetch = nextIndex;
    await sendStatusUpdate(
      "upcoming",
      setUpcomingResponse,
      ClinicsIds[currentIndexForFetch]
    );
    await sendStatusUpdate(
      "completed",
      setCompletedResponse,
      ClinicsIds[currentIndexForFetch]
    );
    await sendStatusUpdate(
      "pending",
      setPendingResponse,
      ClinicsIds[currentIndexForFetch]
    );
    await sendStatusUpdate(
      "cancelled",
      setCancelledResponse,
      ClinicsIds[currentIndexForFetch]
    );
  };
  const handlePreviousClick = async () => {
    const prevIndex =
      (currentIndex - 1 + ClinicsIds.length) % ClinicsIds.length;
    setCurrentIndex(prevIndex); // Update currentIndex immediately
    const currentIndexForFetch = prevIndex;
    await sendStatusUpdate(
      "upcoming",
      setUpcomingResponse,
      ClinicsIds[currentIndexForFetch]
    );
    await sendStatusUpdate(
      "completed",
      setCompletedResponse,
      ClinicsIds[currentIndexForFetch]
    );
    await sendStatusUpdate(
      "pending",
      setPendingResponse,
      ClinicsIds[currentIndexForFetch]
    );
    await sendStatusUpdate(
      "cancelled",
      setCancelledResponse,
      ClinicsIds[currentIndexForFetch]
    );
  };
  useEffect(() => {
    if (ClinicsIds.length > 0) {
      const updateStatuses = async () => {
        await sendStatusUpdate("upcoming", setUpcomingResponse,ClinicsIds[currentIndex]);
        await sendStatusUpdate("completed", setCompletedResponse,ClinicsIds[currentIndex]);
        await sendStatusUpdate("pending", setPendingResponse,ClinicsIds[currentIndex]);
        await sendStatusUpdate("canceled", setCancelledResponse,ClinicsIds[currentIndex]);
      };
      updateStatuses();
    }
  }, [currentIndex, ClinicsIds]);
  return (
    <ClinicsContext.Provider
      value={{
        clinics,
        clinicsCount,
        percent,
        ptients,
        addclinic,
        handlePatientsSectionClick,
        handlClinicsSectionClick,
        upcomingStatus,
        handlupcomingStatus,
        completedStatus,
        handlcompletedStatus,
        pendingStatus,
        handlpendingStatus,
        cancelledStatus,
        handlcancelledStatus,
        upcomingResponse,
        completedResponse,
        pendingResponse,
        cancelledResponse,
        handleClick,handlePreviousClick,ClinicsIds,currentIndex,updateFlag,setUpdateFlag
      }}>
      {children}
    </ClinicsContext.Provider>
  );
}
export default ClinicsProvider;
