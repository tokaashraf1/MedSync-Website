import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINT from "../../../utils/constants";
import { useContext } from "react";
import { SettingsContext } from "../../../Contexts/SettingProvider";
import {ClinicsContext} from "../../../Contexts/ClinicsProvider"
import {cairoenglishRegions,gizaenglishRegions,governorate} from "../../../utils/Data"
function ManageClincs() {
  const{clinics}=useContext(ClinicsContext);
  const { token } = useContext(SettingsContext);
  const [street, setStreet] = useState("");
  const [description, setDescription] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [regions, setRegions] = useState("");
  const [selectedgovernorate, setSelectedgovernorate] = useState("");
  const [Duration, setDuration] = useState("");
  const [CheckupPrice, setCheckupPrice] = useState("");
  const [FollowupPrice, setFollowupPrice] = useState("");
  const handleUpdateClick = async (id) => {
    const updateUrl = `${API_ENDPOINT}/api/doctor/update/workplace/${id}`; 
    try {
      const response = await axios.put(
        updateUrl,
        {
          street: street,
          region: regions,
          country: selectedgovernorate,
          description: description,
          follow_up_price:FollowupPrice,
          appointment_duration:Duration,


        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update success:", response.data);
      window.location.href = "/settings";
    } catch (error) {
      console.error("Error updating clinic:", error);
    }
  };
  const handledeleteClick = async (id) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/doctor/delete/workplace/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        window.location.href = "/settings";
      } else {
        console.error("Error deleting row:", response.status);
      }
    } catch (error) {
      console.error("Error deleting row:", error.message);
    }
  };

  return (
    <div className="manage-clinics-con">
      <p className="fs-3 manage-clincs-title">Manage Your Clinics here</p>
      <p className="text-gray fs-6">Add Clinics First</p>
      {clinics && clinics.length > 0 && (
        <div className="">
          {clinics.map((region, index) => (
            <div>
              <div key={index} className="bg-white  rounded-3 ">
                <p className="fs-5 p-2 text-black ms-2 ">
                  {" "}
                  <i
                    className="fa fa-hospital-o me-1"
                    aria-hidden="true"
                  ></i>{" "}
                  {region.region.english_name} clinic{" "}
                </p>
              </div>
              <div className="bg-white fs-5 p-2 rounded-4 mt-3 p-3 update-clincs-con">
                <div className="ms-2 ">
                  <div>
                    <label className="d-block fs-6"> Governorate:</label>
                    {/* <input
                      type="text"
                      placeholder={region.country.english_name}
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="form-control mt-1"
                    /> */}
                    <select
                      value={selectedgovernorate}
                      onChange={(e) => setSelectedgovernorate(e.target.value)}
                      class="form-control mt-1"
                      placeholder={region.country.english_name}
                    >
                      <option value="">{region.country.english_name}</option>
                      {governorate.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="d-block fs-6"> Region:</label>
                    {/* <input
                      type="text"
                      placeholder={region.region.english_name}
                      value={regions}
                      onChange={(e) => setRegions(e.target.value)}
                      className="form-control mt-1"
                    /> */}
                      <select value={regions} onChange={(e) => setRegions(e.target.value)} class="form-control mt-1">
            <option value="">{region.region.english_name}</option>
            {selectedgovernorate === 'Cairo' ? (
              cairoenglishRegions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))
            ) : selectedgovernorate === 'Giza' ? (
              gizaenglishRegions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))
            ) : null}
          </select>
                  </div>
                  <label className="d-block fs-6">Street</label>
                  <input
                    type="text"
                    placeholder={region.street}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="form-control mt-1"
                  />
                  <label className="d-block fs-6">description</label>
                  <input
                    type="text"
                    placeholder={region.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control mt-1"
                  />
                  <label className="d-block fs-6">Checkup Price</label>
                  <input
                    type="text"
                    placeholder={region.check_up_price}
                    value={CheckupPrice}
                    onChange={(e) => setCheckupPrice(e.target.value)}
                    className="form-control mt-1"
                  />
                  <label className="d-block fs-6">Followup Price</label>
                  <input
                    type="text"
                    placeholder={region.follow_up_price}
                    value={FollowupPrice}
                    onChange={(e) => setFollowupPrice(e.target.value)}
                    className="form-control mt-1"
                  />
                  <label className="d-block fs-6">Appointment Duration</label>
                  <input
                    type="text"
                    placeholder={region.appointment_duration}
                    value={Duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="form-control mt-1"
                  />
                
                </div>
                <div className="popup-btns me-5 mt-4 d-flex justify-content-end">
                  <button
                    className="home-add-clinc-popup-btn bg-transparent me-3 fs-6"
                    onClick={() => handleUpdateClick(region.id)}
                  >
                    Update{" "}
                  </button>
                  <button
                    className="table-delete-btn fs-6"
                    onClick={() => handledeleteClick(region.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ManageClincs;
