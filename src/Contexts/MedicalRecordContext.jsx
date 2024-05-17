import React, { createContext, useEffect, useState } from "react";
import API_ENDPOINT from "../utils/constants";

export const PatientContext = createContext();

function MedicalRecordContext({ children }) {
  const [userIds, setUserIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [Userhistory, setUserhistory] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [token, settoken] = useState();
  const [loading, setLoading] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`, // Fix syntax here
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_ENDPOINT}/api/doctor/approved-requests`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const ids = data.approved_sharing_requests.map((request) => request.id);
        console.log(ids);
        setUserIds(ids); // Assuming setUserIds is defined somewhere
        setRecordCount(ids.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchUserInfo = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/doctor/patient-profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserInfo(data);
      setPatientId(data.patient.id);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }

    setLoading(false);
  };

  const fetchHistory = async (id) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/doctor/patient-history/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserhistory(data);

      // Move the logic that depends on Userhistory here, after the state update
      console.log(data["Speciality Filters"]);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % userIds.length;
    setCurrentIndex(nextIndex);
    const currentIndexForFetch = nextIndex;

    fetchUserInfo(userIds[currentIndexForFetch]);
    fetchHistory(userIds[currentIndexForFetch]);
  };

  useEffect(() => {
    if (Userhistory && Userhistory["Speciality Filters"]) {
      Userhistory["Speciality Filters"].forEach((filter) =>
        console.log(filter.english_name)
      );

      Userhistory.data.forEach((record) => {
        const englishName = record["Medical Speciality"][0]?.english_name; // Assuming it's an array with one item
        const medications = record.medications
          .map((med) => med.name)
          .join(", "); // Join medication names
        const diagnoses = record.diagnoses
          .map((diagnosis) => diagnosis.name)
          .join(", ");
        console.log(`Medical Speciality: ${englishName}`);
        console.log(`Medications: ${medications}`);
        console.log(`Diagnoses: ${diagnoses}`);
      });
    } else {
      console.error("Userhistory or Speciality Filters not available.");
    }
  }, [Userhistory]);

  const handlePreviousClick = () => {
    const prevIndex = (currentIndex - 1 + userIds.length) % userIds.length;
    setCurrentIndex(prevIndex); // Update currentIndex immediately

    // Use the updated index for fetching user info
    const currentIndexForFetch = prevIndex;

    fetchUserInfo(userIds[currentIndexForFetch]); // Assuming fetchUserInfo is defined
    fetchHistory(userIds[currentIndexForFetch]);
  };
  useEffect(() => {
    if (userIds.length > 0) {
      fetchUserInfo(userIds[currentIndex]);
      fetchHistory(userIds[currentIndex]);
    }
  }, [currentIndex, userIds]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${API_ENDPOINT}/api/doctor/pending-requests`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (
          data.pending_sharing_requests &&
          data.pending_sharing_requests.length > 0
        ) {
          setPendingRequestsCount(data.pending_sharing_requests.length);
        } else {
          console.log("No pending sharing requests found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <PatientContext.Provider
      value={{
        userInfo,
        handleClick,
        loading,
        handlePreviousClick,
        recordCount,
        Userhistory,
        patientId,
        pendingRequestsCount,
      }}
    >
      {" "}
      {/* Assuming you want to provide token */}
      {children}
    </PatientContext.Provider>
  );
}

export default MedicalRecordContext;
