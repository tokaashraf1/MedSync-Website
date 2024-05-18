import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./profile.css";
import API_ENDPOINT from "../../../utils/constants";
import Calendar from "react-calendar";
import axios from "axios";
import {SettingsContext} from "../../../Contexts/SettingProvider"
function ProfileInfoSection() {
  const {profileInfo,token}=useContext(SettingsContext)
  const [file, setFile] = useState(null);
  const [profileimg, setprofileimg] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [showProfileImg, setShowProfileImg] = useState(true);
  const [openImgPopup, setOpenImgPopup] = useState(false);
  useEffect(() => {
    var profileimg = localStorage.getItem("profileimg");
    setprofileimg(profileimg);
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setShowProfileImg(false); // Hide the profile image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(""); // Clear preview if no file is selected
    }
  };

  const handleFileInputClick = () => {
    document.getElementById("myFile").value = null;
  };
  const handleChangeImage = () => {
    const formData = new FormData();
    formData.append("image", file); // Assuming your API expects 'file' as the key for the image

    axios
      .post(`${API_ENDPOINT}/api/edit/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authorization token if required
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        const userData = response.data.user;
        console.log(userData.profile_photo_path);
        setprofileimg(previewUrl);
        window.location.href = "/profile";
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="row">
      <div className="row bg-white col-md-8  profile-section1  ">
        <div className=" col-8 col-md-6 rounded-circle mt-5 ms-md-3 profile-img-container  ">
          {profileInfo.updatedProfileImg ? (
            <img
              src={profileInfo.updatedProfileImg}
              alt=""
              className="rounded-circle"
            />
          ) : (
            <img src={profileimg} alt="" className="rounded-circle" />
          )}
        </div>

        <div className=" col-8 col-md-6   mt-5 profile-section1-text ms-md-5 ">
          <h1 className="mt-2 fs-3">Dr.{profileInfo.name}</h1>
          <h1 className="mt-3 fs-3">{profileInfo.email}</h1>
          <h1 className="mt-3 fs-3">{profileInfo.Medicaldgree} </h1>
          <button
            className=" mt-2 bg-transparent"
            onClick={() => {
              setOpenImgPopup(true);
            }}
          >
            Change Profile Picture{" "}
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="col-md-4 d-none d-md-block order-md-2 ">
        <Calendar />
        {openImgPopup && (
          <div className="changephoto-popup">
            <div className="mt-4 ">
              {showProfileImg ? (
                <div className="rounded-circle profile-img-to-change">
                  {profileInfo.updatedProfileImg ? (
                    <img
                      src={profileInfo.updatedProfileImg}
                      alt=""
                      className="rounded-circle"
                    />
                  ) : (
                    <img src={profileimg} alt="" className="rounded-circle" />
                  )}
                </div>
              ) : (
                <div className="rounded-circle profile-img-to-change">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-circle"
                  />
                </div>
              )}
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  id="myFile"
                  name="filename"
                  className="mt-5"
                  onClick={handleFileInputClick} // Clear file input value on click
                  onChange={handleFileChange} // Handle file change
                  // Hide the file input visually
                />
              </div>
            </div>
            <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
              <button
                className="home-add-clinc-popup-btn me-3"
                onClick={handleChangeImage}
              >
                Change
              </button>
              <button
                onClick={() => setOpenImgPopup(false)}
                className=""
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProfileInfoSection;
