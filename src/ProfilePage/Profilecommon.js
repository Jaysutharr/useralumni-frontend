// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import './Profilecommon.css';
// import ProfilePage from './ProfilePage';

// const Profilecommon = () => {
//   const navigate = useNavigate(); // Initialize the navigate function

//   return (
//     <>
//       <ProfilePage/>
//       {/* <div className="sidebar2" >
//       <div className="sidebar1">
//         <ul>
//           <li className="active1" onClick={() => navigate('/profile')}>
//             My Profile
//           </li>
//           <li onClick={() => navigate('/academics')}>
//             Academics Information
//           </li>
//           <li onClick={() => navigate('/security')}>
//             Security
//           </li>
//           <li onClick={() => navigate('/teams-connections')}>
//             Teams & Connections
//           </li>
//           <li onClick={() => navigate('/settings')}>
//             Settings
//           </li>
//           <li onClick={() => navigate('/help-support')}>
//             Help & Support
//           </li>
//           <li onClick={() => navigate('/logout')}>
//             Logout
//           </li>
//         </ul>
//       </div>
//     </div> */}
//     </>
//   );
// };

// export default Profilecommon;















// //API CALL THEN this code are used 

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './ProfileFirst.css';
// // import Profilecommon from './Profilecommon'; // Import the sidebar component

// // const ProfileFirst = () => {
// //   const [profileData, setProfileData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Fetch data from the backend API
// //     axios.get('/api/profile') // Replace with your API endpoint
// //       .then(response => {
// //         setProfileData(response.data);
// //         setLoading(false);
// //       })
// //       .catch(error => {
// //         console.error('There was an error fetching the profile data!', error);
// //         setError('Failed to fetch data.');
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>; // Show loading message while data is being fetched
// //   }

// //   if (error) {
// //     return <div>{error}</div>; // Show error message if there's an issue
// //   }

// //   return (
// //     <>
// //       <Profilecommon /> {/* Sidebar component */}
// //       <div className="profile-container">
// //         <h1 className="profile-title">My Profile</h1>

// //         <ProfileHeader profileData={profileData} />
// //         <ProfileSection title="Personal Information">
// //           <ProfileField label="First name" value={profileData.firstName} />
// //           <ProfileField label="Last name" value={profileData.lastName} />
// //           <ProfileField label="Email address" value={profileData.email} />
// //           <ProfileField label="Phone" value={profileData.phone} />
// //           <ProfileField label="Bio" value={profileData.bio} />
// //         </ProfileSection>

// //         <ProfileSection title="Address">
// //           <ProfileField label="Country" value={profileData.country} />
// //           <ProfileField label="Postal code" value={profileData.postalCode} />
// //           <ProfileField label="City/State" value={profileData.cityState} />
// //           <ProfileField label="Tax Id" value={profileData.taxId} />
// //         </ProfileSection>
// //       </div>
// //     </>
// //   );
// // };

// // const ProfileHeader = ({ profileData }) => (
// //   <div className="profile-header">
// //     <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
// //     <div className="profile-info">
// //       <h2>{profileData.firstName} {profileData.lastName}</h2>
// //       <p>{profileData.jobTitle}<br />{profileData.location}</p>
// //     </div>
// //     <button className="edit-button">✎ Edit</button>
// //   </div>
// // );

// // const ProfileSection = ({ title, children }) => (
// //   <div className="profile-section">
// //     <div className="profile-section-header">
// //       <h3>{title}</h3>
// //       <button className="edit-button">✎ Edit</button>
// //     </div>
// //     <div className="profile-details">{children}</div>
// //   </div>
// // );

// // const ProfileField = ({ label, value }) => (
// //   <div className="profile-field">
// //     <p><strong>{label}</strong><br />{value}</p>
// //   </div>
// // );

// // export default ProfileFirst;
