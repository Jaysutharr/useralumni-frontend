import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // Import useNavigate and useLocation
import './OtpPage.css';  // Add styling if necessary

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Initialize OTP array
  const [email, setEmail] = useState(""); // State to store the email
  const [error, setError] = useState(""); // For error handling
  const [success, setSuccess] = useState(""); // For success message
  const navigate = useNavigate();  // Initialize the navigation hook
  const location = useLocation(); // Get the location object

  // Get email from the location state
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  // Handle OTP input changes
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Prevent non-numeric input

    // Update OTP array when user types
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input field
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const enteredOtp = otp.join(""); // Join OTP array to form a string
    const otpNumber = Number(enteredOtp); // Convert to number
    console.log(`Entered OTP is ${otpNumber}`);
    console.log(`Sending email: ${email}`);
  
    try {
      // const response = await fetch("http://13.235.100.222:13417/api/v1/verify-email", {
       const response = await fetch(process.env.REACT_APP_LOCALURL+"/api/v1/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.toLowerCase(),  // Ensure email is lowercase
          otp: otpNumber // Send OTP as a number
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "OTP verified successfully!");
        setError("");
        navigate('/success');
      } else {
        const errorData = await response.json();
        console.log("Error response: ", errorData);  // Debug API response
        setError(errorData.message || "Invalid OTP. Please try again.");
        setSuccess("");
      }
    } catch (error) {
      console.log("Request failed: ", error);  // Debug any potential network or API failures
      setError("An error occurred. Please try again later.");
      setSuccess("");
    }
  };
  const handleVerifyOtp = (e) => {
  e.preventDefault(); // 🔴 important if inside form
  navigate("/success"); // 👉 SuccessPage route
};
  return (
    <>
      <div className="background-container-img">
        <div className="signup-container1">
          <div className="progress-container1">
            <div className="circle1">
              <div className="inner-circle1">
                &#10003; {/* Unicode for checkmark */}
              </div>
            </div>
            <div className="line1"></div>
            <div className="circle1">
              <div className="inner-circle2"></div>
            </div>
          </div>
          <div className="labels">
            <span>Personal Details</span>
            <span>Verification</span>
          </div>
        </div>

        <div className="otp-container">
          <div className="otp-card">
            <div className="otp-icon">
              <span role="img" aria-label="shield">🛡️</span>
            </div>
            <h5>Enter OTP Code sent to</h5>
            {/* Display the user's email dynamically */}
            <p>{email ? `${email.substring(0, 4)}******@gmail.com` : "Loading..."}</p>
            <form onSubmit={handleSubmit}>
              <div className="otp-inputs">
                {otp.map((data, index) => {
                  return (
                    <input
                      className="otp-field"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()} // Select text on focus
                    />
                  );
                })}
              </div>
              <button
  type="submit"
  className="otp-verify-btn"
  onClick={handleVerifyOtp}
>
  Verify OTP
</button>

            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;