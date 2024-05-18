import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./AdminLogin.css"
import landingPageImag from "../../assets/imgs/landingPageImg.jpg";
import Captcha from "../../components/Capcha/Capcha"
import API_ENDPOINT from '../../hooks/constants';
function AdminLogin() {
  document.body.classList.add("admin-login-body");
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); 
  const handleRegister = async () => {
    try {
      setLoading(true); 
      const response = await axios.post(`${API_ENDPOINT}/api/admin/login`, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      localStorage.setItem('loginEmail', email);
      window.location.href='/adminhome'


    } catch (error) {
      // Handle registration error
      if (error.response && error.response.status === 422) {
        // Log or display validation errors
        console.error('Validation errors:', error.response.data.errors);
      } else {
        console.error('Registration failed:', error);
      }
    }
    setLoading(false); 
  };


  function validateForm(e) {
    e.preventDefault();
  
  
    var hasErrors = false;
  document.getElementById("adminlogin-email-span").classList.remove("error-msg");
  document.getElementById("adminlogin-pass-span").classList.remove("error-msg");
  document.getElementById('email').style.border = "1px solid blue";
  document.getElementById('pass').style.border = "1px solid blue";

  document.getElementById("adminlogin-email-span").innerText = '';
  document.getElementById("adminlogin-pass-span").innerText = '';
  document.getElementById("adminlogin-pass-p").innerText = '';
  document.getElementById("adminlogin-email-p").innerText = '';
  
  var email = document.getElementById('email').value;
  if (email === "") {
    document.getElementById("adminlogin-email-span").classList.add("error-msg");
    document.getElementById("adminlogin-email-span").innerText = ' Required';
    document.getElementById('email').style.border = "1px solid red";

    hasErrors = true;
  
  }

  var password = document.getElementById('pass').value;
  if (password === "") {
    document.getElementById("adminlogin-pass-span").classList.add("error-msg");
    document.getElementById("adminlogin-pass-span").innerText = ' Required';
    document.getElementById('pass').style.border = "1px solid red";
    
    hasErrors = true;
  
  }

  if ( password.length < 8 &&  password.length >0 ) {

    document.getElementById("adminlogin-pass-p").innerText = ' Password must be at least 8 characters';
    document.getElementById('pass').style.border = "1px solid red";

  
    hasErrors = true;

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(email.trim() === ''){
  document.getElementById('adminlogin-email-p').innerText = '';
}
else if ( !emailRegex.test(email)) {
  document.getElementById('adminlogin-email-p').innerText = ' Invalid email address';
  document.getElementById('email').style.border = '1px solid red';

  hasErrors = true;
} else {
  // Valid phone number, clear error message and border
  document.getElementById('adminlogin-email-p').innerText = '';

}



if (hasErrors) {
  console.log("Form has errors. Submission prevented.");
  return false;
} else {
  console.log("Form submitted successfully!");
  return true;
}
  }

  return (

    <div>

      <div className='adminlogin-section1 '>
      <img src={landingPageImag} className='adminlogin-img ' />
    <div className='text-center'>
        <div className='adminlogin-form'>
        <div className="text-center ">
          <i
            class="fa fa-user-circle forgot-pass-icon mt-5 "
            aria-hidden="true"
          ></i>
          <h1 className='mt-2 ' style={{fontWeight:"700", fontSize:"30px"}}>Admin Login</h1>
        
        </div>
          <div className='adminlogin-form-inputs mt-3'>
          <form action="" onSubmit={(e) => validateForm(e)}>
            <label htmlFor="email" className="d-block mt-2">
                      Email <span id="adminlogin-email-span" ></span>
                    </label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    <p id="adminlogin-email-p" style={{color:"red"}}></p>
            
            
                    <label htmlFor="pass" className="d-block mt-4 ">
                      Password  <span  id="adminlogin-pass-span"></span>
                    </label>
                    <input type="password" id="pass" onChange={(e) => setPassword(e.target.value)} />
                    <p id="adminlogin-pass-p" style={{color:"red"}}></p>
                  
            
                    <button className="login-page-btn  d-block m-auto mt-5"  type="submit" onClick={ handleRegister } >
              Log In
                    </button>
          </form>
            
             </div>
        
        </div>
      

      </div>
      </div>
      {loading && (
        <div className="loading-popup">
          <div class="load"></div>
        </div>
      )}
        <Captcha/>
    </div>
  )
}

export default AdminLogin