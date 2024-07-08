import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./profile.css";
import API_ENDPOINT from "../../../utils/constants";
import axios from "axios";
import UseApi from "../../../hooks/UseApi";
import {SettingsContext} from "../../../Contexts/SettingProvider"
function ProfileEditaSection() {
  const {profileInfo,token}=useContext(SettingsContext)
  const [gender, setgender] = useState(profileInfo.gender);
  const [phone, setPhone] = useState(profileInfo.phone);
  const { loading, error, data, postRequest } = UseApi();
  const handleEditdata = async () => {
    const file = localStorage.getItem("DoctorProfileImage");
    console.log(file)
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("image", file);
    await postRequest("/api/edit/profile", formData, token);
    // Log the data returned from the API
    if (!error) {
      localStorage.setItem("profilePhone", phone);
      localStorage.setItem("profileGender", gender);
      window.location.href = "/profile";
    } else {
      console.log("error:", error); // Log the data returned from the API
    }
  };
  return (
    <div className="row  col-md-8 mt-4   profile-section2 ">
      <div className="mt-5  col-lg-6 profile-section2-info">
        <label className=" fs-5">Specialty:</label>
        <p className="fs-6">{profileInfo.spciality}</p>
        <label className="mt-1 fs-5">Medical Dgree:</label>
        <p className="fs-6">{profileInfo.Medicaldgree}</p>
        <label className="mt-1  fs-5">University: </label>
        <p className="fs-6">{profileInfo.university}</p>
        <label className="mt-1  fs-5">Years of experience:</label>
        <p className="fs-6">{profileInfo.Yearsofexperience}years </p>
        <label className="mt-1  fs-5">Medical board organization:</label>
        <p className="fs-6">{profileInfo.Medicalboardorganization}</p>
        <label className="mt-1  fs-5">Phone:</label>
        <p className="fs-6">{profileInfo.phone}</p>
        <label className="mt-1  fs-5">Gender:</label>
        <p className="fs-6">{profileInfo.gender}</p>
      </div>
      <div className="mt-5  col-lg-6  profile-section2-edit-profile">
        <p className="mt-4 ms-2 fs-4">Update Your Info</p>
        <div className="profile-section2-edit-rofile-inputs ms-2">
          <label htmlFor="" className="d-block mt-4">
            Phone
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <label htmlFor="" className="d-block mt-4">
            Gender
          </label>
          <input
            type="text"
            value={gender}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <button className=" mt-5   bg-transparent" onClick={handleEditdata}>
            {" "}
            Edit <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditaSection;
