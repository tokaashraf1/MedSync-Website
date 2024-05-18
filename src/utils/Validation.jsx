import axios from "axios";
import API_ENDPOINT from "./constants";
export const handleCheckEmail = async (formData, setEmailExists) => {
  const apiUrl = `${API_ENDPOINT}/api/check-email`;
  const { email } = formData;
  try {
    const response = await axios.post(apiUrl, { email });
    setEmailExists(response.data.exists);
  } catch (error) {
    console.error("Email check failed:", error);
  }
};

export const handleSignupForm = async (
  formData,
  emailExists,
  setEmailExists,
  setErrors
) => {
  try {
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (emailExists) {
      validationErrors.email = "Email already exists";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const { name, email, password, confirmPassword } = formData;
      const data1 = {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        role: "doctor",
      };

      const response = await axios.post(`${API_ENDPOINT}/api/register`, data1, {
        headers: { "Content-Type": "application/json" },
      });

      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("authusername", name);

      console.log(authToken);
      window.location.href = "/emailver"; // Redirect to email verification page upon successful sign-up
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

export const handleLoginForm = async (formData, setErrors) => {
  try {
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const { email, password } = formData;
      const data1 = {
        email,
        password,
      };

      const response = await axios.post(`${API_ENDPOINT}/api/login`, data1, {
        headers: { "Content-Type": "application/json" },
      });

      const authToken = response.data.token;
      const loginUserName = response.data.user.name;
      const profileimg = response.data.user.profile_photo_url;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("loginUserName", loginUserName);
      localStorage.setItem("profileimg", profileimg);

      console.log(authToken);
      if (response.data.user.status === "active") {
        window.location.href = "/home";
      } else {
        window.location.href = "/";
      }
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
export const handleAdminLoginForm = async (formData, setErrors) => {
  try {
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const { email, password } = formData;
      const data1 = {
        email,
        password,
      };

      const response = await axios.post(`${API_ENDPOINT}/api/login`, data1, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem('loginEmail', email);
      window.location.href='/adminhome'
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

export const handleForgotPasswordForm = async (formData, setErrors) => {
  try {
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const { email } = formData;
      const data1 = {
        email,};
      const response = await axios.post(
        `${API_ENDPOINT}/api/password/forgot-password`,
        data1,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem('resetEmail', email);
      console.log(response.data);
      window.location.href = '/verifycode';
    }
  } catch (error) {
    console.error("Forgot Password:", error);
  }
};
export const handleverifycodeForm = async (formData, setErrors) => {
  try {
    const validationErrors = {};
    if (!formData.code.trim()) {
      validationErrors.email = "Code is required";
    } 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

      const { code } = formData;
      const storedEmail = localStorage.getItem('resetEmail');
      const data1 = {
        email: storedEmail,
          otp: code,
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/password/verify-otp`,
        data1,
        {
          headers: { "Content-Type": "application/json" },
          Accept: 'application/json',
        }
      );

    if (response?.data) {
        console.log(response.data);
        window.location.href = '/resetpass';
      }
    }
  } catch (error) {
    console.error("Forgot Password:", error);
  }
};
export const handleEmailVerificationForm = async (formData, setErrors) => {
  try {
    const validationErrors = {};
    if (!formData.code.trim()) {
      validationErrors.code = "Code is required";
    } 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {


      const { code } = formData;
      const storedEmail = localStorage.getItem('userEmail');
      const storedToken = localStorage.getItem('authToken');

      const data1 = {
        email: storedEmail,
          otp: code,
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/email-verification`,
        data1,
        {
          headers: { "Content-Type": "application/json" },
          Accept: 'application/json',
          Authorization: `Bearer ${storedToken}`,
        }
      );

      window.location.href = '/doctorsquestions';
    }
  } catch (error) {
    console.error("email verfication:", error);
  }
};
export const handleResetPasswordForm = async (formData, setErrors) => {
  try {
    const validationErrors = {};
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

      const { password } = formData;
      const storedEmail = localStorage.getItem('resetEmail');
      const data1 = {
        email: storedEmail,
        password:password
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/password/reset`,
        data1,
        {
          headers: { "Content-Type": "application/json" },
          Accept: 'application/json',
        }
      );
      console.log(response.data);
      window.location.href = '/login';
    
    }
  } catch (error) {
    console.error("Reset Password:", error);
  }
};

export const handleResend = async () => {
  const apiUrl = `${API_ENDPOINT}/api/password/forgot-password`; // Replace with your actual API URL
  const storedEmail = localStorage.getItem('resetEmail');

  try {
    const response = await axios.post(apiUrl, {
      email: storedEmail,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Forgot password request failed:', error.response ? error.response.data : error.message);
  }
};

export const handleEmailCodeResend = async () => {
  const apiUrl = `${API_ENDPOINT}/api/resend-email-verification`; // Replace with your actual API URL
  const storedEmail = localStorage.getItem('userEmail');
  try {
    const response = await axios.post(apiUrl, {
      email: storedEmail,
    });
    console.log(response.data);
  } catch (error) {
    // Handle unsuccessful API response or network error
    console.error('resenf email verfication', error.response ? error.response.data : error.message);
  }
};