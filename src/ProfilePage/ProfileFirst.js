import React, { useState, useEffect } from 'react';
import './ProfileFirst.css'; // Import the CSS for styling
// import Profilecommon from './Profilecommon';
import ProfilePage from './ProfilePage';
import pI from '../assets/ProfileImage.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProfileFirst = () => {
  const [profileData, setProfileData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false); // Modal visibility state
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfileAddressModalOpen, setProfileAddressModalOpen] = useState(false);
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState(profileData);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  // State initialization: Initially, profileData is null, and loading is true
  //  const [profileData, setProfileData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data asynchronously
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_LOCALURL + '/api/profile'); // Replace with actual API endpoint
        setProfileData(response.data); // Set profile data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchProfileData();
  }, []); // Only run once on component mount


  // Toggle modal visibility
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSave = () => {
    setProfileData(formData);
    setIsPopupOpen(false); // Close popup after saving
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
  // const [profileData, setProfileData] = useState(null);
  const [userId, setUserId] = useState(null); // State to store userId

  // Simulating fetching userId dynamically (could come from auth, database, etc.)
  useEffect(() => {
    // Let's assume the userId comes from an API or some database lookup
    const fetchUserId = async () => {
      try {
        // Example API to get the userId (replace with your actual API call)
        // const response = await axios.get('http://13.235.100.222:13417/api/v1/getalluser');
        const response = await axios.get(process.env.REACT_APP_LOCALURL + '/api/v1/getalluser');
        setUserId(response.data.userId); // Set the userId from response
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId();
  }, []); // Empty array to run this once when the component mounts

  // Fetch profile data based on the userId after it has been retrieved
  useEffect(() => {
    if (userId) {
      const fetchProfileData = async () => {
        try {
          // const response = await axios.get(`http://13.235.100.222:13417/api/v1/getsingleuser/${userId}`);
          const response = await axios.get(process.env.REACT_APP_LOCALURL + `/api/v1/getsingleuser/${userId}`);
          setProfileData(response.data); // Set profile data
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };

      fetchProfileData();
    }
  }, [userId]); // Run when the userId state changes





  useEffect(() => {
    // Simulate an API call with mock data
    const mockData = {
      profilePicture: pI,
      firstName: "Ananya",
      lastName: "Sharma",
      jobTitle: "Senior Software Engineer",
      location: "Pune, Maharashtra",
      email: "ananyasharma@gmail.com",
      phone: "+91-7854584952",
      bio: "Senior Software Engineer",
      country: "India",
      postalCode: "111045",
      cityState: "Pune, Maharashtra",
      taxId: "P/B/22/00002000"
    };

    // Simulate a delay like a real API call
    setTimeout(() => {
      setProfileData(mockData);
    }, 1000); // 1 second delay
  }, []);

  if (!profileData) {
    return <div>Loading...</div>; // Show loading message while data is being "fetched"
  }










  const openProfileAddressModal = () => setProfileAddressModalOpen(true);
  const closeProfileAddressModal = () => setProfileAddressModalOpen(false);



  const showProfileModal = () => setProfileModalOpen(true);
  const hideProfileModal = () => setProfileModalOpen(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <ProfilePage />

      <div className="profile-container-acc">
        <div className={`sidebar-profile ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar1-profile">
            <ul>
              <li className="active1" onClick={() => navigate('/profile')}>
                My Profile
              </li>
              <li onClick={() => navigate('/academics')}>
                Academics Information
              </li>
              <li onClick={() => navigate('/security')}>
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
        {/* -------------------------------------------------------------- */}
        <div className="profile-header-set">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="profile-picture-set"
          />
          <div className="profile-info-set">
            <h2>{profileData.FullName}</h2>
            <p>{profileData.jobTitle}<br />{profileData.location}</p>
          </div>
          <button onClick={openModal} className="edit-button-set">
            <svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
              <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
            </svg> Edit
          </button>
          {isOpen && (
            <div className="profilenameedit-modal-overlay">
              <div className="profilenameedit-modal-content">
                <span className="profilenameedit-close" onClick={closeModal}>&times;</span>
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
                  <button className="profilenameedit-discard-button" onClick={closeModal}>
                    Discard
                  </button>
                  <button className="profilenameedit-save-button">Save changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ============================================================ */}
        {/* profileData */}
        <div>
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="profile-details">
              <div>
                <p><strong>First name</strong><br />{profileData.firstName}</p>
                <p><strong>Email address</strong><br />{profileData.email}</p>
                <p><strong>Bio</strong><br />{profileData.bio}</p>
              </div>
              <div>
                <p><strong>Lastname</strong><br />{profileData.lastName}</p>
                <p><strong>Phone</strong><br />{profileData.phone}</p>
              </div>
            </div>
            <button className="edit-button-set1" onClick={showProfileModal}><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
              <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
            </svg> Edit</button>
          </div>

          {isProfileModalOpen && (
            <div className="profilepersonal-modal-overlay">
              <div className="profilepersonal-modal-content">
                <span className="profilepersonal-close" onClick={hideProfileModal}>
                  &times;
                </span>
                <h2>Update personal Information</h2>

                <div className="profilepersonal-modal-body">
                  <div className="profilepersonal-modal-row">
                    <span className="profilepersonal-field">First name</span>
                    <p>Ananya</p>
                    <span className="profilepersonal-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                  <div className="profilepersonal-modal-row">
                    <span className="profilepersonal-field">Last name</span>
                    <p>Sharma</p>
                    <span className="profilepersonal-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                  <div className="profilepersonal-modal-row">
                    <span className="profilepersonal-field">Phone number</span>
                    <p>+91-7854584952</p>
                    <span className="profilepersonal-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                  <div className="profilepersonal-modal-row">
                    <span className="profilepersonal-field">Email address</span>
                    <p>ananyasharma@gmail.com</p>
                    <span className="profilepersonal-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                  <div className="profilepersonal-modal-row">
                    <span className="profilepersonal-field">Bio</span>
                    <p>Senior Software Engineer</p>
                    <span className="profilepersonal-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                      <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                    </svg></span>
                  </div>
                </div>

                <div className="profilepersonal-modal-footer">
                  <button className="profilepersonal-discard-button" onClick={hideProfileModal}>
                    Discard
                  </button>
                  <button className="profilepersonal-save-button">Save changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* adress section --------------------------------------------------------------------*/}
        <div>
          <div className="profile-section1">
            <h3>Address</h3>
            <div className="profile-details1">
              <div>
                <p>
                  <strong>Country</strong><br />{profileData.country}
                </p>
                <p>
                  <strong>Postal code</strong><br />{profileData.postalCode}
                </p>
              </div>
              <div>
                <p>
                  <strong>City/State</strong><br />{profileData.cityState}
                </p>
                <p>
                  <strong>Tax Id</strong><br />{profileData.taxId}
                </p>
              </div>
            </div>
            <button onClick={openProfileAddressModal} className="edit-button-set2"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
              <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
            </svg> Edit</button>
            {/* Popup modal */}
            {isProfileAddressModalOpen && (
              <div className="profileaddress-modal-overlay">
                <div className="profileaddress-modal">
                  <h2>Update address</h2>

                  <div className="profileaddress-modal-content">
                    <div className="profileaddress-field-row">
                      <label>Country</label>
                      <p>India</p>
                      <span className="profileaddress-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                        <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                      </svg></span>
                    </div>

                    <div className="profileaddress-field-row">
                      <label>City</label>
                      <p>Pune</p>
                      <span className="profileaddress-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                        <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                      </svg></span>
                    </div>

                    <div className="profileaddress-field-row">
                      <label>State</label>
                      <p>Maharashtra</p>
                      <span className="profileaddress-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                        <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                      </svg></span>
                    </div>

                    <div className="profileaddress-field-row">
                      <label>Postal code</label>
                      <p>111045</p>
                      <span className="profileaddress-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                        <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                      </svg></span>
                    </div>

                    <div className="profileaddress-field-row">
                      <label>Tax Id</label>
                      <p>P/B/22/00002000</p>
                      <span className="profileaddress-edit-icon"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
                        <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
                      </svg></span>
                    </div>
                  </div>

                  <div className="profileaddress-modal-footer">
                    <button className="profileaddress-discard-button" onClick={closeProfileAddressModal}>
                      Discard
                    </button>
                    <button className="profileaddress-save-button">Save changes</button>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
    </>
  );
};

export default ProfileFirst;
