import React, { useContext, useEffect, useState } from "react";
import API_ENDPOINT from "../../../utils/constants";
import Header from "../../../Components/Header/header";
import SideBar from "../../../Components/SideBar/SideBar";
import Footer from "../../../Components/Footer/Footer";
import Cards from "./Cards";
import PatientInfo from "./PatientInfo";
import { PatientContext } from "../../../Contexts/MedicalRecordContext";
import Loading from "../../../Components/Loading/Loading";


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
      <SideBar />
      <Footer />
  
    </div>
  );
}

export default ApprovedReqs;
