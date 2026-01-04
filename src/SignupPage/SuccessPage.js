import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css'; // Add CSS for styling

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleContactSupportClick = () => {
    // Redirect or show support contact information
    navigate('/support');
  };

  return (
    <>
      <div className="signup-container2">
        <div className="progress-container2">
          <div className="circle2">
            <div className="inner-circle3">
              &#10003; {/* Unicode for checkmark */}
            </div>
          </div>
          <div className="line2"></div>
          <div className="circle2">
            <div className="inner-circle3">
            &#10003;
            </div>
          </div>
        </div>
        <div className="labels">
          <span>Personal Details</span>
          <span>Verification</span>
        </div>
      </div>
      <div className="success-container">
        <h1>Registration Successful!</h1>
        <p className='success-msg'> 
          <span className="congratulations">Congratulations!</span> Your registration was completed successfully.
          You can now log in to your account using your credentials.
          If you have any questions or need further assistance, feel free to reach out to our support team.
        </p>
        <div className="button-container">
          <button className="support-btn" onClick={handleContactSupportClick}>Contact support</button>
          <button className="login-btn" onClick={handleLoginClick}>Log in</button>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
