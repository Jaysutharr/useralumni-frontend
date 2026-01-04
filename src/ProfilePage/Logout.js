import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';  // The CSS file with the updated styles

const Logout = () => {
  const [isModelOpen, setIsModelOpen] = useState(true); // Automatically open the popup on mount
  const navigate = useNavigate();

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
    <div>
      {/* Conditional rendering of the popup based on isModelOpen */}
      {isModelOpen && (
        <div className="popup-box">
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to log out? You'll be logged out of your account and redirected to the sign-in page.</p>
          <p className="reminder">Remember to save any unsaved work before logging out.</p>
          <div className="popup-buttons">
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
