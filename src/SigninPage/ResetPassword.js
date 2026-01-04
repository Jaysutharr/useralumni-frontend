import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState('');  // OTP for DEV mode display
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and devOtp from navigation state if available
  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email);
      }
      if (location.state.devOtp) {
        setDevOtp(location.state.devOtp);
      }
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Frontend validation
    if (newPassword !== retypePassword) {
      setError('New password and Retype password do not match.');
      return;
    }

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(process.env.REACT_APP_LOCALURL + '/api/v1/user-forgot-password', {
        email: email.toLowerCase(),
        OTP: otp,  // Send as OTP (uppercase) to match backend
        newPassword,
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful!',
          text: 'Redirecting to sign in...',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(response.data.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        console.error('Backend Error:', err.response.data);
        setError(err.response.data.message || 'Unexpected server error.');
      } else if (err.request) {
        console.error('No Response:', err.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error:', err.message);
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="background-container-img1">
      <div className="background-container-img2">
        <div className="reset-wrapper">
          <h2 className="reset-heading">Reset your password</h2>
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="reset-form-group">
              <label htmlFor="email" className="reset-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="reset-input"
                required
              />
            </div>
            <div className="reset-form-group">
              <label htmlFor="otp" className="reset-label">OTP</label>
              {/* DEV MODE: Show OTP on screen */}
              {devOtp && (
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  textAlign: 'center'
                }}>
                  <p style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '11px', opacity: 0.8 }}>
                    🔧 DEV MODE - Your OTP Code:
                  </p>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#fff',
                    letterSpacing: '6px'
                  }}>
                    {devOtp}
                  </div>
                </div>
              )}
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP shown above"
                className="reset-input"
                required
              />
            </div>
            <div className="reset-form-group">
              <label htmlFor="newPassword" className="reset-label">New password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
                className="reset-input"
                required
              />
            </div>
            <div className="reset-form-group">
              <label htmlFor="retypePassword" className="reset-label">Retype password</label>
              <input
                type="password"
                id="retypePassword"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                placeholder="Re-enter new password"
                className="reset-input"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="reset-button" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
