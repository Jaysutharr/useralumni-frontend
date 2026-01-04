import React, { useState , useEffect} from "react";
import "./ProfileSettings.css"; // External CSS for better control
import ProfilePage from './ProfilePage'
import pI from '../assets/ProfileImage.jpeg'
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const [language, setLanguage] = useState("English");
  const [visibility, setVisibility] = useState("Everyone");
  
 
const [profileData, setProfileData] = useState(null);
const [searchVisibility, setSearchVisibility] = useState(true); 
const [activityStatus, setActivityStatus] = useState(true); // default to 'true' (shown as ON)
const [recentActivityVisibility, setRecentActivityVisibility] = useState('Show'); // default to 'Show'
const [pushEnabled, setPushEnabled] = useState(true);
const [dataFormat, setDataFormat] = useState('CSV'); // Default format is CSV
const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  


 

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

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









// -------------------------------------------------------------


const handleToggle = () => {
  setSearchVisibility(!searchVisibility);
};
// -------------------------------------------------

  const handleNotiToggle = () => {
    setPushEnabled(!pushEnabled);
  };


// ----------------------------------------------


const toggleActivityStatus = () => {
  setActivityStatus(!activityStatus);
};

const toggleRecentActivity = () => {
  setRecentActivityVisibility((prev) => (prev === 'Show' ? 'Hide' : 'Show'));
};
// -------------------------------------------------------------------------

const toggleDownloadFormat = () => {
  setDataFormat((prevFormat) => (prevFormat === 'CSV' ? 'JSON' : 'CSV'));
};
// -----------------------------------------------------------------------------

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
          <li className="active1" onClick={() => navigate('/settings')}>
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

{/* ================================================================================== */}
    <div style={{ marginLeft:'100px', marginTop:"-20px"}}>
    <div className="settings-container">
      {/* Language Dropdown */}
      <div className="language-container">
        <label className="language-title">Language:</label>
        <div className="language-box">
        <div className="language-input">
          Select Language
        </div>
          <select value={language} onChange={handleLanguageChange} className="language-select">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>

      {/* Contact Info Visibility Dropdown */}
      <div className="contact-container">
        <label className="contact-title">Who Can See Your Contact Info:</label>
        <div className="contact-box">
        <div className="contact-input">
        Contact Info Visibility
        </div>
        
          <select value={visibility} onChange={handleVisibilityChange} className="contact-select">
            <option value="Everyone">Everyone</option>
            <option value="Friends">Friends</option>
            <option value="Only Me">Only Me</option>
          </select>
        </div>
      </div>
    </div>
{/* ==================================================================================== */}
<div className="visibility-container">
      <label className="visibility-title">Visibility Options :</label>
      <div className="visibility-box">
        <div className="profile-visibility">
          <label className="profile-visibility-label">Profile Visibility</label>
          <select className="profile-visibility-select">
            <option>Public</option>
            <option>Private</option>
            <option>Friends</option>
          </select>
        </div>
        <div className="search-visibility">
          <label className="search-visibility-label">Search Engine Visibility</label>
          <div
            className={`toggle-switch-call ${searchVisibility ? 'active' : ''}`}  // Toggle the active class
            onClick={handleToggle} // Call the handler on click
          >
            <div className={`toggle-thumb-call ${searchVisibility ? 'active' : ''}`} />
          </div>
        </div>
      </div>
    </div>
{/* ================================================== */}
<div className="notifications-container">
      <label className="notifications-title">Notifications :</label>
      <div className="notifications-box">
        <div className="push-notifications">
          <label className="push-label">Push Notifications</label>
          <div
            className={`toggle-switch-noti ${pushEnabled ? 'active' : ''}`}  // Toggle the active class
            onClick={handleNotiToggle} // Call the handler on click
          >
            <div className={`toggle-thumb-noti ${pushEnabled  ? 'active' : ''}`} />
          </div>
        </div>
        <div className="notification-settings">
          <div className="notification-item">
            <label>Email Notifications</label>
            <select>
              <option>Instant</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="notification-item">
            <label>Notifications Type</label>
            <select>
              <option>All</option>
              <option>Mentions</option>
              <option>Direct Messages</option>
            </select>
          </div>
          <div className="notification-item">
            <label>In-App Notifications</label>
            <select>
              <option>All</option>
              <option>Important</option>
              <option>None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    {/* ========================================================================= */}

     <div className="activity-status-container">
      <div className="activity-status-title">Activity Status :</div>
      <div className="activity-status-box">
      <div className="activity-toggle">
          <label className="activity-label">Activity Status</label>
          <div className={`toggle-switch-acti ${activityStatus ? 'active' : ''}`} onClick={toggleActivityStatus}>
            <div className={`toggle-thumb-acti ${activityStatus ? 'active' : ''}`} />
          </div>
        </div>

        <div className="recent-activity-toggle">
          <label className="recent-activity-label">Recent Activity Visibility</label>
          <div className="toggle-options">
            <span>Show</span>
            <div
              className={`toggle-switch ${recentActivityVisibility === 'Hide' ? 'hide' : 'show'}`}
              onClick={toggleRecentActivity}
            >
              <div className="toggle-thumb" />
            </div>
            <span>Hide</span>
          </div>
        </div>
      </div>
    </div>


    {/* ================================================================= */}

    <div className="download-options-container">
      <label className="download-title">Download Options :</label>

      <div className="download-option">
        <div className="download-data">
          <label className="download-data-label">Download data</label>
          <select className="download-select">
            <option>None</option>
            <option>Data 1</option>
            <option>Data 2</option>
          </select>
        </div>

        <div className="data-format">
          <label className="data-format-label">Data Format</label>
          <div className="toggle-options">
            <span>CSV</span>
            <div
              className={`toggle-switch ${dataFormat === 'JSON' ? 'json' : 'csv'}`}
              onClick={toggleDownloadFormat}
            >
              <div className="toggle-thumb" />
            </div>
            <span>JSON</span>
          </div>
        </div>
      </div>
    </div>
{/* ============================================================================= */}

<div className="free-up-storage-container">
      <label className="free-up-title">Free up Storage :</label>

      <div className="storage-option">
        <div className="clear-cache">
          <label className="clear-cache-label">Clear Cache</label>
        </div>

        <div className="select-dropdown">
          <select className="dropdown-select-storage">
            <option>Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      </div>
    </div>
{/* ===================================================================== */}
<div className="deleted-storage-container">
      <label className="deleted-title">Delete Options :</label>

      <div className="deleted-option">
        <div className="deleted-clear-cache">
          <label className="deleted-clear-cache-label">Delete Account</label>
        </div>

        <div className="deleted-select-dropdown">
          <select className="deleted-dropdown-select-storage">
            <option>Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      </div>
    </div>















 

    </div>
     
</div>
    </>
  );
};

export default ProfileSettings;
