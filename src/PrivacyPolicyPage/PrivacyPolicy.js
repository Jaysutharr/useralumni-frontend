import React from "react";
// import './ter';
import { FaArrowLeft } from 'react-icons/fa';
import policyImage from '../assets/policyi.png'; // Replace with your actual image path
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  const goBack = () => {
    window.history.back(); // This function will navigate back to the previous page
  };
  return (
    <div className="terms-container">
       <div className="back-icon-container" onClick={goBack}>
        <FaArrowLeft size={24} /> {/* Back arrow icon */}
        
      </div>
      <div className="terms-image-container">
        <img src={policyImage} alt="Terms" className="terms-image" />
      </div>
      <div className="terms-content">
        <h1>Our</h1>
        <h2>Website Policy</h2>
        <p>
        Here, we prioritize the privacy and security of our users' personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our services and products, including mobile applications, websites, and other related offerings.
        </p>
        <div className="download-section1">
          <p className="msg">Download our terms and conditions</p>
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

export default PrivacyPolicy;
