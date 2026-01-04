import React from "react";
import './TermsAndConditions.css';
import termsImage from '../assets/termi.png'; // Replace with your actual image path
import { FaArrowLeft } from 'react-icons/fa';

const TermsAndConditions = () => {
  const goBack = () => {
    window.history.back(); // This function will navigate back to the previous page
  };
  return (
    <div className="terms-container">
      <div className="back-icon-container1" onClick={goBack}>
        <FaArrowLeft size={24} /> {/* Back arrow icon */}
        
      </div>
      <div className="terms-image-container">
        <img src={termsImage} alt="Terms" className="terms-image" />
      </div>
      <div className="terms-content">
        <h1>Terms</h1>
        <h2>and Conditions</h2>
        <p>
          These Terms and Conditions ("Terms") govern your use of the services
          and products provided by us ("Company," "we," "us," or "our"),
          including our websites, mobile applications, and other related
          offerings (collectively, "Services"). By accessing or using our
          Services, you agree to be bound by these Terms. If you do not agree to
          these Terms, please do not use our Services.
        </p>
        <div className="download-section1">
          <p>Download our terms and conditions</p>
          <div className="download-form-container1">
            <form className="download-form1">
              <input
                type="email"
                placeholder="name@gmail.com"
                className="email"
                required
              />
              <button type="submit" className="download-button1">
                Download now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
