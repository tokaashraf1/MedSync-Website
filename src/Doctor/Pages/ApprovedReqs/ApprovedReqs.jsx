import React, { useContext, useEffect, useState } from "react";
import API_ENDPOINT from "../../hooks/constants";
import Header from "../../components/Header/Header";
import Doctorsidebar from "../../components/doctorsidebar/Doctorsidebar";
import AdminFooter from "../../components/adminfooter/AdminFooter";
import Cards from "./Cards";
import PatientInfo from "./PatientInfo";
import { PatientContext } from "../../Contexts/MedicalRecordContext";
import Loading from "../../components/Loading/Loading";


function ApprovedReqs() {
  // const {loading}=useContext(PatientContext)
  document.body.classList.add("profile-body");
  return (
    <div className="approvedreqs-page">
      <Header
        initialScrolled={true}
        initialEnableScroll={false}
        page="doctor"
      />
      <Cards />
      <PatientInfo />
      <Doctorsidebar />
      <AdminFooter />
  
    </div>
  );
}

export default ApprovedReqs;
