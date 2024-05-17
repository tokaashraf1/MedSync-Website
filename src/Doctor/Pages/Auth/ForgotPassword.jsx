import React from 'react'
import  { useState } from 'react';
import "./Forms.css";
import BackgroundImg from "../../../assets/imgs/Doctorlandingpage.jpg";
import { handleForgotPasswordForm } from '../../../utils/Validation';
import Loading from '../../../Components/Loading/Loading';

function ForgotPassword() {
  document.body.classList.add("no-scroll");
  const [formData, setFormData] = useState({
    email: '',

  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await handleForgotPasswordForm(formData,setErrors);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="vh-100">
    <div className="position-relative form-background-contaiener">
      <img src={BackgroundImg} alt="" className="form-background" />
      <div className="position-absolute form-container bg-white py-5 rounded-4 ">
        <div className="text-center">
          <h4>Forgot Password </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-content mt-4">
            <div className={`form-group ${errors.email && 'has-error'}`}>
              <label>Email </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control mt-1 ${errors.email && 'input-error'}`}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="d-flex justify-content-center m-4">
              <button
                type="submit"
                className="form-btn border-0 py-2 background-blue text-white px-4 rounded-5"
              >
          Send
              </button>
            </div>
            {loading&&(<Loading/>)}
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword