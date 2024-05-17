import React, { useState } from 'react';
import "./SignUp.css";
import BackgroundImg from "../../../assets/imgs/Doctorlandingpage.jpg";
import { handleCheckEmail, handleSignupForm } from '../../../utils/Validation';
import Loading from '../../../Components/Loading/Loading';
function SignUp() {
  
  document.body.classList.add("no-scroll");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleBlurEmail = async () => {
    await handleCheckEmail(formData, setEmailExists);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await handleSignupForm(formData, emailExists, setEmailExists, setErrors);
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
        <div className="position-absolute form-container bg-white py-5 rounded-4">
          <div className="text-center">
            <h4>Sign Up</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-content mt-4">
              <div className={`form-group ${errors.name && 'has-error'}`}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-control mt-1 ${errors.name && 'input-error'}`}
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              <div className={`form-group ${errors.email && 'has-error'}`}>
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  onBlur={handleBlurEmail}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-control mt-1 ${errors.email && 'input-error'}`}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className={`form-group mt-2 ${errors.password && 'has-error'}`}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-control mt-1 ${errors.password && 'input-error'}`}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              <div className={`form-group mt-2 ${errors.confirmPassword && 'has-error'}`}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-control mt-1 ${errors.confirmPassword && 'input-error'}`}
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              </div>
              <div className="d-flex justify-content-center m-4">
                <button
                  type="submit"
                  className="form-btn border-0 py-2 background-blue text-white px-4 rounded-5"
                >
                  Sign Up
                </button>
              </div>
              <div className="text-center mt-5">
                <p className='text-blue'>
                  Already have an account?
                  <a href="/login" className="ms-2 text-orange">Login</a>
                </p>
                {loading&&(<Loading/>)}
              </div>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
