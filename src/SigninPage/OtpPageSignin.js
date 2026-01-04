import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './OtpPageSignin.css';
import Swal from 'sweetalert2';

const OtpPageSignin = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [devOtp, setDevOtp] = useState(""); // OTP for DEV mode display
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and devOtp from the location state
  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email);
      }
      if (location.state.devOtp) {
        setDevOtp(location.state.devOtp);
      }
    }
  }, [location.state]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const otpNumber = Number(enteredOtp);

    if (enteredOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_LOCALURL + "/api/v1/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          otp: otpNumber,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "OTP verified successfully!");
        setError("");

        Swal.fire({
          icon: 'success',
          title: 'OTP Verified!',
          text: 'Redirecting to reset password...',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/reset", { state: { email: email } });
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid OTP. Please try again.");
        setSuccess("");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="background-container-img1">
      <div className="background-container-img2">
        <div className="otp-container">
          <div className="otp-card">
            <div className="otp-icon">
              <span role="img" aria-label="shield">🛡️</span>
            </div>
            <h5>Enter OTP Code sent to</h5>
            <p>{email ? `${email.substring(0, 4)}******@gmail.com` : "Loading..."}</p>

            {/* DEV MODE: Show OTP on screen */}
            {devOtp && (
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '15px 25px',
                borderRadius: '10px',
                margin: '15px 0',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '12px', opacity: 0.8 }}>
                  🔧 DEV MODE - Your OTP Code:
                </p>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#fff',
                  letterSpacing: '8px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {devOtp}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="otp-inputs">
                {otp.map((data, index) => (
                  <input
                    className="otp-field"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
              <button type="submit" className="otp-verify-btn">
                Verify OTP
              </button>
            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPageSignin;
