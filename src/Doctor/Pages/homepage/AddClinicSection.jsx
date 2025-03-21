import React, { useContext, useEffect, useState } from "react";
import API_ENDPOINT from "../../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  cairoenglishRegions,
  gizaenglishRegions,
  governorate,
} from "../../../utils/Data";
import axios from "axios";
import { ClinicsContext } from "../../../Contexts/ClinicsProvider";
function AddClinicSection() {
  document.body.classList.add("home-body");
  document.body.classList.add("doctors-q-body");
  const [token, settoken] = useState();
  const [street, setStreet] = useState("");
  const [description, setDescription] = useState("");
  const [workDays, setWorkDays] = useState([]);
  const [Duration, setDuration] = useState("");
  const [CheckupPrice, setCheckupPrice] = useState("");
  const [FollowupPrice, setFollowupPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const {updateFlag ,setUpdateFlag} = useContext(ClinicsContext);

  const handleGovernorateChange = (e) => {
    setSelectedGovernorate(e.target.value);
    setSelectedRegion("");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
  }, []);

  const handleAddClinic = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const data = {
        street: street,
        region: selectedRegion,
        country: selectedGovernorate,
        description: description,
        appointment_duration: Duration,
        check_up_price: CheckupPrice,
        follow_up_price: FollowupPrice,
        work_days: workDays,
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/doctor/add/workplace`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setLoading(false);
      setUpdateFlag(updateFlag+1);
      toast.success(" Clinic added successfully", {
        position: "bottom-right",
        autoClose: 4000,
      });
    } catch (error) {
      console.error("Error adding clinic:", error);
      setLoading(false);
      toast.error(" Please fill in all fields!", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };
  const handleAddWorkDayFields = () => {
    setWorkDays([...workDays, { day: "", start_hour: "", end_hour: "" }]);
  };
  const handleWorkDayChange = (index, field, value) => {
    const newWorkDays = [...workDays];
    newWorkDays[index][field] = value;
    setWorkDays(newWorkDays);
  };
  return (
    <div>
      <h4 className="ms-5 mt-5 new-clinic ">Add New Clinic Here</h4>
      <div className="ms-5 add-clinic-section">
        <div className="mt-4 ">
          <label>
            {" "}
            Governorate <span className="red-asterisk">*</span>
          </label>
          <select
            value={selectedGovernorate}
            onChange={handleGovernorateChange}
            class="form-control"
          >
            <option value="">select Governorate</option>
            {governorate.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div>
            <label className="mt-2">
              {" "}
              Region<span className="red-asterisk">*</span>
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              class="form-control"
            >
              <option value="">select Region</option>
              {selectedGovernorate === "Cairo"
                ? cairoenglishRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))
                : selectedGovernorate === "Giza"
                ? gizaenglishRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <label className="mt-2" htmlFor="">
            Street<span className="red-asterisk">*</span>
          </label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            class="form-control"
          />
          <label htmlFor="" className="mt-2">
            description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class="form-control"
          />
          <label htmlFor="" className="mt-2">
            Appointment Duration
          </label>
          <input
            type="text"
            value={Duration}
            onChange={(e) => setDuration(e.target.value)}
            className="form-control"
          />
          <label htmlFor="" className="mt-2">
            Checkup Price
          </label>
          <input
            type="text"
            value={CheckupPrice}
            onChange={(e) => setCheckupPrice(e.target.value)}
            className="form-control"
          />
          <label htmlFor="" className="mt-2">
            Followup Price
          </label>
          <input
            type="text"
            value={FollowupPrice}
            onChange={(e) => setFollowupPrice(e.target.value)}
            className="form-control"
          />

          <label className="mt-2 d-block ">
            choose Work Days <span className="red-asterisk">*</span>
          </label>
          {workDays.map((workDay, index) => (
            <div key={index}>
              <hr />
              <label className="mt-2">
                Day<span className="red-asterisk">*</span>
              </label>
              <select
                className="form-control"
                id={`day-${index}`}
                name="day"
                value={workDay.day}
                onChange={(event) =>
                  handleWorkDayChange(
                    index,
                    event.target.name,
                    event.target.value
                  )
                }
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <label className="mt-2">
                Start Hour<span className="red-asterisk">*</span>
              </label>
              <input
                type="text"
                value={workDay.start_hour}
                onChange={(e) =>
                  handleWorkDayChange(index, "start_hour", e.target.value)
                }
                className="form-control"
                placeholder="Available hours: 7:00 AM - 10:00 PM"
              />
              <label>
                End Hour<span className="red-asterisk">*</span>
              </label>
              <input
                type="text"
                value={workDay.end_hour}
                onChange={(e) =>
                  handleWorkDayChange(index, "end_hour", e.target.value)
                }
                className="form-control"
                placeholder="Available hours: 7:00 AM - 10:00 PM"
              />
            </div>
          ))}
          <button
            type="button active-button"
            className="mt-3 btn btn-primary"
            onClick={handleAddWorkDayFields}
          >
            +
          </button>
        </div>
        <div className="popup-btns me-5 mt-4 d-flex justify-content-end">
          <button
            onClick={handleAddClinic}
            className="active-button px-3 py-1 rounded-4"
          >
            Send
          </button>
        </div>
      </div>
      {loading && (
        <div className="loading-popup">
          <div class="load"></div>
        </div>
      )}
    </div>
  );
}

export default AddClinicSection;
