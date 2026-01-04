import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Navigate back to the previous page
  const goBackPage = () => {
    navigate(-1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the API to send OTP
      const response = await fetch(process.env.REACT_APP_LOCALURL + "/api/v1/send-otp-to-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      const data = await response.json();

      if (data.success) {
        // Go directly to Reset Password page with email and OTP
        navigate("/reset", {
          state: {
            email: email.toLowerCase(),
            devOtp: data.devOtp  // Pass OTP for display
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to send OTP. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to connect to server. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="background-container-img1">
      <div className="background-container-img2">
        <div className="forgot-password-wrapper">
          <h2 className="pass">Forgot your password?</h2>
          <div className="forgot-password-form-wrapper">
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="forgot-password-form-group">
                <label htmlFor="email" className="forgot-password-label">
                  Enter your email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={handleChange}
                  className="forgot-password-input"
                  required
                />
              </div>
              <button
                type="submit"
                className="reset-button"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Reset Password"}
              </button>
              <p className="forgot-password-back" onClick={goBackPage}>
                Back to Sign in
              </p>
            </form>
            {message && <p className="forgot-password-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
