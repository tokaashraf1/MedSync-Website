import React from "react";
import "./Admincard.css";
import Patientsvg from "../../../assets/imgs/patient.svg";
import doctorsvg from "../../../assets/imgs/doctor.svg";
import medicationsvg from "../../../assets/imgs/drugs.svg";
function Admincard({ patient, doctor, medications }) {
  return (
    <div className="row admin-cards">
      <div class="card admin-card-cont mt-4">
        <div class="card-body">
          <p class="card-title admin-card-title">Total Patients</p>
          <h4 class="card-text total-number">{patient}</h4>
          <a class="card-title percentage" href="/doctors">
            Patients data{" "}
            <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
          </a>
          <img src={Patientsvg} alt="" className="patientsvg" />
        </div>
      </div>

      <div class="card admin-card-cont2 mt-4">
        <div class="card-body">
          <p class="card-title  admin-card-title">Total Doctors</p>
          <h4 class="card-text total-number">{doctor}</h4>
          <a class="card-title percentage" href="/patients">
            Doctors data{" "}
            <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
          </a>
          <img src={doctorsvg} alt="" className="patientsvg" />
        </div>
      </div>
      <div class="card admin-card-cont3 mt-4">
        <div class="card-body">
          <p class="card-title  admin-card-title">Total Diagnoses</p>
          <h4 class="card-text total-number">{medications}</h4>
          <a class="card-title percentage" href="/drugs">
            Diagnoses data{" "}
            <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
          </a>
          <img src={medicationsvg} alt="" className="patientsvg" />
        </div>
      </div>
    </div>
  );
}

export default Admincard;
