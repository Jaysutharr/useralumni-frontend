import React, { useRef, useState, useEffect } from 'react';
import './TeamsConnections.css'; // Import your CSS file here for styling
import ProfilePage from './ProfilePage';
import ti from '../assets/teamimage.jpeg';
import pI from '../assets/ProfileImage.jpeg'
import { useNavigate } from 'react-router-dom';
import ci from '../assets/connectionimage.jpeg'

//team
const teamsData = [
  { id: 1, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 2, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 3, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 4, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 5, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 6, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 7, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 8, name: 'Design Dynamo', role: 'UI/UX Designer' },
  { id: 9, name: 'Design Dynamo', role: 'UI/UX Designer' },
];
//connection
const connectionsData = [
  { id: 1, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 2, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 3, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 4, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 5, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 6, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 7, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 8, name: 'Shikar Dhawan', role: 'Frontend Developer' },
  { id: 9, name: 'Shikar Dhawan', role: 'Frontend Developer' },
];
//Blocke-team
const blockedMembersData = [
  { id: 1, name: 'John Doe - Blocked', role: 'Backend Developer' },
  { id: 2, name: 'Jane Smith - Blocked', role: 'UI/UX Designer' },
  { id: 3, name: 'Alice Johnson - Blocked', role: 'Project Manager' },
  { id: 4, name: 'Bob Brown - Blocked', role: 'QA Tester' },
  { id: 5, name: 'Carol White - Blocked', role: 'DevOps Engineer' },
  { id: 6, name: 'David Black - Blocked', role: 'Data Scientist' },
  { id: 7, name: 'Eve Green - Blocked', role: 'Marketing Specialist' },
  { id: 8, name: 'Frank Gray - Blocked', role: 'Sales Manager' },
  { id: 9, name: 'Grace Lee - Blocked', role: 'HR Coordinator' },
];
//

const TeamsConnections = () => {
  //team
  const [expanded, setExpanded] = useState(false);
  const teamsContainerRef = useRef(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [activeTeamId, setActiveTeamId] = useState(null); // Renamed from `currentMenuId`
  const [areOptionsVisible, setAreOptionsVisible] = useState(false); // Renamed from `optionsVisible`
  //connection
  const [isConnectionsExpanded, setIsConnectionsExpanded] = useState(false);
  const connectionsContainerRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentConnectionId, setCurrentConnectionId] = useState(null);
  //Blockedteam
  const [isBlockedContainerExpanded, setIsBlockedContainerExpanded] = useState(false);
  const blockedTeamsContainerRef = useRef(null);
  const [isBlockedSearchFocused, setIsBlockedSearchFocused] = useState(false);
  const [blockedTeamId, setBlockedTeamId] = useState(null);
  //BlockedConnection
  const [isBlockedConnectionsExpanded, setIsBlockedConnectionsExpanded] = useState(false);
  const blockedConnectionsContainerRef = useRef(null);
  const [isBlockedConnectionsSearchFocused, setIsBlockedConnectionsSearchFocused] = useState(false); // Updated name
  const [currentBlockedConnectionId, setCurrentBlockedConnectionId] = useState(null);
  const [expandedConnectionId, setExpandedConnectionId] = useState(null);



  const [activeMenu, setActiveMenu] = useState(null); // Track which member's menu is open


  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  const [currentMenuId, setCurrentMenuId] = useState(null); // Track which connection's menu is active
  const [optionsVisible, setOptionsVisible] = useState(false); // Track if options are visible



  const [profileData, setProfileData] = useState(null);
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














  const toggleMenuConn = (id) => {
    if (currentMenuId === id) {
      setOptionsVisible(!optionsVisible); // Toggle visibility if the same menu is clicked
    } else {
      setCurrentMenuId(id);
      setOptionsVisible(true);
    }
  };

  const closeMenuConn = () => {
    setOptionsVisible(false);
    setCurrentMenuId(null);
  };

  const handleUnblockConn = (id) => {
    // Handle unblock logic
    alert(`Unblock ${id}`);
    closeMenu();
  };

  const handleDeleteConn = (id) => {
    // Handle delete logic
    alert(`Delete ${id}`);
    closeMenu();
  };





  //blockedconnection-menu dots code 

  // ===========================================================
  //team
  const handleViewAll = () => {
    setExpanded(true);
    setTimeout(() => {
      if (teamsContainerRef.current) {
        teamsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Adjust delay if needed
  };

  const handleBack = () => {
    setExpanded(false);
  };
  const togglePopup = (teamId) => {
    if (selectedTeamId === teamId) {
      setSelectedTeamId(null); // Close the popup if it's already open
    } else {
      setSelectedTeamId(teamId); // Open the popup for the clicked team
    }
  };


  const toggleOptionsMenu = (id) => {
    if (activeTeamId === id) {
      setAreOptionsVisible(!areOptionsVisible); // Toggle visibility if the same menu is clicked
    } else {
      setActiveTeamId(id);
      setAreOptionsVisible(true);
    }
  };

  const closeOptionsMenu = () => {
    setAreOptionsVisible(false);
    setActiveTeamId(null);
  };

  const handleUnblockteam = (id) => {
    alert(`Unblock ${id}`);
    closeOptionsMenu();
  };

  const handleDeleteteam = (id) => {
    alert(`Delete ${id}`);
    closeOptionsMenu();
  };

  // =================================================
  //connection
  const handleViewAllConnections = () => {
    setIsConnectionsExpanded(true);
    setTimeout(() => {
      if (connectionsContainerRef.current) {
        connectionsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Adjust delay if needed
  };

  const handleBackConnections = () => {
    setIsConnectionsExpanded(false);
  };

  const toggleConnectionPopup = (connectionId) => {
    if (currentConnectionId === connectionId) {
      setCurrentConnectionId(null); // Close the popup if it's already open
    } else {
      setCurrentConnectionId(connectionId); // Open the popup for the clicked connection
    }
  };
  // =====================================================
  //blockedTeams
  const expandBlockedTeamsList = () => {
    setIsBlockedContainerExpanded(true);
    setTimeout(() => {
      if (blockedTeamsContainerRef.current) {
        blockedTeamsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Adjust delay if needed
  };

  const collapseBlockedTeamsList = () => {
    setIsBlockedContainerExpanded(false);
  };

  const showOrHideBlockedMemberDetails = (teamId) => {
    if (blockedTeamId === teamId) {
      setBlockedTeamId(null); // Close the popup if it's already open
    } else {
      setBlockedTeamId(teamId); // Open the popup for the clicked team
    }
  };
  const toggleMenu = (memberId) => {
    if (activeMenu === memberId) {
      setActiveMenu(null); // Hide menu if it's already active
    } else {
      setActiveMenu(memberId); // Show menu for the clicked member
    }
  };

  const closeMenu = () => {
    setActiveMenu(null); // Close the menu
  };
  // =====================================================
  //BlockedConnections
  const handleViewAllBlockedConnections = () => {
    setIsBlockedConnectionsExpanded(true);
    setTimeout(() => {
      if (blockedConnectionsContainerRef.current) {
        blockedConnectionsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Adjust delay if needed
  };

  const handleBackBlockedConnections = () => {
    setIsBlockedConnectionsExpanded(false);
  };

  const toggleBlockedConnectionPopup = (connectionId) => {
    if (currentBlockedConnectionId === connectionId) {
      setCurrentBlockedConnectionId(null); // Close the popup if it's already open
    } else {
      setCurrentBlockedConnectionId(connectionId); // Open the popup for the clicked connection
    }
  };
  const handleMenuClick = (id) => {
    if (expandedConnectionId === id) {
      setExpandedConnectionId(null); // Close if already open
    } else {
      setExpandedConnectionId(id); // Open new menu
    }
  };

  const handleUnblock = (id) => {
    // Handle unblock logic here
    console.log('Unblock', id);
    setExpandedConnectionId(null); // Hide menu after action
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log('Delete', id);
    setExpandedConnectionId(null); // Hide menu after action
  };

  const handleCancel = (id) => {
    // Handle cancel logic here
    console.log('Cancel', id);
    setExpandedConnectionId(null); // Hide menu after action
  };
 // Handle logout button click to open the popup
 const handleLogoutClick = () => {
  setIsModelOpen(true);
};

// Handle cancel button to close the popup
const handleDashCancel = () => {
  setIsModelOpen(false);
};

// Handle confirm button to redirect to sign-in page
const handleConfirm = () => {
  setIsModelOpen(false);
  navigate('/signin'); // Redirect to sign-in page
};


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
          <li className="active1" onClick={() => navigate('/academics')}>
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
              <button onClick={handleDashCancel} className="cancel-button"><h2>Cancel</h2></button>
              <button onClick={handleConfirm} className="confirm-button"><h2>Confirm</h2></button>
            </div>
          </div>
        </>
      )}


    </div>
      <div className='teams-main-overall-container'>
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


        {/* ============================================================================== */}
        <div className="my-teams-container" >
          <div className="header-team">
            {/* Show the back button only when the container is expanded */}
            <div className={`back-button ${expanded ? 'visible' : 'hidden'}`} onClick={handleBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            <h3>My Teams</h3>
            <div
              className={`search-bar-team ${searchFocused ? 'focused' : ''}`}
              onMouseEnter={() => setSearchFocused(true)}
              onMouseLeave={() => setSearchFocused(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z"
                  stroke="#5F5F5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="search here"
                className="search-input"
              />
            </div>
            {/* Instead of display: none, use opacity to hide the button without shifting layout */}
            <button onClick={handleViewAll} className={`expand-btn ${expanded ? 'hidden' : 'visible'}`}>
              View All
            </button>
          </div>

          <div
            className={`teams-container ${expanded ? 'expanded' : ''}`}
            ref={teamsContainerRef}
          >
            <div className="teams-list">
              {teamsData.map((team) => (
                <div className="team-item" key={team.id}>
                  <div className="avatar">
                    <img
                      src={ti} // Replace with actual avatar URL
                      alt="Avatar"
                    />
                  </div>
                  <div className="team-details">
                    <h4>{team.name}</h4>
                    <p>{team.role}</p>
                  </div>
                  <div className="team-menu-dots">
                    {activeTeamId === team.id ? (
                      <div className="menu-options">
                        <button onClick={() => handleUnblockteam(team.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-unlock"
                          >
                            <path d="M12 17v5m-5-5v-1a5 5 0 0 1 10 0v1m-7-3a3 3 0 0 1 6 0v1H5v-1a3 3 0 0 1 6 0z"></path>
                          </svg>
                          Unblock
                        </button>
                        <button onClick={() => handleDeleteteam(team.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash"
                          >
                            <path d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M4 6l1-2h14l1 2"></path>
                          </svg>
                          Delete
                        </button>
                        <button onClick={closeOptionsMenu}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x"
                          >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span onClick={() => toggleOptionsMenu(team.id)}>...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*=====================================================================================*/}
        {/* Connection */}
        <div className="my-connections-container-team">
          <div className="header-connection">
            <div className={`back-button ${isConnectionsExpanded ? 'visible' : 'hidden'}`} onClick={handleBackConnections}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            <h3>My Connections</h3>
            <div
              className={`search-bar-connection ${isSearchFocused ? 'focused' : ''}`}
              onMouseEnter={() => setIsSearchFocused(true)}
              onMouseLeave={() => setIsSearchFocused(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z"
                  stroke="#5F5F5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="search here"
                className="search-input-connection"
              />
            </div>
            <button onClick={handleViewAllConnections} className="view-all-btn-connection" style={{ opacity: isConnectionsExpanded ? 0 : 1 }}>View all</button>
          </div>
          <div
            className={`connections-container ${isConnectionsExpanded ? 'expanded' : ''}`}
            ref={connectionsContainerRef}
          >
            <div className="connections-list">
              {connectionsData.map((connection) => (
                <div className="connection-item" key={connection.id}>
                  <div className="avatar-conn">
                    <img
                      src={ci} // Replace with actual avatar URL
                      alt="Avatar"
                    />
                  </div>
                  <div className="connection-details">
                    <h4>{connection.name}</h4>
                    <p>{connection.role}</p>
                  </div>
                  {/* <div className="menu-dots"> */}
                  <div className="menu-dots">
                    {currentMenuId === connection.id && optionsVisible ? (
                      <div className="menu-options">
                        <button onClick={() => handleUnblockConn(connection.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-unlock"
                          >
                            <path d="M12 17v5m-5-5v-1a5 5 0 0 1 10 0v1m-7-3a3 3 0 0 1 6 0v1H5v-1a3 3 0 0 1 6 0z"></path>
                          </svg>
                          Unblock
                        </button>
                        <button onClick={() => handleDeleteConn(connection.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash"
                          >
                            <path d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M4 6l1-2h14l1 2"></path>
                          </svg>
                          Delete
                        </button>
                        <button onClick={closeMenuConn}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x"
                          >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span onClick={() => toggleMenuConn(connection.id)}>...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* =========================================================================== */}
        {/* blockedTeam */}

        <div className={`my-teams-container-blocked ${isBlockedContainerExpanded ? 'expanded' : 'collapsed'}`} ref={blockedTeamsContainerRef}>
          <div className="blocked-teams-header">
            {/* Show the back button only when the container is expanded */}
            <div className={`back-btn ${isBlockedContainerExpanded ? 'visible' : 'hidden'}`} onClick={collapseBlockedTeamsList}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            <h3>Blocked Teams </h3>
            <div
              className={`search-bar-blocked ${isBlockedSearchFocused ? 'focused' : ''}`}
              onMouseEnter={() => setIsBlockedSearchFocused(true)}
              onMouseLeave={() => setIsBlockedSearchFocused(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z"
                  stroke="#5F5F5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search here"
                className="search-input-blocked"
              />
            </div>
            {/* Instead of display: none, use opacity to hide the button without shifting layout */}
            <button onClick={expandBlockedTeamsList} className="expand-btn" style={{ opacity: isBlockedContainerExpanded ? 0 : 1 }}>View All</button>
          </div>
          <div
            className={`blocked-teams-container ${isBlockedContainerExpanded ? 'expanded' : ''}`}
            ref={blockedTeamsContainerRef}
          >
            <div className="blocked-teams-list">
              {blockedMembersData.map((member) => (
                <div className="blocked-team-item" key={member.id}>
                  <div className="team-avatar">
                    <img
                      src={ti} // Replace with actual avatar URL
                      alt="Avatar"
                    />
                  </div>
                  <div className="team-details-blocked">
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                  <div className="team-menu-dots">
                    {activeMenu === member.id ? (
                      <div className="menu-options">
                        <button onClick={() => handleUnblock(member.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-unlock"
                          >
                            <path d="M12 17v5m-5-5v-1a5 5 0 0 1 10 0v1m-7-3a3 3 0 0 1 6 0v1H5v-1a3 3 0 0 1 6 0z"></path>
                          </svg>
                          Unblock
                        </button>
                        <button onClick={() => handleDelete(member.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash"
                          >
                            <path d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M4 6l1-2h14l1 2"></path>
                          </svg>
                          Delete
                        </button>
                        <button onClick={closeMenu}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x"
                          >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span onClick={() => toggleMenu(member.id)}>...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* BlockedConnection */}
        <div className='my-blocked-connection-container'>
          <div className={`blocked-connections-container ${isBlockedConnectionsExpanded ? 'expanded' : 'collapsed'}`} ref={blockedConnectionsContainerRef}>
            <div className="header-blocked-connection">
              <div
                className={`back-button-blocked-connection ${isBlockedConnectionsExpanded ? 'visible' : 'hidden'}`}
                onClick={handleBackBlockedConnections}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-left"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>
              <h3>Blocked Connections</h3>
              <div
                className={`search-bar-blocked-connection ${isBlockedConnectionsSearchFocused ? 'focused' : ''}`} // Updated name
                onMouseEnter={() => setIsBlockedConnectionsSearchFocused(true)} // Updated name
                onMouseLeave={() => setIsBlockedConnectionsSearchFocused(false)} // Updated name
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z"
                    stroke="#5F5F5F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="search here"
                  className="search-input-blocked-connection"
                />
              </div>
              <button
                onClick={handleViewAllBlockedConnections}
                className="view-all-btn-blocked-connection"
                style={{ opacity: isBlockedConnectionsExpanded ? 0 : 1 }}
              >
                View All
              </button>
            </div>
            <div
              className={`blocked-connections-container ${isBlockedConnectionsExpanded ? 'expanded' : ''}`}
              ref={blockedConnectionsContainerRef}
            >
              <div className="blocked-connections-list">
                {connectionsData.map((connection) => (
                  <div className="blocked-connection-item" key={connection.id}>
                    <div className="avatar-blocked-conn">
                      <img
                        src={ci} // Replace with actual avatar URL
                        alt="Avatar"
                      />
                    </div>
                    <div className="blocked-connection-details">
                      <h4>{connection.name}</h4>
                      <p>{connection.role}</p>
                    </div>
                    <div className="menu-dots-blocked-conn">
                      {expandedConnectionId === connection.id ? (
                        <div className="menu-actions">
                          <button onClick={() => handleUnblock(connection.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-unlock"
                            >
                              <path d="M12 17v5m-5-5v-1a5 5 0 0 1 10 0v1m-7-3a3 3 0 0 1 6 0v1H5v-1a3 3 0 0 1 6 0z"></path>
                            </svg>
                            Unblock
                          </button>
                          <button onClick={() => handleDelete(connection.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-trash"
                            >
                              <path d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M4 6l1-2h14l1 2"></path>
                            </svg>
                            Delete
                          </button>
                          <button onClick={() => handleCancel(connection.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-x"
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span onClick={() => handleMenuClick(connection.id)}>...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default TeamsConnections;
