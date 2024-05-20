import React from 'react'
import "./Footer.css"
import logo from "../../assets/imgs/logo.png"
function AdminFooter() {
  return (
    <footer className=" footer-admin">
      <div className="container">

      <div className="row  admin-footer-content">
  <div className='col-md-3'>
    <div className='row ft-admin-logo-con'>

    <img src={logo} alt="" className='col-4 mt-3 admin-footer-logo-img'/>
  <h1 className=' col-4 mt-4 admin-footer-logo' >MedSync</h1>
    </div>
    <p className='admin-ft-slogan'>Empowering Health, Seamless Care.</p>
  </div>
  <div className='col-md-3 mt-4 footer-links-con'>  
    <ul className='landing-footer-list'>
        <li><a href="" style={{fontWeight:"700" ,fontSize:"18px"}}>Discover</a></li>
        <li><a href="/#sec2">About us</a></li>
        <li><a href="/#sec3">Explore</a></li>
    </ul> </div>
  <div className='col-md-3 mt-4 footer-links-con'><ul className='landing-footer-list'>
        <li><a href="" style={{fontWeight:"700" ,fontSize:"18px"}}>Account</a></li>
        <li><a href="/signup">Signup</a></li>
        <li><a href="/login">Login</a></li>
    </ul> </div>
  <div className='col-md-3 mt-4 footer-links-con'><ul className='landing-footer-list'>
        <li><a href="" style={{fontWeight:"700" ,fontSize:"18px"}}>Contact Us</a></li>
        <li className='mt-3'> <a  id="email-link"  > <i className="fa fa-envelope me-1" aria-hidden="true"></i> medsync6@gmail.com</a></li>
        
    </ul> </div>
</div>
<hr  className='landing-footer-hr'/>
<div className='text-center'>  <p >&copy; 2023 MedSync. All rights reserved</p></div>
      </div>
    </footer>
  )
}

export default AdminFooter