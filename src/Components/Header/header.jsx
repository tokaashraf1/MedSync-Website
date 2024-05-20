import React, { useEffect, useState } from 'react';
import Logo from "../../assets/imgs/logo.png"
import "./header.css"
import HeaderDoctorData from "./HeaderDoctorData"
function Header({ initialScrolled = false, initialEnableScroll = true ,page="landing"}) {
  const [scrolled, setScrolled] = useState(initialScrolled); 
  const [enableScroll, setEnableScroll] = useState(initialEnableScroll); 
  const [doctor, setDoctor] = useState(false); 

  useEffect(() => {
    if(page==="doctor" || page==="admin" ){
      setDoctor(true)
    }
    
    if (!enableScroll) return; // Exit early if enableScroll is false
  
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`navbar-expand-lg fixed-top${
          scrolled ? " bg-white" : " bg-transparent "
        }`}
      >
        <div className={` ${doctor ? " " : " container"}`}>
          <div className="row position-relative">
            <div  className={`col-12  col-md-4 d-flex align-items-center ${doctor ? " doctor-logo" : " "}`} >
              <img
                src={Logo}
                alt=""
                className={`${scrolled ? " " : " img-before-scroll "}`}
              />
              <h3 className={`ms-2 ${scrolled ? " text-blue" : " text-white"}`}>
                MedSync{" "}
              </h3>
              <button
                className={`navbar-toggler  fs-2 text-blue position-absolute ${
                  scrolled ? "  " : " text-white"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
            </div>
            <div
        
              id="navbarSupportedContent"  className={`collapse navbar-collapse d-lg-flex justify-content-md-end col-md-8  ${doctor ? "doctor-btns " : " "}`}
            >
              <button
                className={`header-links border-0 navbar-collapse-button ${
                  scrolled ? "text-blue" : "text-white "
                }`} onClick={()=>window.location.href="/"}
              >
                Home
              </button>
              <button
                className={`header-links border-0 me-lg-3 navbar-collapse-button ${
                  scrolled ? "text-blue" : "text-white "
                }`} onClick={()=>window.location.href="/#sec2"}
              >
                About Us
              </button>
              <button
                className={`header-links border-0 me-lg-3 navbar-collapse-button ${
                  scrolled ? "text-blue " : "text-white " 
                }`} onClick={()=>window.location.href="/#sec3"}
              >
                Explore
              </button>
              {page === "landing" && (
                <div>
                  <button
                    className={`navbar-collapse-button ${
                      scrolled
                        ? "text-blue border-blue"
                        : "text-white border-white "
                    }`}
                    onClick={()=>window.location.href="/signup"}
                  >
                    Sign Up
                  </button>
                  <button
                    className={`navbar-collapse-button ${
                      scrolled
                        ? "text-blue border-blue "
                        : "text-white border-white"
                    }`}
                    onClick={()=>window.location.href="/login"}
                  >
                    Log In
                  </button>
                </div>
              )}
              {page === "admin" && (
                <button
                  className={` navbar-collapse-button ${
                    scrolled
                      ? "text-blue border-blue"
                      : "text-white border-white "
                  }`}
                >
                  Log out
                </button>
              )}
              {page === "doctor" && (
              <HeaderDoctorData/>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
