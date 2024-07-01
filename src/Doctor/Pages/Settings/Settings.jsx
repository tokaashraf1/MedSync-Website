
import Header from "../../../Components/Header/header";
import Sidebar from "../../../Components/SideBar/SideBar";
import ProfileDetailes from "../Settings/ProfileDetailes"
import "./Settings.css"
import{ useContext } from 'react'
import {SettingsContext} from "../../../Contexts/SettingProvider"
import ManageClincs from "./ManageClincs";
import Wallet from "./Wallet";

function Settings() {
  const {handleProfileClick,handlewalletClick,handleClincsClick,profile,wallet,clinics}=useContext(SettingsContext)
  document.body.classList.add("profile-body");

  return (
    <>
    <div className='settings-page'>
    
      <Header initialScrolled ={true} initialEnableScroll ={false} page="doctor" />
      <div className="d-flex settings-btns flex-wrap  ">
      <button className={` border-0 rounded-5 ${profile ? " active-button" : "  bg-white"} `} onClick={handleProfileClick}> <i className="fa fa-user-o me-2" aria-hidden="true"></i>Profile Details</button>
      {/* <button className={`ms-5 border-0 rounded-5 ${Password ? " active-button" : "  bg-white"} `} onClick={handlePasswordClick}> <i className="fa fa-key me-1" aria-hidden="true"></i> Change Password</button> */}
      <button className={`ms-sm-5  border-0 rounded-5 ${clinics ? " active-button" : "  bg-white"} `} onClick={handleClincsClick}> <i className="fa fa-hospital-o me-1" aria-hidden="true"></i> Mange Clinic</button>
      <button className={`ms-sm-5  border-0 rounded-5 ${wallet ? " active-button" : "  bg-white"} `} onClick={handlewalletClick}> <i className="fa fa fa-credit-card me-1" aria-hidden="true"></i> Wallet Info</button>
      </div>
      {profile&&(
      <div className='mt-5 '>
        <ProfileDetailes/>
      </div>)}
      {clinics&&(
      <div className='mt-5 '>
        <ManageClincs/>
      </div>)}
      {wallet&&(
      <div className='mt-5 '>
        <Wallet/>
      </div>)}
        <Sidebar />
        {/* <AdminFooter /> */}
    </div>
    </>
  )
}

export default Settings