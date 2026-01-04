import React, { useState, useEffect } from 'react';
import './AcademicsInformation.css'; // Import the CSS for styling
import pI from '../assets/ProfileImage.jpeg'
import ProfilePage from './ProfilePage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AcademicsInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [academicData, setAcademicData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const [academicData, setAcademicData] = useState({
    institutionName: '',
    batch: '',
    department: '',
    graduationYear: ''
  });

  // Fetch academic data from API
  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        // const response = await axios.get('http://13.235.100.222:13417/api/v1/getprofilebyuserid/UI-000002'); // Replace with the correct endpoint
        const response = await axios.get(process.env.REACT_APP_LOCALURL+'/api/v1/getprofilebyuserid/UI-000002');
        setAcademicData(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching academic data:', error);
      }
    };

    fetchAcademicData();
  }, []);

  // Handler for sharing data (or you can customize this for form submission)
  const handleShare = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_LOCALURL+'/api/share', academicData); // Replace with the correct API endpoint for sharing
      console.log('Data shared successfully', response);
    } catch (error) {
      console.error('Error sharing data:', error);
    }
  };
  useEffect(() => {
    // Simulate an API call with mock data
    const mockAcademicData = {
      profilePicture: pI,
      name: "Ananya Sharma",
      jobTitle: "Senior Software Engineer",
      location: "Pune, Maharashtra",
      institutionName: "Springfield University",
      department: "School of Engineering",
      batch: "2019 - 2023",
      graduationYear: "2023",
      courseName: "Full Stack Web Development",
      organization: "Coursera",
      completionYear: "2021",
    };

    setTimeout(() => {
      setAcademicData(mockAcademicData);
    }, 1000); // 1 second delay to simulate API call
  }, []);

  if (!academicData) {
    return <div>Loading...</div>; // Show loading message while data is being "fetched"
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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



  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (<>
    <ProfilePage />
  
    {/* < div className='myprofile'>
                    <h2 >My profile</h2>
                </div> */}
     <div className="container-fluid profile-container-acc">
      <div className="row">
        {/* Sidebar */}
        <div className={`sidebar-profile col-12 col-md-4 col-lg-3 ${isSidebarOpen ? 'd-block' : 'd-none d-md-block'}`}>
          <div className="sidebar1-profile">
            <ul className="list-unstyled">
              <li onClick={() => navigate('/profile')}>My Profile</li>
              <li className="active1" onClick={() => navigate('/academics')}>Academics Information</li>
              <li onClick={() => navigate('/security')}>Security</li>
              <li onClick={() => navigate('/teams-connections')}>Teams & Connections</li>
              <li onClick={() => navigate('/settings')}>Settings</li>
              <li onClick={() => navigate('/help-support')}>Help & Support</li>
              <li onClick={handleLogoutClick}>Logout</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className={`col ${isSidebarOpen ? 'col-md-8 col-lg-9' : 'col-12'}`}>
          <button className="btn btn-secondary my-3 d-md-none" onClick={toggleSidebar}>
            Toggle Sidebar
          </button>

          {/* Conditional Popup Rendering */}
          {isModelOpen && (
            <>
              <div className="popup-overlay"></div>
              <div className="popup-box">
                <h2>Confirm Logout</h2>
                <p>
                  Are you sure you want to log out? You'll be logged out of your account and
                  redirected to the sign-in page.
                </p>
                <h7 className="reminder">(Remember to save any unsaved work before logging out.)</h7>
                <div className="popup-buttons">
                  <button onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
                  <button onClick={handleConfirm} className="btn btn-primary">Confirm</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    {/* </div> */}
   
      
    
    <div className="profile-header-acc">
          <img
            src={academicData.profilePicture}
            alt="Profile"
            className="profile-picture-acc"
          />
          <div className="profile-info-acc">
            <h2>{academicData.name}</h2>
            <p>{academicData.jobTitle}<br />{academicData.location}</p>
          </div>
          <button onClick={openModal} className="edit-button-acc"><svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" gap="20">
            <path d="M1.5 15.5H2.598L13.296 4.80202L12.198 3.70402L1.5 14.402V15.5ZM0.5 16.5V13.98L13.68 0.788015C13.7833 0.696682 13.8967 0.626015 14.02 0.576015C14.1433 0.526015 14.2723 0.500682 14.407 0.500015C14.5417 0.499348 14.6717 0.520682 14.797 0.564015C14.9237 0.606015 15.0403 0.682015 15.147 0.792015L16.214 1.86602C16.324 1.97202 16.3993 2.08868 16.44 2.21602C16.48 2.34268 16.5 2.46935 16.5 2.59602C16.5 2.73202 16.4773 2.86202 16.432 2.98602C16.386 3.10935 16.3133 3.22235 16.214 3.32502L3.019 16.5H0.5ZM12.738 4.26202L12.198 3.70402L13.296 4.80202L12.738 4.26202Z" fill="#1B1B1E" />
          </svg> Edit</button>
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
      {/* ======================================================================= */}
      {/* University/College Details */}
      <div className="acade-section">
      <h3>University/College Details</h3>
      <div className="acade-details">
        <div>
          <p><strong>Institution Name</strong><br />{academicData.institutionName}</p>
          <p><strong>Batch</strong><br />{academicData.batch}</p>
        </div>
        <div>
          <p><strong>Department</strong><br />{academicData.department}</p>
          <p><strong>Year of Graduation</strong><br />{academicData.graduationYear}</p>
        </div>
      </div>
      <button className="share-button" onClick={handleShare}>
        <svg width="13" height="12" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 7.5L11.5 0.5V4.5C4.5 5.5 1.5 10.5 0.5 15.5C3 12 6.5 10.4 11.5 10.4V14.5L18.5 7.5Z" fill="#1B1B1E" />
        </svg>
        Share
      </button>
    </div>
      {/* ================================================================= */}
      {/* Additional Courses/Certifications */}
      <div className="acade-section1">
        <h3>Additional Courses/Certifications</h3>
        <div className="acade-details1">
          <div>
            <p><strong>Course/Certification Name</strong><br />{academicData.courseName}</p>
            <p><strong>Year of Completion</strong><br />{academicData.completionYear}</p>
          </div>
          <div>
            <p><strong>Institution/Organization</strong><br />{academicData.organization}</p>
            <button className="certificate-button"><svg width="14" height="15" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2891 10.8438C11.2891 11.0116 11.2224 11.1725 11.1037 11.2912C10.985 11.4099 10.8241 11.4766 10.6562 11.4766H5.59375C5.42592 11.4766 5.26496 11.4099 5.14628 11.2912C5.02761 11.1725 4.96094 11.0116 4.96094 10.8438C4.96094 10.6759 5.02761 10.515 5.14628 10.3963C5.26496 10.2776 5.42592 10.2109 5.59375 10.2109H10.6562C10.8241 10.2109 10.985 10.2776 11.1037 10.3963C11.2224 10.515 11.2891 10.6759 11.2891 10.8438ZM10.6562 6.83594H5.59375C5.42592 6.83594 5.26496 6.90261 5.14628 7.02128C5.02761 7.13996 4.96094 7.30092 4.96094 7.46875C4.96094 7.63658 5.02761 7.79754 5.14628 7.91622C5.26496 8.03489 5.42592 8.10156 5.59375 8.10156H10.6562C10.8241 8.10156 10.985 8.03489 11.1037 7.91622C11.2224 7.79754 11.2891 7.63658 11.2891 7.46875C11.2891 7.30092 11.2224 7.13996 11.1037 7.02128C10.985 6.90261 10.8241 6.83594 10.6562 6.83594ZM22.2578 13.4404V20.125C22.2581 20.2362 22.229 20.3455 22.1736 20.4419C22.1181 20.5383 22.0383 20.6184 21.942 20.6741C21.8458 20.7298 21.7366 20.7592 21.6254 20.7593C21.5142 20.7593 21.4049 20.7301 21.3086 20.6745L18.6719 19.1663L16.0352 20.6745C15.9388 20.7301 15.8296 20.7593 15.7184 20.7593C15.6072 20.7592 15.498 20.7298 15.4017 20.6741C15.3055 20.6184 15.2256 20.5383 15.1702 20.4419C15.1147 20.3455 15.0857 20.2362 15.0859 20.125V17.3828H2.21875C1.82714 17.3828 1.45157 17.2272 1.17466 16.9503C0.897754 16.6734 0.742188 16.2979 0.742188 15.9063V2.40625C0.742188 2.01464 0.897754 1.63907 1.17466 1.36216C1.45157 1.08525 1.82714 0.929688 2.21875 0.929688H20.7812C21.1729 0.929688 21.5484 1.08525 21.8253 1.36216C22.1022 1.63907 22.2578 2.01464 22.2578 2.40625V5.71586C22.79 6.20866 23.2146 6.80611 23.5049 7.47074C23.7953 8.13537 23.9452 8.85284 23.9452 9.57813C23.9452 10.3034 23.7953 11.0209 23.5049 11.6855C23.2146 12.3501 22.79 12.9476 22.2578 13.4404ZM18.6719 5.57031C17.8792 5.57031 17.1043 5.80537 16.4453 6.24575C15.7862 6.68613 15.2725 7.31207 14.9691 8.0444C14.6658 8.77673 14.5864 9.58257 14.7411 10.36C14.8957 11.1375 15.2774 11.8516 15.8379 12.4121C16.3984 12.9726 17.1125 13.3543 17.89 13.5089C18.6674 13.6636 19.4733 13.5842 20.2056 13.2809C20.9379 12.9775 21.5639 12.4638 22.0042 11.8047C22.4446 11.1457 22.6797 10.3708 22.6797 9.57813C22.6797 8.51519 22.2574 7.49578 21.5058 6.74417C20.7542 5.99256 19.7348 5.57031 18.6719 5.57031ZM15.0859 16.1172V13.4404C14.1626 12.5786 13.5791 11.4141 13.4418 10.1586C13.3044 8.90304 13.6222 7.6399 14.3374 6.59888C15.0527 5.55786 16.1177 4.80812 17.339 4.486C18.5603 4.16388 19.8566 4.29079 20.9922 4.84363V2.40625C20.9922 2.35031 20.97 2.29665 20.9304 2.25709C20.8908 2.21754 20.8372 2.19531 20.7812 2.19531H2.21875C2.16281 2.19531 2.10915 2.21754 2.06959 2.25709C2.03004 2.29665 2.00781 2.35031 2.00781 2.40625V15.9063C2.00781 15.9622 2.03004 16.0158 2.06959 16.0554C2.10915 16.095 2.16281 16.1172 2.21875 16.1172H15.0859ZM20.9922 14.3126C20.2701 14.6672 19.4763 14.8516 18.6719 14.8516C17.8674 14.8516 17.0737 14.6672 16.3516 14.3126V19.0345L18.3555 17.888C18.4517 17.8325 18.5608 17.8032 18.6719 17.8032C18.783 17.8032 18.8921 17.8325 18.9883 17.888L20.9922 19.0345V14.3126Z" fill="#373F51" />
            </svg>
              Certificate</button>

          </div>
        </div>
        <button className="share-button"><svg width="13" height="12" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 7L11.5 0V4C4.5 5 1.5 10 0.5 15C3 11.5 6.5 9.9 11.5 9.9V14L18.5 7Z" fill="#1B1B1E" />
        </svg>
          Share</button>

      {/* </div> */}
    </div>
    {/* </div> */}
  </>
  );
};

export default AcademicsInformation;
