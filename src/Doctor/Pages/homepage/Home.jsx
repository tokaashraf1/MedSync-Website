import React, { useContext } from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import Footer from "../../../Components/Footer/Footer";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import doctorhome from "../../../assets/imgs/doctorhome.svg";
import axios from "axios";
import API_ENDPOINT from "../../../utils/constants";
import Header from "../../../Components/Header/header";
import { ClinicsContext } from "../../../Contexts/ClinicsProvider";
import PatientsList from "./PatientsList";
import AddClinicSection from "./AddClinicSection";
import Credit from "../../../assets/imgs/credit-cards (1).png";
import { SettingsContext } from "../../../Contexts/SettingProvider";
function Home() {
  document.body.classList.add("home-body");
  document.body.classList.add("doctors-q-body");
  const [username, setUsername] = useState(false);
  const [profileimg, setprofileimg] = useState();
  const [token, settoken] = useState();
  const [regions, setRegions] = useState([]);
  const [shouldRenderRegions, setShouldRenderRegions] = useState(false);
  const { balanceResponse } = useContext(SettingsContext);
  const {
    percent,
    ptients,
    addclinic,
    handlePatientsSectionClick,
    handlClinicsSectionClick,updateFlag
  } = useContext(ClinicsContext);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    settoken(authToken);
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    var loginUserName = localStorage.getItem("loginUserName");
    var profileimg = localStorage.getItem("profileimg");
    setUsername(loginUserName);
    setprofileimg(profileimg);
  }, []);

  useEffect(() => {
    const apiUrl = `${API_ENDPOINT}/api/doctor/get/workplaces`;
    const fetchData = async () => {
      if (!token) {
        console.error("API token is missing!");
        return;
      }
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setRegions(response.data.workplaces);
        setShouldRenderRegions(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token,updateFlag]);

  return (
    <div>
      <Header
        initialScrolled={true}
        initialEnableScroll={false}
        page="doctor"
      />
      <div className="row sec1-con">
        <div>
          {shouldRenderRegions && regions && regions.length > 0 && (
            <div className="clincs-name row">
              {regions.map((region, index) => (
                <div key={index} className="col-3">
                  {region.region.english_name} clinic
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-8 welcome-section order-md-1 order-1">
          <div className="welcome-section-txt">
            <div className="row">
              <h1
                style={{ color: "white" }}
                className="with-line col-12 col-md-8"
              >
                Welcome Dr.{username}
              </h1>
              {/* <img
                className="col-3 d-none d-md-block"
                src={doctorhome}
                alt=""
              /> */}
              <div className="col-3 d-none d-md-block bg-white rounded-5  shadow py-3">
                <p className="mt-4 d-flex justify-content-center text-black">
                  <img src={Credit} alt="" className="me-2" />{" "}
                  {balanceResponse ? balanceResponse : "0:00"}
                </p>
                <p className="fs-6 text-black d-flex justify-content-center ms-1 ">
                  Current Balance
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-none d-md-block order-md-2 ">
          <Calendar />
        </div>
        <div className="col-md-8 clinic-section order-md-3 order-4">
          <div className="d-flex justify-content-center mt-5 approve-patient-btns">
            <button
              className={`${ptients ? "homePageBtns shadow " : ""}`}
              onClick={handlePatientsSectionClick}
            >
              Patients
            </button>
            <button
              className={`ms-2 bg-gray ${
                addclinic ? "homePageBtns shadow " : ""
              }`}
              onClick={handlClinicsSectionClick}
            >
              {" "}
              Clinics
            </button>
          </div>
          {ptients && <PatientsList />}
          {addclinic && <AddClinicSection />}
        </div>
        <div className="col-md-4 complete-profile order-md-4 order-3">
          <div className="row mt-5 ms-2">
            <div className="col-6 complete-profile-circle">
              <div className="text-center ">
                <h1> {percent}</h1>
              </div>
            </div>
            <div className="col-6">
              <p>Profile Informations</p>
            </div>
          </div>
          <div>
            <button
              className=" "
              onClick={() => (window.location.href = "/profile")}
            >
              check your profile now{" "}
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      <Sidebar />
      <Footer />
    </div>
  );
}

export default Home;
