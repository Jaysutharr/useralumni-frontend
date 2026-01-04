import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './NetworkingHome.css';
import cI from '../assets/companylogo1.png';
import mI from '../assets/messageImage.jpeg';
import { useNavigate } from 'react-router-dom';
import nmI from '../assets/profileNetworkinfImage.jpeg';
import NetworkingDash from './NetworkingDash';

const NetworkingHome = () => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('connect');

  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const apiUrl = process.env.REACT_APP_LOCALURL || 'http://localhost:13417';
        const response = await axios.get(`${apiUrl}/api/v1/getalluser`);

        if (response.data.success) {
          // Backend returns { success: true, message: string, data: [users] }
          const usersData = response.data.data || [];
          setConnections(usersData);
        } else {
          const errorMsg = response.data.message || 'Failed to fetch users.';
          setError(errorMsg);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMsg,
          });
        }
      } catch (err) {
        console.error('Error fetching users:', err);

        let errorMessage = 'Failed to load users. Please try again.';
        if (err.response) {
          errorMessage = err.response.data?.message || errorMessage;
        } else if (err.request) {
          errorMessage = 'Network error. Please check your connection.';
        }

        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Error Loading Users',
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleProfileNavigation = () => {
    navigate('/network-profile');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMessageNavigation = () => {
    navigate('/network-message');
  };

  const toggleOverview = () => {
    setIsOverviewOpen(!isOverviewOpen);
  };

  const messagesData = [
    { id: 1, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
    { id: 2, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
    { id: 3, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI }
  ];

  const overviewItems = [
    "Overview Item 1",
    "Overview Item 2",
    "Overview Item 3",
    "Overview Item 4",
  ];

  const users = [
    {
      id: 1,
      name: "Gopal Savani",
      description: "UI/UX & Graphic Designer",
      follows: "Ravnish UI/UX Designer and 58 others follows",
      profileImage: nmI
    },
    {
      id: 2,
      name: "Gopal Savani",
      description: "UI/UX & Graphic Designer",
      follows: "Ravnish UI/UX Designer and 58 others follows",
      profileImage: nmI
    }
  ];

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <NetworkingDash />
      <div className="flex-container ">
        <div className="network-message-box">
          {/* Network Overview Section */}
          <div className="network-header" onClick={toggleOverview}>
            <h3>Network Overview</h3>
            <button className="network-dropdown-arrow">{isOverviewOpen ? '▲' : '▼'}</button>
          </div>

          {/* Conditional Rendering of Overview List */}
          {isOverviewOpen && (
            <ul className="network-overview-list">
              {overviewItems.map((item, index) => (
                <li key={index} className="network-overview-item">{item}</li>
              ))}
            </ul>
          )}

          {/* Messages Section */}
          <div className="network-messages-wrapper">
            <div className="network-message-title">
              <h4>Messages</h4>
              <button className="network-expand-btn" onClick={handleMessageNavigation}>
                <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2260_6689)">
                    <path d="M23.2503 2.31987C23.0903 2.31987 22.9303 2.31987 22.7703 2.31987C21.6505 2.31987 20.534 2.32987 19.4141 2.3132C18.8508 2.3032 18.4875 1.91659 18.4875 1.40332C18.4875 0.880052 18.8442 0.5101 19.4174 0.506767C21.4738 0.496768 23.5302 0.496768 25.5833 0.506767C26.1466 0.5101 26.4899 0.856722 26.4932 1.41998C26.5065 3.47639 26.5065 5.53279 26.4932 7.58586C26.4932 8.15579 26.1132 8.51241 25.5933 8.50907C25.0834 8.50907 24.6968 8.13912 24.6901 7.57586C24.6734 6.456 24.6834 5.33948 24.6834 4.21962C24.6834 4.05964 24.6834 3.903 24.6834 3.63303C24.4734 3.82967 24.3435 3.94299 24.2201 4.06631C21.6971 6.58599 19.1741 9.109 16.6511 11.632C16.5445 11.7387 16.4411 11.852 16.3178 11.9386C15.9279 12.2186 15.4446 12.1719 15.1246 11.8353C14.8147 11.5087 14.7847 11.0454 15.058 10.6721C15.1546 10.5388 15.2813 10.4255 15.3979 10.3088C17.9076 7.79583 20.4206 5.28615 22.9336 2.77648C23.0503 2.65982 23.1969 2.57317 23.3303 2.46985C23.3036 2.41652 23.2769 2.36653 23.2503 2.3132V2.31987Z" fill="#373F51" />
                    <path d="M2.49221 23.3503C2.58553 23.2137 2.66219 23.057 2.77551 22.9404C5.28186 20.424 7.79487 17.9143 10.3079 15.4047C10.4345 15.278 10.5645 15.1447 10.7112 15.038C11.0711 14.7847 11.5211 14.8214 11.8377 15.1114C12.1676 15.418 12.2343 15.8846 11.981 16.2646C11.881 16.4145 11.7477 16.5412 11.621 16.6678C9.11136 19.1808 6.59835 21.6905 4.08868 24.2035C3.96536 24.3268 3.84537 24.4568 3.66873 24.6435C3.89203 24.6568 4.03202 24.6735 4.17533 24.6735C5.26519 24.6735 6.35172 24.6735 7.44158 24.6735C8.10816 24.6768 8.51144 25.0201 8.52144 25.57C8.53144 26.1366 8.14482 26.4866 7.47157 26.4866C5.50516 26.4932 3.54208 26.4932 1.57566 26.4866C0.825761 26.4866 0.509135 26.1599 0.505802 25.4C0.499136 23.4503 0.502469 21.5005 0.505802 19.5508C0.505802 18.8676 0.835759 18.4809 1.39569 18.4743C1.96895 18.4676 2.3189 18.8775 2.32224 19.5708C2.32557 20.7906 2.32224 22.0105 2.32224 23.2303C2.37889 23.267 2.43555 23.3003 2.49221 23.337V23.3503Z" fill="#373F51" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2260_6689">
                      <rect width="26" height="26" fill="white" transform="translate(0.5 0.5)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            {/* Messages List */}
            <div className="network-message-list">
              {messagesData.map((msg) => (
                <div key={msg.id} className="network-message-item">
                  <img src={msg.img} alt="user" className="network-user-image" />
                  <div className="network-message-details">
                    <span className="network-user-name">{msg.name}</span>
                    <span className="network-message-text">{msg.message}</span>
                  </div>
                  <div className="network-message-meta">
                    <span className="network-time-stamp">{msg.time}</span>
                    <span className="network-unread-count">{msg.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="network-footer">
            <div className="network-footer-links">
              <span>About us</span>
              <span>Accessibility</span>
              <span>Help center</span>
            </div>
            <div className="network-footer-links">
              <span>Privacy & Terms</span>
              <span>Business Service</span>
              <span>More</span>
            </div>
            <div className="network-company-info">
              <img src={cI} alt="company-logo" style={{ height: "20px", width: '20px' }} />
              <span>Company @2024</span>
            </div>
          </div>
        </div>
        {/* ========================================================= */}
        <div className='networking-main-container'>
          <div className="connection-requests-container">
            <div className="tabs-container">
              <div className="tabs">
                <button
                  className={`tab connect-tab ${activeTab === 'connect-engage' ? 'active' : ''}`}
                  onClick={() => handleTabClick('connect-engage')}
                >
                  Connect & Engage
                </button>
                <button
                  className="tab stay-updated-tab"
                >
                  Stay Updated
                </button>
              </div>

              {activeTab === 'connect-engage' && (
                <div className="content connect-engage-content">
                </div>
              )}

              {activeTab === 'stay-updated' && (
                <div className="stay-updated-section">
                  <div className="stay-updated-filters">
                    <button className="stay-updated-filter active">All</button>
                    <button className="stay-updated-filter">Milestones & Achievements</button>
                    <button className="stay-updated-filter">Personal Celebrations</button>
                    <button className="stay-updated-filter">Educational Progress</button>
                  </div>

                  <div className="stay-updated-cards">
                    <div className="stay-updated-card">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="profile"
                        className="stay-updated-profile-image"
                      />
                      <div className="stay-updated-card-content">
                        <strong>Gopal Savani</strong>
                        <p>Celebrate Gopal's birthday <span className="stay-updated-today">today</span></p>
                        <div className="stay-updated-message">Wishing you a very happy birthday!</div>
                      </div>
                      <div className="stay-updated-card-actions">
                        <span className="stay-updated-like">👍 11</span>
                        <span className="stay-updated-comment">💬 11</span>
                        <span className="stay-updated-more">•••</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ borderBottom: '1px solid black' }}>
              <h2 className="connection-requests-heading">Connection Requests</h2>
              <div className="manage">Manage</div>
            </div>
            <div className="request-list">
              <div className="request-item">
                <img src={nmI} alt="Gopal Savani" className="profile-image-network" />
                <div className="request-details">
                  <p className='user-name-detail'>
                    <strong onClick={handleProfileNavigation}>Gopal Savani</strong> is now following you and would like to connect.
                  </p>
                  <p className="user-description">UI/UX & Graphic Designer</p>
                  <p className="user-follows">
                    <svg width="15" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8.5" r="7" stroke="#1B1B1E" strokeWidth="2" />
                      <circle cx="17" cy="8.5" r="7" stroke="#1B1B1E" strokeWidth="2" />
                    </svg>
                    Ravnish UI/UX Designer and 58 others follows
                  </p>
                </div>
                <div className="action-buttons">
                  <button className="ignore-button">Ignore</button>
                  <button className="accept-button">Accept</button>
                </div>
              </div>

              <div className="request-item1">
                <img src={nmI} alt="Gopal Savani" className="profile-image-network" />
                <div className="request-details">
                  <p className='user-name-detail'>
                    <strong onClick={handleProfileNavigation}>Gopal Savani</strong> is now following you and would like to connect.
                  </p>
                  <p className="user-description">UI/UX & Graphic Designer</p>
                  <p className="user-follows">
                    <svg width="15" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8.5" r="7" stroke="#1B1B1E" strokeWidth="2" />
                      <circle cx="17" cy="8.5" r="7" stroke="#1B1B1E" strokeWidth="2" />
                    </svg>
                    Ravnish UI/UX Designer and 58 others follows
                  </p>
                </div>
                <div className="action-buttons">
                  <button className="ignore-button">Ignore</button>
                  <button className="accept-button">Accept</button>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================================== */}
          <div className="boost-connections-container">
            <div className="boost-connections-header">
              <h2>Boost Your Connections</h2>
              <button className="boost-close-button">×</button>
            </div>
            <p className="boost-subtext">
              Speed up your networking by connecting with people who share similar interests or backgrounds.
            </p>
            <div className="boost-see-all">
              <span>See all</span>
            </div>

            <div className="boost-connections-list">
              {loading ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>Loading users...</p>
              ) : error ? (
                <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</p>
              ) : Array.isArray(connections) && connections.length > 0 ? (
                connections.map((connection, index) => (
                  <div key={index} className="boost-connection-item">
                    <img
                      src={connection.profileImage || nmI}
                      alt={connection.FullName || connection.email}
                      className="boost-profile-image"
                    />
                    <p className="boost-user-name">{connection.FullName || connection.email}</p>
                    <p className="boost-user-role">
                      {connection.isVerified ? '✓ Verified' : 'Not Verified'} •
                      Joined {formatDate(connection.createdAt)}
                    </p>
                    <button className="boost-connect-button">Connect now</button>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '20px' }}>No users found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkingHome;
