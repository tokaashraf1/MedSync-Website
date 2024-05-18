import React, { useContext } from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import Footer from "../../../Components/Footer/Footer";
import "./profile.css";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileEditaSection from "./ProfileEditaSection";
import Header from "../../../Components/Header/header";
import { SettingsContext } from "../../../Contexts/SettingProvider";

function Profile() {
  document.body.classList.add("profile-body");
  const {loading}=useContext(SettingsContext)



  return (
    <div className="profile-page">
    <Header initialScrolled ={true} initialEnableScroll ={false} page="doctor" />
      <ProfileInfoSection  />
      <ProfileEditaSection  />
      <Sidebar />
      <Footer />
      {loading && (
      <loading/>
      )}
    </div>
  );
}
export default Profile;
