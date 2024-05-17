import React from "react";
import "./QuestionsForm.css";
import { useState, useEffect } from "react";
import API_ENDPOINT from "../../hooks/constants";
import { useRef } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
function DoctorQuestionsForm() {
  const [userName, setUserName] = useState("");
  document.body.classList.add("doctors-q-body");
  useEffect(() => {
    const authName = localStorage.getItem("authusername");
    setUserName(authName);
  }, []);
  const options = [
    "Intern ","Resident ","Specialist","Senior Specialist","Consultant","Senior Consultant","Professor",];
  const option2 = [
    "Anesthesia ","Dentistry","Dermatology","Ear, nose and throat (ENT)","Endocrinology","Gastroenterology","General surgery",
    "Hematology","Hepatology","Internal Medicine","Nephrology","Neurology","Obstetrics and Gynecology","Oncology","Ophthalmology","Orthopedics","Pediatrics",
"Plastic surgery","Psychiatry","Rheumatology","Urology",];
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [univers, setUnivers] = useState([]);
  const [certifyingBoards, setCertifyingBoards] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for file input

  const handleDgreeDropdown = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleSpecialtyDropdown = (event) => {
    setSelectedOption2(event.target.value);
  };
  const handleUniversityDropdown = (event) => {
    setSelectedOption3(event.target.value);
  };
  // university api
  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/colleges`)
      .then((response) => response.json())
      .then((data) => {
        const englishNames = data.map((item) => item.english_name);
        setUnivers(englishNames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    console.log("Selected file:", file);
  };
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);
  console.log(token);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("medical_degree", selectedOption1);
    formData.append("medical_speciality", selectedOption2);
    formData.append("university", selectedOption3);
    formData.append("medical_board_organization", certifyingBoards);
    formData.append("years_of_experience", yearsOfExperience);
    formData.append("licence_information", selectedPhoto);
    axios
      .post(`${API_ENDPOINT}/api/doctor/build/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        window.location.href = "/Waiting";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Header
        initialScrolled={true}
        initialEnableScroll={false}
        page="landding"
      />
      <div className="dectors-q-con">
        <div className="doctors-q-form-con">
          <form>
            <div className="doctors-q-form-content">
              <h1 className="hi-doctor-heading">Hi Dr.{userName}</h1>
              <p className="few-steps-paragh">
                just a few steps to enjoy your services{" "}
              </p>

              <div className="q-form-inputs">
                <h1 className="med-dg-heading">
                  Medical Degree and Specialization
                </h1>
                <hr />
                <br />
                <div>
                  <h5 className="custom-heading">
                    {" "}
                    What Is Your Medical Specialty
                  </h5>
                  <select
                    value={selectedOption2}
                    onChange={handleSpecialtyDropdown}
                    className="med-spc-select"
                  >
                    {/* Empty option */}
                    <option className="empty-option" value="">
                      Choose Medical Speciality
                    </option>
                    {option2.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <h5 className="custom-heading">
                    {" "}
                    What Is Your Medical Dgree
                  </h5>
                  <select
                    value={selectedOption1}
                    onChange={handleDgreeDropdown}
                    className="med-spc-select"
                  >
                    <option className="empty-option" value="">
                      Choose Medical Dgree
                    </option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <h5 className="custom-heading">
                    Which university did you graduate from?
                  </h5>
                  <select
                    value={selectedOption3}
                    onChange={handleUniversityDropdown}
                    className="med-spc-select"
                  >
                    <option className="empty-option" value="">
                      Choose university
                    </option>
                    {univers.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <h5 className="custom-heading">
                    Are you board-certified? If so, which medical boards or
                    organizations have certified you?
                  </h5>
                  <input
                    type="text"
                    className="q-form-inputfield"
                    placeholder="Enter certifying boards/organizations"
                    onChange={(e) => setCertifyingBoards(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <h5 className="custom-heading">Years of experience?</h5>
                  <input
                    type="text"
                    className="q-form-inputfield"
                    placeholder="Enter Years of experience"
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                  />
                </div>

                <br />
                <hr />
                <br />
                <div className="mt-1" style={{ paddingBottom: "20px" }}>
                  <h1 className="med-dg-heading">License Information</h1>
                  <h5 className="mt-4 custom-heading ">
                    Could you provide clear images of your medical license and
                    relevant certifications?
                  </h5>
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="myFile"
                    name="filename"
                    className="mt-4 choose-photo"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="d-block   q-form-submit-btn"
                    onClick={handleSubmit}
                  >
                    {" "}
                    submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DoctorQuestionsForm;
