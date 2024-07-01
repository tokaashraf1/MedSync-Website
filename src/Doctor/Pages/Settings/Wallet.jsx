import React from 'react'
import Pending from "../../../assets/imgs/wall-clock.png"
import Approve from "../../../assets/imgs/checkmark.png"
import Hospital from "../../../assets/imgs/hospital.png"
function Wallet() {
  return (
    <div className="" >
    <div className=" row doctor-cards-con">
  <div className=' row col-md-8 col-12'>
        <div className="col-md-4  ">
          <div className="card text-center doctor-cards ">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <p className='fs-3'>0:00</p>
            
              <p className="card-text mt-2">
              Pending Patients
          
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center doctor-cards ">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <p className='fs-3'>0:00</p>
            
              <p className="card-text mt-2">
                Approved Patients 
          
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4  ">
          <div className="card text-center doctor-cards ">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <p className='fs-3'>0:00</p>
              <p className="card-text mt-2">
              Number Of Clinics
              </p>
            </div>
          </div>
        </div>
      </div>
      

  </div>
  
</div>
  )
}

export default Wallet