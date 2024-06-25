import React from 'react'

function PatientsList() {
  return (
    <div>
          <div className="row mt-5 ms-1">
            <div className="col-lg-6 patient-list-sec">
              <h1>Appointments</h1>

              <div className="mt-4">
                {/* but here over flow hidden */}
                <div className="row ">
                  <img
                    src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF"
                    alt=""
                    className="col-6"
                  />
                  <p className="col-6">No patients to display </p>
                </div>
              </div>
              <div className="row mt-1">
                <img
                  src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF"
                  alt=""
                  className="col-6"
                />
                <p className="col-6">No patients to display</p>
              </div>
              <div className="row mt-1">
                <img
                  src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF"
                  alt=""
                  className="col-6"
                />
                <p className="col-6">No patients to display </p>
              </div>
              <div className="row mt-1">
                <img
                  src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF"
                  alt=""
                  className="col-6"
                />
                <p className="col-6">No patients to display </p>
              </div>
            </div>
            <div className="col-lg-6 add-clinc-sec ">
              <h1>consultation</h1>
              <div className="mt-4 add-clinc-sec-content">
                <div className="row mt-4 ms-1 ">
                  <img
                    src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF"
                    alt=""
                    className="col-6"
                  />
                  <p className="col-6">No patients to display</p>

                  {/* <hr style={{color:"var(--blue)"}} /> */}
                </div>
                <div className="cons-info mt-3"></div>
                <div className="mt-3 cons-info-p">
                  <p>Last Checked:No patients to display </p>
                  <p>observation:No patients to display</p>
                  <p>Prescription:No patients to display</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
  )
}

export default PatientsList