import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPopup = ({ setShowPopup }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform the logout logic
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-center">Confirm Logout</h2>
        <p className="text-gray-700 text-center mb-4">
          Are you sure you want to log out? You'll be logged out of your account and redirected to the sign-in page.
        </p>
        <p className="text-sm text-center text-gray-500 mb-6">
          (Remember to save any unsaved work before logging out.)
        </p>
        <div className="flex justify-around">
          <button
            className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg w-32"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
          <button
            className="bg-teal-500 text-white py-2 px-4 rounded-lg w-32"
            onClick={handleLogout}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
