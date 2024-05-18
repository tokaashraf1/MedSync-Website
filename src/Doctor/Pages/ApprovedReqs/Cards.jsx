import React, { useContext } from 'react'
import Pending from "../../../assets/imgs/wall-clock.png"
import Approve from "../../../assets/imgs/checkmark.png"
import Hospital from "../../../assets/imgs/hospital.png"
import "./ApprovedReqs.css"
import Calendar from 'react-calendar'
import { PatientContext } from '../../../Contexts/MedicalRecordContext'
import {ClinicsContext} from "../../../Contexts/ClinicsProvider"
function Cards() {
  const{clinicsCount}=useContext(ClinicsContext);
  const {recordCount,pendingRequestsCount}=useContext(PatientContext)
  return (
    <div className="" >
      <div className=" row doctor-cards-con">
    <div className=' row col-md-8 col-12'>
          <div className="col-md-4  ">
            <div className="card text-center doctor-cards ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img
                  src={Pending}
                  className="card-img-top "
                  alt="Vector "
            
                />
              
                <p className="card-text mt-2">
                Pending Patients: {pendingRequestsCount}
            
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center doctor-cards ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img
                  src={Approve}
                  className="card-img-top "
                  alt="Vector "
                
                />
              
                <p className="card-text mt-2">
                  Approved Patients :{recordCount}
            
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4  ">
            <div className="card text-center doctor-cards ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img
                  src={Hospital}
                  className="card-img-top "
                  alt="Vector "
                />
                <p className="card-text mt-2">
                Number Of Clinics: <span className='fs-5'>{clinicsCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-none d-md-block order-md-2"> 
        <Calendar/>
        </div>
  
    </div>
    
  </div>
  )
}

export default Cards