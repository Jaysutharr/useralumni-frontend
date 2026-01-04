import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2"; // Import SweetAlert2
import './Signup.css';
import fi from '../assets/fimage1.png';
import axios from 'axios'; // Import axios for API requests

const Signup = () => {
  const [formData, setFormData] = useState({
    userId: "",
    FullName: "",
    email: "",
    password: "",
    role: "User"
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.FullName) {
      errors.FullName = "Full Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Register the user with form data (email, FullName, password)
        const registrationResponse = await axios.post(process.env.REACT_APP_LOCALURL + "/api/v1/auth/signup", formData);

        if (registrationResponse.data.success) {
          // Success alert on successful registration
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "An OTP will be sent to your email shortly.",
          });

          // Send OTP after successful registration
          const otpResponse = await axios.post(process.env.REACT_APP_LOCALURL + "/api/v1/send-otp-to-user", { email: formData.email });

          if (otpResponse.data.success) {
            // DEV MODE: Show OTP on screen if returned
            if (otpResponse.data.devOtp) {
              await Swal.fire({
                icon: "info",
                title: "🔑 Your OTP Code",
                html: `
                  <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; margin: 20px 0;">
                    ${otpResponse.data.devOtp}
                  </div>
                  <p style="color: #666; font-size: 14px;">Copy this code and use it on the next page</p>
                  <p style="color: #999; font-size: 12px;">(DEV MODE - In production, this will be sent to email)</p>
                `,
                confirmButtonText: "I copied the OTP, Continue →",
                confirmButtonColor: "#667eea",
              });
            }
            // Navigate to OTP page on successful OTP request, passing email in state
            navigate("/otp", { state: { email: formData.email } });
          } else {
            Swal.fire({
              icon: "error",
              title: "OTP Sending Failed",
              text: otpResponse.data.message || "Failed to send OTP. Please try again.",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: registrationResponse.data.message || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occurred",
          text: error.response?.data?.message || error.message || "Please try again.",
        });
      }
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="signup-container">
        <div className="progress-container-signup">
          <div className="circle-signup">
            <div className="inner-circle-signup"></div>
          </div>
          <div className="line2"></div>
          <div className="circle-signup"></div>
        </div>
        <div className="labels-signup">
          <span>Personal Details</span>
          <span>Verification</span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="register-wrapper col-sm-6">
            <h2>Create an account</h2>
            <h5 style={{ color: 'white' }}>Register yourself to start with us.</h5>
            <div className="register-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="FullName">Full Name</label>
                  <input
                    type="text"
                    id="FullName"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  {errors.FullName && <p className="error">{errors.FullName}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={formData.email || "john@email.com"}
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 8 characters"
                      required
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </span>
                  </div>
                  {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit" className="register-button">
                  Create an account
                </button>

                <div className="or-container">
                  <hr className="line" />
                  <span className="or-text">OR</span>
                  <hr className="line" />
                </div>

                <button type="button" className="google-button">
                  Continue with Google
                </button>
              </form>
              <p className="sign-in-text">
                Already registered? <span onClick={() => handleNavigation('/signin')} className="link" style={{ cursor: 'pointer', color: 'rgb(89,158,158)' }}>Sign in</span>
              </p>
              <p className="terms">
                By continuing, you agree to our <span onClick={() => handleNavigation('/terms')} className="link" style={{ cursor: 'pointer', color: 'rgb(89,158,158)' }}>Terms of Service</span>.<br />
                Read our <span onClick={() => handleNavigation('/privacy')} className="link" style={{ cursor: 'pointer', color: 'rgb(89,158,158)' }}>Privacy Policy</span>.
              </p>
            </div>
          </div>
          <div className="background-container col-sm-6">
            <img src={fi} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;