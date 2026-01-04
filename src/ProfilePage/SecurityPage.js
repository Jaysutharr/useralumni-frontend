import React, { useState, useEffect } from 'react';
import './ProfileFirst.css'; // Import the CSS for styling
import './SecurityPage.css'
// import Profilecommon from './Profilecommon';
import ProfilePage from './ProfilePage';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaSave, FaTimes } from 'react-icons/fa';
import pI from '../assets/ProfileImage.jpeg'


const SecurityPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authMethod, setAuthMethod] = useState('mobile');

  const [activities, setActivities] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  // Password state and visibility toggles
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  // const [selectedOption, setSelectedOption] = useState(''); // Store the selected option

const [selectedOptions, setSelectedOptions] = useState(null);  // State to track the selected radio option
  const [isSetupClicked, setIsSetupClicked] = useState(false); // State to track if the Set-up button is clicked

  const handleSetupClick = () => {
    if (selectedOptions) {
      setIsSetupClicked(true);  // Proceed to display the selected form when Set-up is clicked
    }
  };

  const handleBackClick = () => {
    setIsSetupClicked(false);  // Reset to initial view when back button is clicked
  };


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update the state with the selected value
  };
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    // Check password strength
    if (value.length > 8 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
      setPasswordStrength('strong');
    } else if (value.length >= 6) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Fetch data from the backend API
  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALURL+'/api/account-activity')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching account activity:', error));
  }, []);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [isOpen, setIsOpen] = useState(false);
  if (!profileData) {
    return <div>Loading...</div>; // Show loading message while data is being "fetched"
  }
  // useEffect(() => {
  //   fetch('https://your-backend-api.com/profile')
  //     .then(response => response.json())
  //     .then(data => setProfileData(data))
  //     .catch(error => console.error('Error fetching profile data:', error));
  // }, []);

  const openModalEdit = () => setIsOpen(true);
  const closeModalEdit = () => setIsOpen(false);

 
  return (

    <>
      <ProfilePage />
      <div className="profile-container-acc">
      {/* Profile Header */}
      <div className={`sidebar-profile ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar1-profile">
        <ul>
          <li  onClick={() => navigate('/profile')}>
            My Profile
          </li>
          <li onClick={() => navigate('/academics')}>
            Academics Information
          </li>
          <li className="active1"  onClick={() => navigate('/security')}>
            Security
          </li>
          <li onClick={() => navigate('/teams-connections')}>
            Teams & Connections
          </li>
          <li onClick={() => navigate('/settings')}>
            Settings
          </li>
          <li onClick={() => navigate('/help-support')}>
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
      <div className="profile-container-set">
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
          <button onClick={openModalEdit} className="edit-button-set"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
            <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
          </svg> Edit</button>
          {isOpen && (
            <div className="profilenameedit-modal-overlay">
              <div className="profilenameedit-modal-content">
                <span className="profilenameedit-close" onClick={closeModalEdit}>&times;</span>
                <div className="profilenameedit-modal-header">
                  <img
                    src={pI} // Replace with the actual image URL or import
                    alt="Ananya Sharma"
                    className="profilenameedit-avatar"
                  />
                  <h2>Ananya Sharma</h2>
                </div>

                <div className="profilenameedit-modal-body">
                  <div className="profilenameedit-modal-row">
                    <span className="profilenameedit-field">Bio</span>
                    <p>Senior Software Engineer</p>
                    <span className="profilenameedit-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                  <div className="profilenameedit-modal-row">
                    <span className="profilenameedit-field">Location</span>
                    <p>Pune, Maharashtra</p>
                    <span className="profilenameedit-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                </div>

                <div className="profilenameedit-modal-footer">
                  <button className="profilenameedit-discard-button" onClick={closeModalEdit}>
                    Discard
                  </button>
                  <button className="profilenameedit-save-button">Save changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
{/* =========================================================================== */}
        <div className="container2">
          {/* Password Management Section */}
          <div className="password-management">
            <h2>Password Management</h2>
            <div className="edit-password-container">
              <div className="edit-but-container" onClick={openModal}>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="edit-but"
                >
                  <path
                    d="M1.5 15H2.598L13.296 4.302L12.198 3.204L1.5 13.902V15ZM0.5 16V13.48L13.68 0.288C13.7833 0.196667 13.8967 0.126 14.02 0.0760001C14.1433 0.0260001 14.2723 0.000666559 14.407 -1.07363e-07C14.5417 -0.000666774 14.6717 0.0206667 14.797 0.064C14.9237 0.106 15.0403 0.182 15.147 0.292L16.214 1.366C16.324 1.472 16.3993 1.58867 16.44 1.716C16.48 1.84267 16.5 1.96933 16.5 2.096C16.5 2.232 16.4773 2.362 16.432 2.486C16.386 2.60933 16.3133 2.72233 16.214 2.825L3.019 16H0.5ZM12.738 3.762L12.198 3.204L13.296 4.302L12.738 3.762Z"
                    fill="#1B1B1E"
                  />
                </svg>
              </div>

              {isModalOpen && (
                <div className="modal-securitypassword">
                  <div className="modal-content-securitypassword">
                    <div className="modal-header-securitypassword">
                      <h2>Change your Password</h2>
                      <FaTimes className="close-icon-securitypassword" onClick={closeModal} />
                    </div>
                    <div className="modal-body-securitypassword">
                      <div className="input-group-securitypassword">
                        <label>Current Password</label>
                        <div className="input-container-edit-securitypassword">
                          <FaLock className="input-icon-edit-securitypassword" />
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current password"
                            className='input-edit1-securitypassword'
                          />
                          <span onClick={toggleCurrentPasswordVisibility} className='toggle-password-edit-securitypassword'>
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>

                      <div className="input-group-securitypassword">
                        <label>New Password</label>
                        <div className="input-container-edit-securitypassword">
                          <FaLock className="input-icon-edit-securitypassword" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="New password"
                            className='input-edit-securitypassword'
                          />
                          <span onClick={toggleNewPasswordVisibility} className='toggle-password-edit-securitypassword'>
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>

                        <div className="password-strength-securitypassword">
                          <span className={`strength-bar-securitypassword ${passwordStrength === 'weak' && 'weak'}`}></span>
                          <span className={`strength-bar-securitypassword ${passwordStrength === 'medium' && 'medium'}`}></span>
                          <span className={`strength-bar-securitypassword ${passwordStrength === 'strong' && 'strong'}`}></span>
                        </div>
                      </div>
                      <div className="progress-container-securitypassword">
                        <div className="progress-bar-securitypassword progress-red"></div>
                        <div className="progress-bar-securitypassword progress-yellow"></div>
                        <div className="progress-bar-securitypassword progress-green"></div>
                      </div>
                      <div className="input-group-securitypassword">
                        <label>Confirm Password</label>
                        <div className="input-container-edit-securitypassword">
                          <FaLock className="input-icon-edit-securitypassword" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className='input-edit-securitypassword'
                          />
                          <span onClick={toggleConfirmPasswordVisibility} className='toggle-password-edit-securitypassword'>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-securitypassword">
                      <button className="save-button-securitypassword" onClick={closeModal}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

{/* =============================================================================== */}
            <div className="password-input1-container">
              <label htmlFor="password">Current password</label>
              <div className="password-wrapper">
                <span className="icon left-icon">
                  <svg width="14" height="20" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.71932 21.5C2.19665 21.5 1.75176 21.3164 1.38465 20.9493C1.01754 20.5822 0.833984 20.1377 0.833984 19.6158V9.38417C0.833984 8.86306 1.01754 8.41856 1.38465 8.05067C1.75176 7.68356 2.19665 7.5 2.71932 7.5H4.33398V5.16667C4.33398 3.867 4.78704 2.7645 5.69315 1.85917C6.59848 0.953056 7.70098 0.5 9.00065 0.5C10.3003 0.5 11.4032 0.953056 12.3093 1.85917C13.2154 2.76528 13.6681 3.86778 13.6673 5.16667V7.5H15.2831C15.8043 7.5 16.2488 7.68356 16.6166 8.05067C16.9838 8.41778 17.1673 8.86267 17.1673 9.38533V19.6158C17.1673 20.1369 16.9838 20.5814 16.6166 20.9493C16.2495 21.3164 15.805 21.5 15.2831 21.5H2.71932ZM2.71932 20.3333H15.2831C15.4924 20.3333 15.6643 20.2661 15.7988 20.1315C15.9334 19.9969 16.0006 19.8251 16.0006 19.6158V9.38417C16.0006 9.17494 15.9334 9.00306 15.7988 8.8685C15.6643 8.73394 15.4924 8.66667 15.2831 8.66667H2.71815C2.50893 8.66667 2.33704 8.73394 2.20248 8.8685C2.06793 9.00306 2.00065 9.17533 2.00065 9.38533V19.6158C2.00065 19.8251 2.06793 19.9969 2.20248 20.1315C2.33704 20.2661 2.50932 20.3333 2.71932 20.3333ZM9.00065 16.25C9.49298 16.25 9.90754 16.0812 10.2443 15.7437C10.5819 15.4069 10.7506 14.9923 10.7506 14.5C10.7506 14.0077 10.5819 13.5931 10.2443 13.2563C9.90676 12.9196 9.4922 12.7508 9.00065 12.75C8.50909 12.7492 8.09454 12.918 7.75698 13.2563C7.41943 13.5931 7.25065 14.0077 7.25065 14.5C7.25065 14.9923 7.41943 15.4069 7.75698 15.7437C8.09376 16.0812 8.50832 16.25 9.00065 16.25ZM5.50065 7.5H12.5006V5.16667C12.5006 4.19444 12.1604 3.36806 11.4798 2.6875C10.7993 2.00694 9.97287 1.66667 9.00065 1.66667C8.02843 1.66667 7.20204 2.00694 6.52148 2.6875C5.84093 3.36806 5.50065 4.19444 5.50065 5.16667V7.5Z" fill="#54585D" />
                  </svg>

                </span>
                <input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Current password"
                  className="password-input1"
                />
                <span className="icon right-icon" onClick={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <svg width="29" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3c-4 0-6 5-6 5s2 5 6 5 6-5 6-5-2-5-6-5zm0 9c-2 0-4-3-4-4s2-4 4-4 4 3 4 4-2 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#9E9E9E" />
                    </svg>
                  ) : (
                    <svg width="29" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2c-5 0-7 6-7 6s2 6 7 6 7-6 7-6-2-6-7-6zm0 10c-3 0-5-4-5-4s2-4 5-4 5 4 5 4-2 4-5 4zM8 5a3 3 0 100 6 3 3 0 000-6z" fill="#9E9E9E" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="password-input1-container">
              <label htmlFor="password">New password</label>
              <div className="password-wrapper">
                <span className="icon left-icon">
                  <svg width="14" height="20" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.71932 21.5C2.19665 21.5 1.75176 21.3164 1.38465 20.9493C1.01754 20.5822 0.833984 20.1377 0.833984 19.6158V9.38417C0.833984 8.86306 1.01754 8.41856 1.38465 8.05067C1.75176 7.68356 2.19665 7.5 2.71932 7.5H4.33398V5.16667C4.33398 3.867 4.78704 2.7645 5.69315 1.85917C6.59848 0.953056 7.70098 0.5 9.00065 0.5C10.3003 0.5 11.4032 0.953056 12.3093 1.85917C13.2154 2.76528 13.6681 3.86778 13.6673 5.16667V7.5H15.2831C15.8043 7.5 16.2488 7.68356 16.6166 8.05067C16.9838 8.41778 17.1673 8.86267 17.1673 9.38533V19.6158C17.1673 20.1369 16.9838 20.5814 16.6166 20.9493C16.2495 21.3164 15.805 21.5 15.2831 21.5H2.71932ZM2.71932 20.3333H15.2831C15.4924 20.3333 15.6643 20.2661 15.7988 20.1315C15.9334 19.9969 16.0006 19.8251 16.0006 19.6158V9.38417C16.0006 9.17494 15.9334 9.00306 15.7988 8.8685C15.6643 8.73394 15.4924 8.66667 15.2831 8.66667H2.71815C2.50893 8.66667 2.33704 8.73394 2.20248 8.8685C2.06793 9.00306 2.00065 9.17533 2.00065 9.38533V19.6158C2.00065 19.8251 2.06793 19.9969 2.20248 20.1315C2.33704 20.2661 2.50932 20.3333 2.71932 20.3333ZM9.00065 16.25C9.49298 16.25 9.90754 16.0812 10.2443 15.7437C10.5819 15.4069 10.7506 14.9923 10.7506 14.5C10.7506 14.0077 10.5819 13.5931 10.2443 13.2563C9.90676 12.9196 9.4922 12.7508 9.00065 12.75C8.50909 12.7492 8.09454 12.918 7.75698 13.2563C7.41943 13.5931 7.25065 14.0077 7.25065 14.5C7.25065 14.9923 7.41943 15.4069 7.75698 15.7437C8.09376 16.0812 8.50832 16.25 9.00065 16.25ZM5.50065 7.5H12.5006V5.16667C12.5006 4.19444 12.1604 3.36806 11.4798 2.6875C10.7993 2.00694 9.97287 1.66667 9.00065 1.66667C8.02843 1.66667 7.20204 2.00694 6.52148 2.6875C5.84093 3.36806 5.50065 4.19444 5.50065 5.16667V7.5Z" fill="#54585D" />
                  </svg>

                </span>
                <input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Current password"
                  className="password-input1"
                />
                <span className="icon right-icon" onClick={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <svg width="29" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3c-4 0-6 5-6 5s2 5 6 5 6-5 6-5-2-5-6-5zm0 9c-2 0-4-3-4-4s2-4 4-4 4 3 4 4-2 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#9E9E9E" />
                    </svg>
                  ) : (
                    <svg width="29" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2c-5 0-7 6-7 6s2 6 7 6 7-6 7-6-2-6-7-6zm0 10c-3 0-5-4-5-4s2-4 5-4 5 4 5 4-2 4-5 4zM8 5a3 3 0 100 6 3 3 0 000-6z" fill="#9E9E9E" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="password-input1-container">
              <label htmlFor="password">Confirm password</label>
              <div className="password-wrapper">
                <span className="icon left-icon">
                  <svg width="14" height="20" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.71932 21.5C2.19665 21.5 1.75176 21.3164 1.38465 20.9493C1.01754 20.5822 0.833984 20.1377 0.833984 19.6158V9.38417C0.833984 8.86306 1.01754 8.41856 1.38465 8.05067C1.75176 7.68356 2.19665 7.5 2.71932 7.5H4.33398V5.16667C4.33398 3.867 4.78704 2.7645 5.69315 1.85917C6.59848 0.953056 7.70098 0.5 9.00065 0.5C10.3003 0.5 11.4032 0.953056 12.3093 1.85917C13.2154 2.76528 13.6681 3.86778 13.6673 5.16667V7.5H15.2831C15.8043 7.5 16.2488 7.68356 16.6166 8.05067C16.9838 8.41778 17.1673 8.86267 17.1673 9.38533V19.6158C17.1673 20.1369 16.9838 20.5814 16.6166 20.9493C16.2495 21.3164 15.805 21.5 15.2831 21.5H2.71932ZM2.71932 20.3333H15.2831C15.4924 20.3333 15.6643 20.2661 15.7988 20.1315C15.9334 19.9969 16.0006 19.8251 16.0006 19.6158V9.38417C16.0006 9.17494 15.9334 9.00306 15.7988 8.8685C15.6643 8.73394 15.4924 8.66667 15.2831 8.66667H2.71815C2.50893 8.66667 2.33704 8.73394 2.20248 8.8685C2.06793 9.00306 2.00065 9.17533 2.00065 9.38533V19.6158C2.00065 19.8251 2.06793 19.9969 2.20248 20.1315C2.33704 20.2661 2.50932 20.3333 2.71932 20.3333ZM9.00065 16.25C9.49298 16.25 9.90754 16.0812 10.2443 15.7437C10.5819 15.4069 10.7506 14.9923 10.7506 14.5C10.7506 14.0077 10.5819 13.5931 10.2443 13.2563C9.90676 12.9196 9.4922 12.7508 9.00065 12.75C8.50909 12.7492 8.09454 12.918 7.75698 13.2563C7.41943 13.5931 7.25065 14.0077 7.25065 14.5C7.25065 14.9923 7.41943 15.4069 7.75698 15.7437C8.09376 16.0812 8.50832 16.25 9.00065 16.25ZM5.50065 7.5H12.5006V5.16667C12.5006 4.19444 12.1604 3.36806 11.4798 2.6875C10.7993 2.00694 9.97287 1.66667 9.00065 1.66667C8.02843 1.66667 7.20204 2.00694 6.52148 2.6875C5.84093 3.36806 5.50065 4.19444 5.50065 5.16667V7.5Z" fill="#54585D" />
                  </svg>

                </span>
                <input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Current password"
                  className="password-input1"
                />
                <span className="icon right-icon" onClick={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <svg width="29" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3c-4 0-6 5-6 5s2 5 6 5 6-5 6-5-2-5-6-5zm0 9c-2 0-4-3-4-4s2-4 4-4 4 3 4 4-2 4-4 4zm0-6a2 2 0 100 4 2 2 0 000-4z" fill="#9E9E9E" />
                    </svg>
                  ) : (
                    <svg width="29" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2c-5 0-7 6-7 6s2 6 7 6 7-6 7-6-2-6-7-6zm0 10c-3 0-5-4-5-4s2-4 5-4 5 4 5 4-2 4-5 4zM8 5a3 3 0 100 6 3 3 0 000-6z" fill="#9E9E9E" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
{/* ===================================================================================== */}
        <div className="container3">
          {/* Two-Factor Authentication Section */}
          {/* <div className="profilesecurity-container">
      {!showAuthForm ? (
        <div className="profilesecurity-authenticate-container">
          <h3 className="profilesecurity-authenticate-heading">Two-Factor authentication</h3>

          <div className="profilesecurity-authenticate-option">
            <label className="profilesecurity-authenticate-label">
              <input
                type="radio"
                name="authOption"
                className="profilesecurity-authenticate-radio"
              />
              <div className="profilesecurity-authenticate-description">
                <p className="profilesecurity-authenticate-option-title">Mobile app authenticator</p>
                <p className="profilesecurity-authenticate-option-text">
                  Securely access your profile with a time-based code from your authenticator app.
                </p>
              </div>
            </label>
          </div>

          <div className="profilesecurity-authenticate-option">
            <label className="profilesecurity-authenticate-label">
              <input
                type="radio"
                name="authOption"
                className="profilesecurity-authenticate-radio"
              />
              <div className="profilesecurity-authenticate-description">
                <p className="profilesecurity-authenticate-option-title">Email</p>
                <p className="profilesecurity-authenticate-option-text">
                  Receive a one-time code via email for quick and secure profile access.
                </p>
              </div>
            </label>
          </div>

          <button className="profilesecurity-authenticate-button" onClick={handleSetupClick}>
            Set-up
          </button>
        </div>
      ) : (
        <div className="mobile-app-authenticator-form">
        <div className="back-button-container">
          <button className="back-button" onClick={() => setShowAuthForm(false)}>
          <svg width="14" height="15" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4688 27.9375L1.53125 15L14.4688 2.0625" stroke="#1B1B1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 <span>Mobile app authenticator</span>
          </button>
        </div>

        <div className="mobile-number-container">
          <label className="mobile-number-label">Enter your Mobile Number</label>
          <input type="text" placeholder="mobile number" className="mobile-number-input" />
          <button className="get-code-button">Get Code</button>
        </div>

        <div className="profilesecurity-otp-container">
      <label className="profilesecurity-otp-label">Enter Code received</label>
      
      <div className="profilesecurity-otp-input-boxes">
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
      </div>
    </div>

        <button className="setup-button-inside">Set-up</button>
      </div>
    )}
    </div> */}








    <div className="profilesecurity-container">
      {!isSetupClicked ? (
        <div className="profilesecurity-authenticate-container">
          <h3 className="profilesecurity-authenticate-heading">Two-Factor authentication</h3>

          {/* Mobile App Authenticator Option */}
          <div className="profilesecurity-authenticate-option">
            <label className="profilesecurity-authenticate-label">
              <input
                type="radio"
                name="authOption"
                value="mobile"
                className="profilesecurity-authenticate-radio"
                onChange={() => setSelectedOptions('mobile')}
              />
              <div className="profilesecurity-authenticate-description">
                <p className="profilesecurity-authenticate-option-title">Mobile app authenticator</p>
                <p className="profilesecurity-authenticate-option-text">
                  Securely access your profile with a time-based code from your authenticator app.
                </p>
              </div>
            </label>
          </div>

          {/* Email Option */}
          <div className="profilesecurity-authenticate-option">
            <label className="profilesecurity-authenticate-label">
              <input
                type="radio"
                name="authOption"
                value="email"
                className="profilesecurity-authenticate-radio"
                onChange={() => setSelectedOptions('email')}
              />
              <div className="profilesecurity-authenticate-description">
                <p className="profilesecurity-authenticate-option-title">Email</p>
                <p className="profilesecurity-authenticate-option-text">
                  Receive a one-time code via email for quick and secure profile access.
                </p>
              </div>
            </label>
          </div>

          <button className="profilesecurity-authenticate-button" onClick={handleSetupClick}>
            Set-up
          </button>
        </div>
      ) : selectedOptions === 'mobile' ? (
        <div className="mobile-app-authenticator-form">
        <div className="back-button-container">
          <button className="back-button" onClick={handleBackClick}>
          <svg width="14" height="15" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4688 27.9375L1.53125 15L14.4688 2.0625" stroke="#1B1B1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 <span>Mobile app authenticator</span>
          </button>
        </div>

        <div className="mobile-number-container">
          <label className="mobile-number-label">Enter your Mobile Number</label>
          <input type="text" placeholder="mobile number" className="mobile-number-input" />
          <button className="get-code-button">Get Code</button>
        </div>

        <div className="profilesecurity-otp-container">
      <label className="profilesecurity-otp-label">Enter Code received</label>
      
      <div className="profilesecurity-otp-input-boxes">
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
      </div>
    </div>

        <button className="setup-button-inside">Set-up</button>
      </div>
  
      ) : selectedOptions === 'email' ? (
        <div className="mobile-app-authenticator-form">
        <div className="back-button-container">
          <button className="back-button" onClick={handleBackClick}>
          <svg width="14" height="15" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4688 27.9375L1.53125 15L14.4688 2.0625" stroke="#1B1B1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 <span>Email</span>
          </button>
        </div>

        <div className="mobile-number-container">
          <label className="mobile-number-label">Enter your Email Address</label>
          <input type="text" placeholder="email address" className="mobile-number-input" />
          <button className="get-code-button">Get Code</button>
        </div>

        <div className="profilesecurity-otp-container">
      <label className="profilesecurity-otp-label">Enter Code received</label>
      
      <div className="profilesecurity-otp-input-boxes">
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
        <input type="text" maxLength="1" className="profilesecurity-otp-box" />
      </div>
    </div>

        <button className="setup-button-inside">Set-up</button>
      </div>
  
      ) : null}
    </div>
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div className="profilecsecurity-account-activity">
          <h3>Account activity</h3>

          <div className="profilecsecurity-activity-item">
            <div className="profilecsecurity-location">
              <span className="profilecsecurity-icon"><svg width="35" height="34" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.25 20.25C43.25 18.1817 42.8426 16.1336 42.0511 14.2227C41.2596 12.3119 40.0995 10.5756 38.6369 9.11307C37.1744 7.65055 35.4381 6.49041 33.5273 5.6989C31.6164 4.90739 29.5683 4.5 27.5 4.5C25.4317 4.5 23.3836 4.90739 21.4727 5.6989C19.5619 6.49041 17.8256 7.65055 16.3631 9.11307C14.9005 10.5756 13.7404 12.3119 12.9489 14.2227C12.1574 16.1336 11.75 18.1817 11.75 20.25C11.75 23.3708 12.6703 26.2733 14.2363 28.7213H14.2183L27.5 49.5L40.7818 28.7213H40.766C42.3881 26.1936 43.2502 23.2534 43.25 20.25ZM27.5 27C25.7098 27 23.9929 26.2888 22.727 25.023C21.4612 23.7571 20.75 22.0402 20.75 20.25C20.75 18.4598 21.4612 16.7429 22.727 15.477C23.9929 14.2112 25.7098 13.5 27.5 13.5C29.2902 13.5 31.0071 14.2112 32.273 15.477C33.5388 16.7429 34.25 18.4598 34.25 20.25C34.25 22.0402 33.5388 23.7571 32.273 25.023C31.0071 26.2888 29.2902 27 27.5 27Z" fill="#1B1B1E" />
              </svg>
              </span>
              <div className="profilecsecurity-info">
                <p className="profilecsecurity-city">Gurugram</p>
                <p className="profilecsecurity-status profilecsecurity-active">Active now</p>
              </div>
            </div>
            <div className="profilecsecurity-device-info">
              <span className="profilecsecurity-dot">•</span> Microsoft Windows Professional (Windows 11)
            </div>
            <div className="profilecsecurity-more-options">⋯</div>
          </div>

          <div className="profilecsecurity-activity-item1">
            <div className="profilecsecurity-location">
              <span className="profilecsecurity-icon"><svg width="35" height="34" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.25 20.25C43.25 18.1817 42.8426 16.1336 42.0511 14.2227C41.2596 12.3119 40.0995 10.5756 38.6369 9.11307C37.1744 7.65055 35.4381 6.49041 33.5273 5.6989C31.6164 4.90739 29.5683 4.5 27.5 4.5C25.4317 4.5 23.3836 4.90739 21.4727 5.6989C19.5619 6.49041 17.8256 7.65055 16.3631 9.11307C14.9005 10.5756 13.7404 12.3119 12.9489 14.2227C12.1574 16.1336 11.75 18.1817 11.75 20.25C11.75 23.3708 12.6703 26.2733 14.2363 28.7213H14.2183L27.5 49.5L40.7818 28.7213H40.766C42.3881 26.1936 43.2502 23.2534 43.25 20.25ZM27.5 27C25.7098 27 23.9929 26.2888 22.727 25.023C21.4612 23.7571 20.75 22.0402 20.75 20.25C20.75 18.4598 21.4612 16.7429 22.727 15.477C23.9929 14.2112 25.7098 13.5 27.5 13.5C29.2902 13.5 31.0071 14.2112 32.273 15.477C33.5388 16.7429 34.25 18.4598 34.25 20.25C34.25 22.0402 33.5388 23.7571 32.273 25.023C31.0071 26.2888 29.2902 27 27.5 27Z" fill="#1B1B1E" />
              </svg>
              </span>
              <div className="profilecsecurity-info">
                <p className="profilecsecurity-city">Noida</p>
                <p className="profilecsecurity-status">7 days ago</p>
              </div>
            </div>
            <div className="profilecsecurity-device-info1">
              <span className="profilecsecurity-dot1">•</span> iPhone 15 Pro Max
            </div>
            <div className="profilecsecurity-more-options">⋯</div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default SecurityPage;
