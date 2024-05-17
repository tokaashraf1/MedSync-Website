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
