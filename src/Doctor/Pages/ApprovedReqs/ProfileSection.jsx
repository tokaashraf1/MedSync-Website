import React from 'react'
import Diabetes from "../../../assets/imgs/diabtes.svg"
import BloodType from "../../../assets/imgs/bloodtype.svg"
import Bb from "../../../assets/imgs/bp.svg"
import { useContext } from 'react'
import { PatientContext } from '../../../Contexts/MedicalRecordContext'
import Loading from '../../../Components/Loading/Loading'

function ProfileSection() {
  const {userInfo,handleClick,loading,handlePreviousClick}=useContext(PatientContext)
  return (
    <div>
      <div className="row">
        <div className="col-md-6 rounded-circle patient-profile-img ">

  {userInfo && (
      <img src={userInfo.user.profile_photo_path ? userInfo.user.profile_photo_path : userInfo.user.profile_photo_url} alt="" />
      )}
        </div>
        <div className="col-md-6   ms-lg-5 mt-5 patient-personal-info">
        {userInfo && (
  <p className='fs-2 text-black '>{userInfo.user.name}</p>
      )}
  
  <div className='row patient-info '>
  <div className='col-3 bg-white rounded-3'>
  <p className='text-black' > Gender: <p className='text-black'>{userInfo && userInfo.patient.gender ? userInfo.patient.gender : 'No info'}</p></p>

</div>
<div className='col-3 bg-white rounded-3 ms-2 '>
  <p className='text-black '>Age:  <p className='text-black' >{userInfo && userInfo.patient.age ? userInfo.patient.age : 'No info'}</p> </p>
</div>
<div className='col-3 bg-white rounded-3 ms-2 '>
  <p className='text-black'> Status: <p className='text-black'>{userInfo && userInfo.patient.marital_status ? userInfo.patient.marital_status : 'No info'}</p></p>
</div>

  </div>
        </div>
        <div className="col-md-6">
        
        </div>
      </div>

      <div className="row">
        <div className="col  ">
          <div className='row  mt-4  ms-md-5'>
            <div className="col-lg-3 col-sm-5 gray-bg me-4 rounded-5 ms--md-2 shadow patient-info-cards">
            
              <h6 className='mt-4 text-gray' >  Blood Sugar</h6>
              <div className="row">
                <div className="col-6">
                
                  <p className='text-black mt-1'>{userInfo && userInfo.emergency_data.blood_sugar ? userInfo.emergency_data.blood_sugar : '__'}</p>
                  
                </div>
                <div className="col-6"><img src={Diabetes} alt="" /></div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-5 gray-bg me-4 rounded-5 shadow patient-info-cards">
          
              <div className="row mt-4">
                <div className="col-6 mt-3">
                  
                  <div className="row">
                    <div className="col-6">
                      <p className='text-gray'>Height</p>
                    </div>
                    <div className="col-6">
                      <p className='ms-lg-5 text-black' >{userInfo && userInfo.emergency_data.height ? userInfo.emergency_data.height : '__'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <p className='text-gray'>Weight</p>
                    </div>
                    <div className="col-6">
                      <p className='ms-lg-5 text-black' >{userInfo && userInfo.emergency_data.weight ? userInfo.emergency_data.weight : '__'}</p>
                    </div>
                  </div>
                
                </div>
              
              </div>

            </div>
            <div className="col-lg-3 col-sm-5 gray-bg me-4  rounded-5 shadow patient-info-cards">
            <h6 className='mt-4 text-gray'>  Blood Pressure</h6>
              <div className="row">
                <div className="col-6">
                  <p className='text-black'>{userInfo && userInfo.pressure_history.systolic ? userInfo.pressure_history.systolic : '__'}</p>
                  <p className='text-black'>{userInfo && userInfo.pressure_history.diastolic ? userInfo.pressure_history.diastolic : '__'}</p>
                </div>
                <div className="col-6"><img src={Bb} alt="" /></div>
              </div>

            </div>
          
          
        
          </div>
        </div>
      </div >
      
<div className='position-absolute end-0 me-5 mt-5'>
{userInfo && (
  <div>
    <button className='border-0 text-gray me-3 ' onClick={handlePreviousClick} ><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
    <button className='border-0 text-gray' onClick={handleClick}><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
  </div>
)}
</div>

        {loading && (
      <Loading/>
      )}
    </div>
  )
}

export default ProfileSection