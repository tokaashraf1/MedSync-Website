import React from "react";
import { useState, useEffect } from "react";
import "./AdminHome.css";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../../Components/Footer/Footer";
import Admincard from "../../../Components/AdminCards/Admincard";
import Charts from "../../../Components/charts/Charts";
import API_ENDPOINT from "../../../utils/constants";
import Header from "../../../Components/Header/header";
function AdminHome() {
  document.body.classList.add("adminhome-body");
  const [isVisible, setIsVisible] = useState(false);
  const [PatientrecordCount, setPatientRecordCount] = useState(0);
  const [doctorRecordCount, setDoctorRecordCount] = useState(0);
  const [medicationRecordCount, setMedicationRecordCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust the delay as needed

    // Clear the timeout on component unmount to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  // patient api records number ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${API_ENDPOINT}/api/admin/get/all/patients`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        // Assuming data is an array
        setPatientRecordCount(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  //doctor table record number---------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const response = await fetch(
          `${API_ENDPOINT}/api/admin/get/all/doctors`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const data = await response.json();
        // Assuming data is an array
        setDoctorRecordCount(data.length);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    }

    fetchDoctorData();
  }, []);
  // medications-----------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchMedicationData() {
      try {
        const response = await fetch(
          `${API_ENDPOINT}/api/admin/get/all/diagnoses`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch medication data");
        }
        const data = await response.json();
        // Assuming data is an array
        setMedicationRecordCount(data.length);
      } catch (error) {
        console.error("Error fetching medication data:", error);
      }
    }
    fetchMedicationData();
  }, []);
  return (
    <div>
      <Header initialScrolled={true} initialEnableScroll={false} page="admin" />

      <Sidebar />
      <Footer />
      <Admincard
        patient={PatientrecordCount}
        doctor={doctorRecordCount}
        medications={medicationRecordCount}
      />
      <Charts
        patient={PatientrecordCount}
        doctor={doctorRecordCount}
        medications={medicationRecordCount}
      />
    </div>
  );
}

export default AdminHome;
