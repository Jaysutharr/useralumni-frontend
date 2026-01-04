import React, { useState } from 'react';
import './AccountSettings.css';
import Dashboard from '../Dashboard/Dashboard';
import SettingDash from './SettingDash';

const AccountSettings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [contactInfoVisibility, setContactInfoVisibility] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleToggle = () => {
    setProfileVisibility(!profileVisibility);
  };
  const handleToggleContact = () => {
    setContactInfoVisibility(!contactInfoVisibility);
  };
  const handleToggleStatus = () => {
    setActivityStatus(!activityStatus);
  };
  const handleToggleNoti = () => {
    setEmailNotifications(!emailNotifications);
  };
  const handleTogglePush = () => {
    setPushNotifications(!pushNotifications);
  };
  const handleToggleApp = () => {
    setInAppNotifications(!inAppNotifications);
  };
  const handleLogout = () => {
  // Example logout logic
  localStorage.clear();        // or remove token
  sessionStorage.clear();

  // redirect if needed
  window.location.href = "/login";
};

  return (
    <>
      <SettingDash />
      <div className="accountset-container">
        <h3>Account Settings</h3>
        <div className='acc-set-item'>
          <div className="accountset-item-dropdown">
            <label>Language Settings</label>
            <select className="accountset-dropdown">
              <option value="english">English</option>
              {/* Add other language options as needed */}
            </select>
          </div>

          <div className="accountset-item">
            <label>Profile Visibility</label>
            <div className="accountset-toggle-container">
              <span>Private</span>

              <div
                className={`accountset-switch ${profileVisibility ? 'active' : ''}`}  // Toggle the active class
                onClick={handleToggle} // Call the handler on click
              >
                <div className={`accountset-slider ${profileVisibility ? 'active' : ''}`} />
              </div>
              <span>Public</span>
            </div>
          </div>

          <div className="accountset-item">
            <label>Contact Info Visibility</label>
            <div className="accountset-toggle-container1">
              <span>Connections Only</span>

              <div
                className={`accountset-switch ${contactInfoVisibility ? 'active' : ''}`}  // Toggle the active class
                onClick={handleToggleContact} // Call the handler on click
              >
                <div className={`accountset-slider ${contactInfoVisibility ? 'active' : ''}`} />
              </div>
              <span>Hide from Everyone</span>
            </div>
          </div>

          <div className="accountset-item">
            <label>Activity Status</label>
            <div className="accountset-toggle-container2">
              <span>Hide when online</span>

              <div
                className={`accountset-switch ${activityStatus ? 'active' : ''}`}  // Toggle the active class
                onClick={handleToggleStatus} // Call the handler on click
              >
                <div className={`accountset-slider ${activityStatus ? 'active' : ''}`} />
              </div>
              <span>Show</span>
            </div>
          </div>
        </div>
      </div>
      {/* ============================================================= */}
      <div className="notifiset-container">
        <h3>Notifications Settings</h3>

        <div className="notifiset-item-dropdown">
          <div className="notifiset-item">
            <label>Email Notifications</label>
            <div className="notifiset-toggle-container">
              <span>Off</span>

              <div
                className={`accountset-switch ${emailNotifications ? 'active' : ''}`}  // Toggle the active class
                onClick={handleToggleNoti} // Call the handler on click
              >
                <div className={`accountset-slider ${emailNotifications ? 'active' : ''}`} />
              </div>
              <span>On</span>
            </div>
          </div>

          <div className="notifiset-item">
            <label>Push Notifications</label>
            <div className="notifiset-toggle-container1">
              <span>Off</span>
              <div
                className={`${pushNotifications ? 'notifiset-on' : ''}`}
                onClick={() => setPushNotifications(!pushNotifications)}
              >
              
                <div
                  className={`accountset-switch ${pushNotifications ? 'active' : ''}`}  // Toggle the active class
                  onClick={handleTogglePush} // Call the handler on click
                >
                  <div className={`accountset-slider ${pushNotifications ? 'active' : ''}`} />
                </div>
              </div>
              <span>On</span>
            </div>
          </div>

          <div className="notifiset-item">
            <label>In-App Notifications</label>
            <div className="notifiset-toggle-container2">
              <span>Off</span>

              <div
                className={`accountset-switch ${inAppNotifications ? 'active' : ''}`}  // Toggle the active class
                onClick={handleToggleApp} // Call the handler on click
              >
                <div className={`accountset-slider ${inAppNotifications ? 'active' : ''}`} />
              </div>

              <span>On</span>
            </div>
          </div>
        </div>
      </div>
      {/* ================================================================== */}
      <div className="dataset-container">
        <h3>Data Settings</h3>
        <div className='dataset-cont-set'>
          <div className="dataset-item">
            <label>Data Settings</label>
            <button className="dataset-button">Download your data</button>
          </div>

          <div className="dataset-item">
            <label>Logout</label>
            <button
              className="dataset-button"
              onClick={() => setShowLogoutModal(true)}
            >Logout</button>

          </div>

          <div className="dataset-item">
            <label>Delete Account</label>
            <button className="dataset-button">Delete</button>
          </div>
        </div>
      </div>
      {/* {showLogoutModal && (
  <div className="logout-overlay">
    <div className="logout-modal">
      <h2>Are you sure you want to<br />Log out?</h2>
    </div>
  </div>
)} */}
{showLogoutModal && (
  <div className="logout-overlay">
    <div className="logout-modal">
      <h2>
        Are you sure you want to <br /> Log out?
      </h2>

      <div className="logout-actions">
        <button
          className="cancel-btn"
          onClick={() => setShowLogoutModal(false)}
        >
          Cancel
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  </div>
)}

    </>

  );
};

export default AccountSettings;
