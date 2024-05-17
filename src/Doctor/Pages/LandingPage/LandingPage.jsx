import React from "react";
import Header from "../../../Components/Header/header";
import landingSection2 from "../../../assets/imgs/landingSection2.jpg";

import { useRef } from "react";
import Patientsvg from "../../../assets/imgs/patient.svg";
import doctorsvg from "../../../assets/imgs/doctor.svg";
import healthcare from "../../../assets/imgs/healthcare.png";
import Doctorlandingpage from "../../../assets/imgs/Doctorlandingpage.jpg"
import "./LandingPage.css"

function LandingPage() {
  document.body.classList.add("doctors-landing-page");
  const down = useRef();
  const learnmore = useRef();
  const moveDown = () => {
    down.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  const learnmoredown = () => {
    learnmore.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <div>
      <Header />
      <div className="row remove-gutter ">
        <div className=" landing-img col-12 ">
          <div className="landing-sec1-overlay">
            <img
              src={Doctorlandingpage}
              alt="landing page"
              className="sec1-img"
            />
          </div>
          <div className="container ">
            <h1 className="welcome-text">Welcome To MedSync </h1>

            <button className="get-started " type="submit " onClick={moveDown}>
              {" "}
              ABOUT US{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="doctor-landingpage-sec2 " ref={down} id="sec2">
        <div className="text-center ">
          <h1 className="sec2-aboutus" style={{ color: "var(--blue)" }}>
            {" "}
            ABOUT US
          </h1>
        </div>
        <div className="container">
          <div className="row landing-sec2-content">
            <div className="col-sm-12 col-lg-6 landing-img-2">
              {" "}
              <div className="circle-border"></div>
              <img src={landingSection2} alt="landing page" />{" "}
            </div>

            <div className="landing-about col-sm-12 col-lg-6 mt-4">
              <div className="about-content">
                <h1 className="about-header">
                  MedSync: Making Patient Care Easy
                </h1>

                <div>
                  <p className=" about-text mt-4 text-black">
                    At MedSync, we understand the unique challenges that
                    healthcare professionals face in managing patient
                    information and providing optimal care. Our platform is
                    meticulously crafted to streamline the patient management
                    process, empowering doctors with efficient tools to enhance
                    patient care and maintain accurate medical records.
                  </p>
                </div>
                <button className="learn-more-btn" onClick={learnmoredown}>
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="doctorlandingpsge-section3" ref={learnmore} id="sec3">
        <div className="container sec3-cards">
          <div className="row">
            <div className="col-lg-4">
              <div className="card text-center landing-card">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={Patientsvg}
                    className="card-img-top landing-card-img"
                    alt="Vector "
                    style={{ width: "80px", height: "auto" }}
                  />
                  <h5
                    className="card-title mt-3 landing-card-title"
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "var(--blue)",
                    }}
                  >
                    Patients
                  </h5>
                  <p className="card-text landing-card-text text-black">
                    With MedSync, those concerns become a thing of the past. Our
                    platform empowers you to securely share your medical records
                    with your doctor at any time, from anywhere. Whether it's
                    for routine check-ups, consultations, or handling
                    emergencies, MedSync ensures that your healthcare journey is
                    seamless and hassle-free.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card landing-card text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={doctorsvg}
                    className="card-img-top landing-card-img"
                    alt="Vector "
                    style={{ width: "80px", height: "auto" }}
                  />
                  <h5
                    className="card-title mt-3"
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "var(--blue)",
                    }}
                  >
                    Doctors
                  </h5>
                  <p className="card-text landing-card-text text-black">
                    MedSync, your reliable partner in exceptional patient care,
                    offers instant access to medical records, facilitating
                    faster and more efficient decision-making. Whether reviewing
                    medical history, diagnosing conditions, or managing
                    emergencies, MedSync empowers you to prioritize the best
                    possible care for your patients.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card landing-card text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={healthcare}
                    className="card-img-top landing-card-img"
                    alt="Vector "
                    style={{ width: "80px", height: "auto" }}
                  />
                  <h5
                    className="card-title mt-3"
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "var(--blue)",
                    }}
                  >
                    Stay Healthy
                  </h5>
                  <p className="card-text landing-card-text text-black">
                    Discover a new level of convenience and peace of mind with
                    MedSync. Our platform keeps you connected with your
                    healthcare provider, ensuring that your medical records are
                    always accessible when you need them most. From scheduling
                    appointments to sharing test results, MedSync puts you in
                    control of your health journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage