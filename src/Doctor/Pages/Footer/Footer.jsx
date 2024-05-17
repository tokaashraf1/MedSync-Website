import React from "react";
import logo from "../../../assets/imgs/logo.png";
import "./Footer.css";
function Footer() {
  return (
    <footer className=" footer">
      <div className="container">
        <div className="row  landing-footer-content">
          <div className="col-md-3">
            <div className="row ft-logo-con">
              <img
                src={logo}
                alt=""
                className="col-4 mt-3 landing-footer-logo-img"
              />
              <h1 className=" col-4 mt-4 landing-footer-logo">MedSync</h1>
            </div>
            <p className="slogan">Empowering Health, Seamless Care.</p>
          </div>
          <div className="col-md-3 mt-4 footer-links-con">
            <ul className="landing-footer-list">
              <li>
                <a href="" style={{ fontWeight: "700", fontSize: "18px" }}>
                  Discover
                </a>
              </li>
              <li>
                <a href="/#sec2">About us</a>
              </li>
              <li>
                <a href="/#sec3">Learn More</a>
              </li>
            </ul>{" "}
          </div>
          <div className="col-md-3 mt-4 footer-links-con">
            <ul className="landing-footer-list">
              <li>
                <a href="" style={{ fontWeight: "700", fontSize: "18px" }}>
                  Account
                </a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>{" "}
          </div>
          <div className="col-md-3 mt-4 footer-links-con">
            <ul className="landing-footer-list">
              <li>
                <a href="" style={{ fontWeight: "700", fontSize: "18px" }}>
                  Contact Us
                </a>
              </li>
              <li className="mt-3">
                {" "}
                <a id="email-link">
                  {" "}
                  <i
                    className="fa fa-envelope me-1"
                    aria-hidden="true"
                  ></i>{" "}
                  medsync6@gmail.com
                </a>
              </li>
            </ul>{" "}
          </div>
        </div>
        <hr className="landing-footer-hr" />
        <div className="text-center">
          {" "}
          <p>&copy; 2023 MedSync. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
