import React from "react";
import { useNavigate } from "react-router-dom";

import "./SignupVerificationPage.css";
import background from '../../assets/background.png';
import otpIcon from '../../assets/otp-icon.png';

const SignupVerificationPage = () => {
  const navigate = useNavigate();

const handleVerifyOtp = () => {
  // 👉 Optional: verify OTP via API first

  navigate("/success"); // 👈 SuccessPage route
};

  return (
    <div
      className="verification-wrapper"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* OTP Card */}
      <div className="verification-card">
        <img src={otpIcon} alt="OTP Icon" className="otp-icon" />

        <h2>Enter OTP Code sent to</h2>
        <p>Jay1******@gmail.com</p>

        <div className="otp-inputs">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
        </div>

        {/* <button className="verify-btn">Verify OTP</button> */}
        <button className="verify-btn" onClick={handleVerifyOtp}>
  Verify OTP
</button>

      </div>
    </div>
  );
};


export default SignupVerificationPage;
