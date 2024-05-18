import React, { useContext } from 'react'
import {SettingsContext} from "../../../Contexts/SettingProvider"
function ProfileDetailes() {
  const {profileInfo}=useContext(SettingsContext)
  return (
    <div className='profile-detailes'>
      <h4 className=''>Personal Information</h4>
      <h6 className='text-gray'>name,email,phone,gender</h6>
      <p className='mt-5 fs-5 bg-white p-2'>Name: {profileInfo.name}</p>
      <p className='mt-3 fs-5 bg-white p-2'>Email: {profileInfo.email}</p>
      <p className='mt-3 fs-5 bg-white p-2'>Phone: {profileInfo.phone}</p>
      <p className='mt-3 fs-5 bg-white p-2'>Gender: {profileInfo.gender}</p>
      <hr className='mt-4' />
      <h4 className=''>Medical Information</h4>
      <h6 className='text-gray'>Specialty,Medical Dgree,University,Years of experience,board organization</h6>
      <p className='mt-5 fs-5 bg-white p-2'>Specialty: {profileInfo.spciality}</p>
      <p className='mt-3 fs-5 bg-white p-2'>Medical Dgree: {profileInfo.Medicaldgree}</p>
      <p className='mt-3 fs-5 bg-white p-2'>University: {profileInfo.university}</p>
      <p className='mt-3 fs-5 bg-white p-2'>Years of experience: {profileInfo.Yearsofexperience}</p>
      <p className='mt-3 fs-5 bg-white p-2'>Medical board organization: {profileInfo.Medicalboardorganization}</p>
    </div>
  )
}

export default ProfileDetailes