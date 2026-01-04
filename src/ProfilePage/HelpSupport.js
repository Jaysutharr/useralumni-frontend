import React, { useState,useEffect } from 'react';
import './HelpSupport.css';
import cI from '../assets/callImage.jpeg'
import mI from '../assets/profilehelpImage.jpeg'
import cpI from '../assets/callingImage.jpeg'
import { FaArrowUp } from 'react-icons/fa'; 
import ProfilePage from './ProfilePage';
import pI from '../assets/ProfileImage.jpeg'
import { useNavigate } from 'react-router-dom';

const HelpSupport = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [openGuide, setOpenGuide] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();


  
  useEffect(() => {
    // Simulate an API call with mock data
    const mockData = {
      profilePicture: pI,
      firstName: "Ananya",
      lastName: "Sharma",
      jobTitle: "Senior Software Engineer",
      location: "Pune, Maharashtra",

    };

    // Simulate a delay like a real API call
    setTimeout(() => {
      setProfileData(mockData);
    }, 1000); // 1 second delay
  }, []);

  if (!profileData) {
    return <div>Loading...</div>; // Show loading message while data is being "fetched"
  }
// ----------------------------
  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close if clicked again
    } else {
      setOpenFAQ(index);
    }
  };
  // ========================

  const toggleGuide = (index) => {
    if (openGuide === index) {
      setOpenGuide(null); // Close if clicked again
    } else {
      setOpenGuide(index);
    }
  };
   // Handle logout button click to open the popup
   const handleLogoutClick = () => {
    setIsModelOpen(true);
  };

  // Handle cancel button to close the popup
  const handleCancel = () => {
    setIsModelOpen(false);
  };

  // Handle confirm button to redirect to sign-in page
  const handleConfirm = () => {
    setIsModelOpen(false);
    navigate('/signin'); // Redirect to sign-in page
  };


  return (
   <>
   <ProfilePage/>
   <div className="profile-container-acc">
    <div className={`sidebar-profile ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar1-profile">
        <ul>
          <li  onClick={() => navigate('/profile')}>
            My Profile
          </li>
          <li  onClick={() => navigate('/academics')}>
            Academics Information
          </li>
          <li onClick={() => navigate('/security')}>
            Security
          </li>
          <li onClick={() => navigate('/teams-connections')}>
            Teams & Connections
          </li>
          <li  onClick={() => navigate('/settings')}>
            Settings
          </li>
          <li className="active1" onClick={() => navigate('/help-support')}>
            Help & Support
          </li>
          {/* Logout button that triggers the popup */}
          <li onClick={handleLogoutClick}>
            Logout
          </li>
        </ul>
      </div>

      {/* Conditional rendering of the popup based on isModelOpen */}
      {isModelOpen && (
        <>
          {/* Faded background overlay */}
          <div className="popup-overlay"></div>

          {/* The actual popup box */}
          <div className="popup-box">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out? You'll be logged out of your account and redirected to the sign-in page.</p>
            <h7 className="reminder">(Remember to save any unsaved work before logging out.)</h7>
            <div className="popup-buttons">
              <button onClick={handleCancel} className="cancel-button"><h2>Cancel</h2></button>
              <button onClick={handleConfirm} className="confirm-button"><h2>Confirm</h2></button>
            </div>
          </div>
        </>
      )}


    </div>
   <div className="profile-header-set">
        <img
          src={profileData.profilePicture}
          alt="Profile"
          className="profile-picture-set"
        />
        <div className="profile-info-set">
          <h2>{profileData.firstName} {profileData.lastName}</h2>
          <p>{profileData.jobTitle}<br />{profileData.location}</p>
        </div>
        <button className="edit-button-set"><svg width="13" height="13" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
          <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
        </svg> <h2 >Edit</h2></button>
      </div>
   {/* ========================================================================= */}
   <div className="faq-wrapper">
      <h3>Frequently Asked Questions (FAQs):</h3>
      <div className="faq-container">
        <div className="faq-item">
          <button onClick={() => toggleFAQ(0)} className="faq-question">
            General FAQs:
            <span className={`faq-arrow ${openFAQ === 0 ? 'up' : 'down'}`}></span>
          </button>
          {openFAQ === 0 && (
            <div className="faq-answer">
              <p>1. What is the purpose of this application?</p>
              <p>2. How do I create an account?</p>
              <p>3. How do I reset my password?</p>
              <p>4. Can I delete my account?</p>
            </div>
          )}
        </div>

        <div className="faq-item">
          <button onClick={() => toggleFAQ(1)} className="faq-question">
            Account and Privacy FAQs:
            <span className={`faq-arrow ${openFAQ === 1 ? 'up' : 'down'}`}></span>
          </button>
          {openFAQ === 1 && (
            <div className="faq-answer">
              <p>1. How do I change my account settings?</p>
              <p>2. Is my personal data secure?</p>
              <p>3. Can I recover a deleted account?</p>
              <p>4. How do I update my email address?</p>
            </div>
          )}
        </div>

        <div className="faq-item">
          <button onClick={() => toggleFAQ(2)} className="faq-question">
            Notifications and Messaging FAQs:
            <span className={`faq-arrow ${openFAQ === 2 ? 'up' : 'down'}`}></span>
          </button>
          {openFAQ === 2 && (
            <div className="faq-answer">
              <p>1. How do I manage notifications?</p>
              <p>2. Can I mute specific conversations?</p>
              <p>3. How do I enable push notifications?</p>
              <p>4. Why am I not receiving messages?</p>
            </div>
          )}
        </div>

        <div className="faq-item">
          <button onClick={() => toggleFAQ(3)} className="faq-question">
            Technical FAQs:
            <span className={`faq-arrow ${openFAQ === 3 ? 'up' : 'down'}`}></span>
          </button>
          {openFAQ === 3 && (
            <div className="faq-answer">
              <p>1. What browsers are supported?</p>
              <p>2. How do I report a technical issue?</p>
              <p>3. Is there an app for this platform?</p>
              <p>4. What happens if the app crashes?</p>
            </div>
          )}
        </div>
      </div>
    </div>
    {/* // -------------------------------------------------------------------- */}
    <div className="guide-wrapper">
    <h3>Step-by-Step Guides:</h3>
    <div className="guide-container">
      <div className="guide-item">
        <button onClick={() => toggleGuide(0)} className="guide-question">
          Profile Setup
          <span className={`guide-arrow ${openGuide === 0 ? 'up' : 'down'}`}></span>
        </button>
        {openGuide === 0 && (
          <div className="guide-answer">
          <iframe
          className='video-image'
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        )}
      </div>

      <div className="guide-item">
        <button onClick={() => toggleGuide(1)} className="guide-question">
          Connecting with Alumni
          <span className={`guide-arrow ${openGuide === 1 ? 'up' : 'down'}`}></span>
        </button>
        {openGuide === 1 && (
          <div className="guide-answer">
            <iframe
             className='video-image'
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <div className="guide-item">
        <button onClick={() => toggleGuide(2)} className="guide-question">
          Profile Setup
          <span className={`guide-arrow ${openGuide === 2 ? 'up' : 'down'}`}></span>
        </button>
        {openGuide === 2 && (
           <div className="guide-answer">
           <iframe
           className='video-image'
             width="100%"
             height="200"
             src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
             title="YouTube video"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
           ></iframe>
         </div>
        )}
      </div>
    </div>
  </div>
  {/* ========================================================== */}
  <div className="network-support-container">
      <h3>Contact Support :</h3>
      <div className="network-support-boxes">
        <div className="network-support-box">
          <img src={cI} alt="Live Chat" className="network-support-icon" />
          <p className="network-support-text">Live Chat</p>
        </div>
        <div className="network-support-box">
          <img src={mI} alt="Email Support" className="network-support-icon1" />
          <p className="network-support-text1">Email Support</p>
        </div>
        <div className="network-support-box">
          <img src={cpI} alt="Call Support" className="network-support-icon" />
          <p className="network-support-text">Call Support</p>
        </div>
      </div>
    </div>
    {/* ======================================================================= */}
    <div className="network-feedback-container">
      <h3>Feedback and Suggestions :</h3>
      <div className="network-feedback-box">
        <textarea
          className="network-feedback-input"
          placeholder="Write your message."
        ></textarea>
        <span className='arrow-feedback'>
        <svg width="34" height="35" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.742251 22.5173C0.713306 10.5978 10.3635 0.930271 22.3293 0.872382C34.2487 0.820281 43.9684 10.5168 43.9973 22.4825C44.0205 34.4136 34.3066 44.139 22.364 44.1274C10.4156 44.1159 0.765408 34.4715 0.742251 22.5173ZM25.1485 19.426C25.1832 19.4086 25.2179 19.3912 25.2527 19.3681C25.7853 19.8833 26.3121 20.3985 26.8504 20.9137C27.5683 21.6026 28.4366 21.8052 29.3744 21.5389C31.3311 20.9832 31.8579 18.6039 30.3643 17.1335C28.3556 15.1537 26.3352 13.1913 24.3091 11.223C23.0818 10.0305 21.6056 10.0537 20.39 11.2693C18.7633 12.8902 17.1366 14.5169 15.5157 16.1436C15.0525 16.6068 14.5721 17.0583 14.1379 17.5504C13.4027 18.3724 13.3101 19.5996 13.8774 20.549C14.4389 21.4868 15.533 21.95 16.6098 21.7416C17.345 21.5968 17.8486 21.1279 18.3465 20.6243C18.7227 20.2364 19.1106 19.8601 19.4985 19.4723C19.6027 20.3059 19.6027 21.0932 19.6027 21.8747C19.6027 25.1744 19.5969 28.4683 19.6027 31.768C19.6084 33.7768 21.4435 35.1198 23.2786 34.4888C24.4364 34.0894 25.1543 33.0416 25.1543 31.7217C25.1543 27.7968 25.1543 23.8719 25.1543 19.947C25.1543 19.7733 25.1543 19.5939 25.1543 19.4202L25.1485 19.426Z" fill="#58A4B0"/>
</svg>
</span>

        </div>
      </div>
    </div>
  </>
  );
};

export default HelpSupport;
