import React, { useState } from "react";
import "./ApprovedReqs.css";
import ProfileSection from "./ProfileSection";
import HistorySection from "./HistorySection";
function PatientInfo() {
  const [profile, setProfile] = useState(true);
  const [history, setHistory] = useState(false);

  const handleProfileClick = () => {
    setProfile(true)
    setHistory(false)
  };
  const handleHistoryClick = () => {
    setProfile(false)
    setHistory(true)
  };


  return (
    <div className="row">
      <div className="Patient-info-sec col-md-8  bg-white custom-shadow ">
        <p className="mt-5 ms-4 text-black fs-5 patient-profile-title">
          Patient's Profile and History
        </p>
        <div className="d-flex justify-content-center mt-4 approve-patient-btns">
          <button className={`${profile ? 'active-button shadow ' : ''}`}  onClick={handleProfileClick}>Profile</button>
          <button className={`ms-2 bg-gray ${history ? 'active-button shadow ' : ''}`} onClick={handleHistoryClick}>history</button>
        </div>
        <div className="mt-3 ms-4">
        {profile && (
        <ProfileSection />
      )}

      {history && (
        <HistorySection/>
      )}
        
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
