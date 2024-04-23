import React, { useEffect, useState } from 'react'
import logo from "../../assets/imgs/logo.png";
import { useNavigate } from "react-router-dom";
import "./header.css"
import API_ENDPOINT from "../../hooks/constants";
import axios from "axios";
function HeaderDoctorData() {
  const [profileimg, setprofileimg] = useState();
  const [updatedProfileImg, setUpdatedProfileImg] = useState("");
  const [token, settoken] = useState();

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
                    className="profile-img-btn d-sm-none d-lg-block "
                    style={{ backgroundColor: "black" }}
                  >
                    {" "}
                    
                    {updatedProfileImg ? (
                      <img src={updatedProfileImg} alt="" className="" />
                    ) : (
                      <img src={profileimg} alt="" className="" />
                    )}
                  </button>
                  <button
                    className="d-sm-block d-lg-none header-links border-0 me-lg-3 navbar-collapse-button text-blue"
                  >
                    Home
                  </button>
                </div>
  )
}
export default HeaderDoctorData