import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/imgs/logo.png";
import { useNavigate } from "react-router-dom";
import "./header.css"
import API_ENDPOINT from "../../utils/constants";
import axios from "axios";
import { AuthContext } from '../../Contexts/AuthProvider';
function HeaderDoctorData() {
  const [profileimg, setprofileimg] = useState();
  const [updatedProfileImg, setUpdatedProfileImg] = useState("");
  const [token, settoken] = useState();
  const { handleLogoutClick } = useContext(AuthContext);

  useEffect(() => {
    var profileimg = localStorage.getItem("profileimg");

    setprofileimg(profileimg);
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
  }, []);

  useEffect(() => {
    const apiUrl = `${API_ENDPOINT}/api/get/profile`;
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

        setUpdatedProfileImg(response.data.user.profile_photo_path);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <button
        className="profile-img-btn d-none d-lg-block "
        onClick={() => (window.location.href = "/profile")}
      >
        {" "}
        {updatedProfileImg ? (
          <img src={updatedProfileImg} alt="" className="" />
        ) : (
          <img src={profileimg} alt="" className="" />
        )}
      </button>
      {/* <button className="d-sm-block d-lg-none header-links border-0 me-lg-3 navbar-collapse-button text-blue">
        Home
      </button> */}
      <button
        className=" d-lg-none navbar-collapse-button text-blue border-blue "
        onClick={() => (window.location.href = "/profile")}>
        Profile
      </button>

      <button
        className=" d-lg-none navbar-collapse-button text-blue border-blue "
        onClick={() => (window.location.href = "/home")}
      >
        Dashboard
      </button>
      <button
        className=" d-lg-none navbar-collapse-button text-blue border-blue "
        onClick={() => (window.location.href = "/pendingreq")}
      >
        Requests
      </button>
      <button
        className=" d-lg-none navbar-collapse-button text-blue border-blue "
        onClick={() => (window.location.href = "/approvedreqs")}>
        Patients
      </button>
      <button
        className=" d-lg-none navbar-collapse-button text-blue border-blue "
        onClick={() => (window.location.href = "/settings")}>
        Settings
      </button>
      <button
        className=" d-lg-none navbar-collapse-button text-blue border-blue "
        onClick={handleLogoutClick}>
        <i className="fa fa-sign-out me-2" aria-hidden="true"></i> log out
      </button>
      
    </div>
  );
}

export default HeaderDoctorData