import React from 'react'
import  { useState } from 'react';
import "./Forms.css";
import BackgroundImg from "../../../assets/imgs/Doctorlandingpage.jpg";
import { handleEmailVerificationForm ,handleEmailCodeResend } from '../../../utils/Validation';
import Loading from '../../../Components/Loading/Loading';
function EmailVerfication() {
  document.body.classList.add("no-scroll");
  const [formData, setFormData] = useState({
    code: '',

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
      await handleEmailVerificationForm(formData,setErrors);
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
          <h4>Email Verification </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-content mt-4">
            <div className={`form-group ${errors.code && 'has-error'}`}>
              <label> Verification Code </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className={`form-control mt-1 ${errors.code && 'input-error'}`}
              />
              {errors.code && <div className="text-danger">{errors.code}</div>}
            </div>
            <div className="d-flex justify-content-center m-4">
              <button
                type="submit"
                className="form-btn border-0 py-2 background-blue text-white px-4 rounded-5"
              >
          Continue
              </button>
            </div>
            <p className=' '  > Didn't receive code?   <a className='text-orange small' onClick={handleEmailCodeResend}>Resend </a> </p>
            {loading&&(<Loading/>)}
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default EmailVerfication;
