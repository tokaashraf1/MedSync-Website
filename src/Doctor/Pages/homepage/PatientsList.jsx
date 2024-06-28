import React, { useContext, useState } from "react";
import { ClinicsContext } from "../../../Contexts/ClinicsProvider";
function PatientsList() {
  const [appointmentDetaiels, setAppointmentDetaiels] = useState(
    "No patients to display"
  );
  const {
    upcomingStatus,
    handlupcomingStatus,
    completedStatus,
    handlcompletedStatus,
    pendingStatus,
    handlpendingStatus,
    cancelledStatus,
    handlcancelledStatus,
    upcomingResponse,
    handleClick,
    handlePreviousClick,
    currentIndex,
    clinics,
    ClinicsIds,
    completedResponse,
    pendingResponse,
    cancelledResponse,
  } = useContext(ClinicsContext);

  return (
    <div>
      <div className="row mt-5 ms-1">
        <div className="col-lg-6 patient-list-sec">
          <h1>Appointments</h1>
          <div className="mt-4 l d-flex align-items-center shadow justify-content-center">
            {clinics && clinics.length > 0 ? (
              <div>
                {clinics.map((clinic, index) =>
                  clinic.id === ClinicsIds[currentIndex] ? (
                    <h5 key={clinic.id} className="text-white">
                      {clinic.region.english_name} clinic
                    </h5>
                  ) : null
                )}
              </div>
            ) : (
              <h5 className="text-white">No clinics available</h5>
            )}
          </div>

          <div className="mt-3 status-tabs">
            <button
              className={`me-1 px-2  ${
                upcomingStatus ? "active-status-btn shadow " : ""
              }`}
              onClick={handlupcomingStatus}
            >
              {" "}
              Upcoming
            </button>
            <button
              className={`me-1  px-2  ${
                completedStatus ? "active-status-btn shadow " : ""
              }`}
              onClick={handlcompletedStatus}
            >
              Completed
            </button>
            <button
              className={`me-1  px-2  ${
                pendingStatus ? "active-status-btn shadow " : ""
              }`}
              onClick={handlpendingStatus}
            >
              {" "}
              Pending
            </button>
            <button
              className={`px-2 mt-2 mt-md-none  ${
                cancelledStatus ? "active-status-btn shadow " : ""
              }`}
              onClick={handlcancelledStatus}
            >
              Canceled
            </button>
          </div>

          {upcomingStatus && (
            <div className="mt-2">
              {upcomingResponse ? (
                <div>
                  {Object.entries(upcomingResponse).map(([id, responses]) => (
                    <div key={id}>
                      {responses.map((response, index) => (
                        <div
                          key={index}
                          className="row cursor"
                          onClick={() =>
                            setAppointmentDetaiels(response)
                          }
                        >
                          <p className="col-7 small"> {response.user_name}</p>
                          <p className="col-5 small ">
                            {" "}
                            <i
                              className="fa fa-clock-o me-1"
                              aria-hidden="true"
                            ></i>{" "}
                            {response.slot_start_time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="border-0 text-gray me-3 mt-3">
                    <i
                      className="fa fa-chevron-left"
                      aria-hidden="true"
                      onClick={handlePreviousClick}
                    ></i>
                  </button>
                  <button className="border-0 text-gray">
                    <i
                      className="fa fa-chevron-right"
                      aria-hidden="true"
                      onClick={handleClick}
                    ></i>
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-gray ">
                  <i className="fa fa-calendar me-2" aria-hidden="true"></i>
                  Upcoming appointments will be displayed here
                </div>
              )}
            </div>
          )}
          {completedStatus && (
            <div className="mt-2">
              {completedResponse ? (
                <div>
                  {Object.entries(completedResponse).map(([id, responses]) => (
                    <div key={id}>
                      {responses.map((response, index) => (
                        <div
                          key={index}
                          className="row cursor"
                          onClick={() =>
                            setAppointmentDetaiels(response)
                          }
                        >
                          <p className="col-7 small"> {response.user_name}</p>
                          <p className="col-5 small ">
                            {" "}
                            <i
                              className="fa fa-clock-o me-1"
                              aria-hidden="true"
                            ></i>{" "}
                            {response.slot_start_time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="border-0 text-gray me-3 mt-3">
                    <i
                      className="fa fa-chevron-left"
                      aria-hidden="true"
                      onClick={handlePreviousClick}
                    ></i>
                  </button>
                  <button className="border-0 text-gray">
                    <i
                      className="fa fa-chevron-right"
                      aria-hidden="true"
                      onClick={handleClick}
                    ></i>
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-gray ">
                  <i className="fa fa-calendar me-2" aria-hidden="true"></i>
                  Upcoming appointments will be displayed here
                </div>
              )}
            </div>
          )}
          {pendingStatus && (
            <div className="mt-2">
              {pendingResponse ? (
                <div>
                  {Object.entries(pendingResponse).map(([id, responses]) => (
                    <div key={id}>
                      {responses.map((response, index) => (
                        <div
                          key={index}
                          className="row cursor"
                          onClick={() =>
                            setAppointmentDetaiels(response)
                          }
                        >
                          <p className="col-7 small"> {response.user_name}</p>
                          <p className="col-5 small ">
                            {" "}
                            <i
                              className="fa fa-clock-o me-1"
                              aria-hidden="true"
                            ></i>{" "}
                            {response.slot_start_time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="border-0 text-gray me-3 mt-3">
                    <i
                      className="fa fa-chevron-left"
                      aria-hidden="true"
                      onClick={handlePreviousClick}
                    ></i>
                  </button>
                  <button className="border-0 text-gray">
                    <i
                      className="fa fa-chevron-right"
                      aria-hidden="true"
                      onClick={handleClick}
                    ></i>
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-gray ">
                  <i className="fa fa-calendar me-2" aria-hidden="true"></i>
                  Upcoming appointments will be displayed here
                </div>
              )}
            </div>
          )}
          {cancelledStatus && (
            <div className="mt-2">
              {cancelledResponse ? (
                <div>
                  {Object.entries(cancelledResponse).map(([id, responses]) => (
                    <div key={id}>
                      {responses.map((response, index) => (
                        <div
                          key={index}
                          className="row cursor"
                          onClick={() =>
                            setAppointmentDetaiels(response)
                          }
                        >
                          <p className="col-7 small"> {response.user_name}</p>
                          <p className="col-5 small ">
                            {" "}
                            <i
                              className="fa fa-clock-o me-1"
                              aria-hidden="true"
                            ></i>{" "}
                            {response.slot_start_time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="border-0 text-gray me-3 mt-3">
                    <i
                      className="fa fa-chevron-left"
                      aria-hidden="true"
                      onClick={handlePreviousClick}
                    ></i>
                  </button>
                  <button className="border-0 text-gray">
                    <i
                      className="fa fa-chevron-right"
                      aria-hidden="true"
                      onClick={handleClick}
                    ></i>
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-gray ">
                  <i className="fa fa-calendar me-2" aria-hidden="true"></i>
                  Upcoming appointments will be displayed here
                </div>
              )}
            </div>
          )}

          {/* <div className="row  r ">
            <p className="col-7 small"> Salma Mohamed Yasser </p>
            <p className="col-5 small">
              <i className="fa fa-clock-o me-1" aria-hidden="true"></i> 6:00 Am
            </p>
          </div> */}
          <div className="mt-3"></div>
        </div>
        <div className="col-lg-6 add-clinc-sec ">
          {/* <h1>consultation</h1> */}
          <div className="mt-4 add-clinc-sec-content">
            <div className="row mt-4 ms-1 ">          
              <img
                src={appointmentDetaiels.profile_photo}
                alt="patient"
                className="col-6"
              />
              <p className="col-6">  {appointmentDetaiels.user_name ? appointmentDetaiels.user_name : "No patients to display"} </p>
            </div>
            <div className="cons-info mt-3"></div>
            <div className="mt-3 cons-info-p">
              <p>Appointment Type: {appointmentDetaiels.appointment_type ? appointmentDetaiels.appointment_type : "No Info"} </p>
              <p>Marital Status: {appointmentDetaiels.marital_status? appointmentDetaiels.marital_status : "No Info"} </p>
              <p>Appointment day: {appointmentDetaiels.day? appointmentDetaiels.day : "No Info"} </p>
              <p>Appointment Date: {appointmentDetaiels.date? appointmentDetaiels.date : "--/--/--"} </p>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsList;
