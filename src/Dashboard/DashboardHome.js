// import React,{useState, useEffect} from "react";
// import "./DashboardHome.css";
// import topMentor from '../assets/ProfileImage.jpeg';
// import topArticle from '../assets/dashboardtoparticle.jpeg';
// import messageImage from '../assets/messageImage.jpeg';
// import Dashboard from "./Dashboard";
// import { useNavigate } from "react-router-dom";
// import mI from '../assets/messageImage.jpeg'



// const festivalsByMonth = {
//     January: [
//       { day: 14, name: 'Vasant Panchami' },
//       { day: 16, name: 'Ratha Saptami' },
//     ],
//     February: [
//       { day: 14, name: 'Maha Shivaratri' },
//       { day: 16, name: 'Vasant Panchami' },
//     ],
//     March: [
//       { day: 14, name: 'Holi' },
//       { day: 16, name: 'Ugadi' },
//     ],
//     // You can add more festivals for other months here...
//   };

// const DashboardHome = () => {
// const navigate = useNavigate();
//     const [currentMonth, setCurrentMonth] = useState('');
//     const [festivals, setFestivals] = useState([]);
  
//     useEffect(() => {
//       // Get the current month using JavaScript's Date object
//       const today = new Date();
//       const month = today.toLocaleString('default', { month: 'long' });
  
//       // Set the current month
//       setCurrentMonth(month);
  
//       // Retrieve festivals for the current month
//       if (festivalsByMonth[month]) {
//         setFestivals(festivalsByMonth[month]);
//       }
//     }, []);
//     const announcements = [
//         {
//             id: 1,
//             date: "29/07/24",
//             dept: "IT",
//             title: "Upcoming Alumni Reunion Event",
//         },
//         {
//             id: 2,
//             date: "29/07/24",
//             dept: "IT",
//             title: "Upcoming Alumni Reunion Event",
//         },
//         {
//             id: 3,
//             date: "29/07/24",
//             dept: "IT",
//             title: "Upcoming Alumni Reunion Event",
//         },
//         {
//             id: 4,
//             date: "29/07/24",
//             dept: "IT",
//             title: "Upcoming Alumni Reunion Event",
//         },
//     ];
//     const today = new Date();

//   // State to store the current date (year and month)
//   const [currentDate, setCurrentDate] = useState({
//     year: today.getFullYear(),
//     month: today.getMonth(),
//   });

//   // Array for days of the week
//   const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

//   // Function to get the number of days in a given month
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   // Function to handle month navigation (next/prev)
//   const changeMonth = (direction) => {
//     const newMonth = currentDate.month + direction;
//     const newYear =
//       newMonth === -1
//         ? currentDate.year - 1
//         : newMonth === 12
//         ? currentDate.year + 1
//         : currentDate.year;
//     setCurrentDate({
//       year: newYear,
//       month: (newMonth + 12) % 12,
//     });
//   };

//   // Function to get the first day of the month (0 = Sunday, 6 = Saturday)
//   const getStartDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const daysInMonth = getDaysInMonth(currentDate.month, currentDate.year);
//   const startDay = getStartDayOfMonth(currentDate.month, currentDate.year);

//   // Create an array for days to display (including padding for days from the previous month)
//   const datesArray = Array.from({ length: startDay + daysInMonth }, (_, i) => {
//     return i < startDay ? null : i - startDay + 1;
//   });
//   const handleMessageNavigation = () => {
//     navigate('/network-message')
//   }
//   const messagesData = [
//     { id: 1, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 2, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 3, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 4, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 5, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 6, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 7, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 8, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//     { id: 9, name: 'Anshul', message: 'How are you?', time: '5min', count: '04', img: mI },
//   ];
//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//     const mentors = [
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor },
//         { name: 'Ananya Sharma', title: 'Senior Software Engineer', imgSrc: topMentor }
//     ];
//     const events = [
//         { date: 14, event: "Vasant Panchami" },
//         { date: 16, event: "Ratha Saptami" },
//         { date: 14, event: "Vasant Panchami" },
//         { date: 16, event: "Ratha Saptami" },
//         { date: 14, event: "Vasant Panchami" },
//         { date: 16, event: "Ratha Saptami" },
//     ];
//     return (
//         <>
//     <Dashboard/>
//             <div className="dashannouncement-container">
//                 <h2 className="dashannouncement-tittle">Announcement</h2>
//                 <table className="dashannouncement-table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Date</th>
//                             <th>Dept</th>
//                             <th>Title</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {announcements.map((announcement, index) => (
//                             <tr key={index}>
//                                 <td>{announcement.id.toString().padStart(2, '0')}</td>
//                                 <td>{announcement.date}</td>
//                                 <td>{announcement.dept}</td>
//                                 <td>{announcement.title}</td>
//                                 <td className="dashannouncement-actions">
//                                     <svg width="14" height="14" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M18 7L11 0V4C4 5 1 10 0 15C2.5 11.5 6 9.9 11 9.9V14L18 7Z" fill="#7A7A7A" />
//                                     </svg>
//                                     <i className="fas fa-eye"></i>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {/* // =================================================================== */}

//             {/* =============================================================== */}
//             <div className="topmentor-container">
//                 <h2 className="topmentor-title">Top Mentors</h2>
//                 <div className="topmentor-list">
//                     {mentors.map((mentor, index) => (
//                         <div className="topmentor-item" key={index}>
//                             <img src={mentor.imgSrc} alt={mentor.name} className="topmentor-image" />
//                             <p className="topmentor-name">{mentor.name}</p>
//                             <p className="topmentor-role">{mentor.title}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* ============================================================================ */}
//             <div className="topArticle-container">
//                 <h2 className="topArticle-title">Top Articles and Blogs</h2>
//                 <div className="topArticle-card">
//                     <div className="topArticle-left">
//                         <img
//                             src={topArticle}
//                             alt="Article Thumbnail"
//                             className="topArticle-image"
//                         />
//                         <div className="topArticle-author-info">
//                             <img src={messageImage} alt="Author" className="topArticle-author-img" />
//                             <div className="topArticle-author-details">
//                                 <span className="topArticle-author-name">Anshul</span>
//                                 <span className="topArticle-post-date">Posted on: July 12, 2024</span>
//                             </div>
//                             <button className="topArticle-follow-btn">Follow</button>
//                         </div>
//                     </div>
//                     <div className="topArticle-right">
//                         <h3 className="topArticle-heading">
//                             The Power of Alumni Networks: <br />
//                             Fostering Connections and Opportunities
//                         </h3>
//                         <p className="topArticle-description">
//                             Alumni associations are vital links between alumni and their alma mater, offering mentorship, networking, and career support for personal and professional growth.
//                         </p>
//                         <div className="topArticle-actions">
//                             <button className="topArticle-share-btn">
//                                 <svg width="15" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M18 7.5L11 0.5V4.5C4 5.5 1 10.5 0 15.5C2.5 12 6 10.4 11 10.4V14.5L18 7.5Z" fill="#1B1B1E" />
//                                 </svg>
//                                 Share
//                             </button>
//                             <button className="topArticle-open-btn">
//                                 <svg width="16" height="15" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M4 2.5C3.46957 2.5 2.96086 2.71071 2.58579 3.08579C2.21071 3.46086 2 3.96957 2 4.5V12.5C2 13.0304 2.21071 13.5391 2.58579 13.9142C2.96086 14.2893 3.46957 14.5 4 14.5H12C12.5304 14.5 13.0391 14.2893 13.4142 13.9142C13.7893 13.5391 14 13.0304 14 12.5V10.5C14 10.2348 14.1054 9.98043 14.2929 9.79289C14.4804 9.60536 14.7348 9.5 15 9.5C15.2652 9.5 15.5196 9.60536 15.7071 9.79289C15.8946 9.98043 16 10.2348 16 10.5V12.5C16 13.5609 15.5786 14.5783 14.8284 15.3284C14.0783 16.0786 13.0609 16.5 12 16.5H4C2.93913 16.5 1.92172 16.0786 1.17157 15.3284C0.421427 14.5783 0 13.5609 0 12.5V4.5C0 3.43913 0.421427 2.42172 1.17157 1.67157C1.92172 0.921427 2.93913 0.5 4 0.5H6C6.26522 0.5 6.51957 0.605357 6.70711 0.792893C6.89464 0.98043 7 1.23478 7 1.5C7 1.76522 6.89464 2.01957 6.70711 2.20711C6.51957 2.39464 6.26522 2.5 6 2.5H4ZM10 2.5C9.73478 2.5 9.48043 2.39464 9.29289 2.20711C9.10536 2.01957 9 1.76522 9 1.5C9 1.23478 9.10536 0.98043 9.29289 0.792893C9.48043 0.605357 9.73478 0.5 10 0.5H15C15.2652 0.5 15.5196 0.605357 15.7071 0.792893C15.8946 0.98043 16 1.23478 16 1.5V6.5C16 6.76522 15.8946 7.01957 15.7071 7.20711C15.5196 7.39464 15.2652 7.5 15 7.5C14.7348 7.5 14.4804 7.39464 14.2929 7.20711C14.1054 7.01957 14 6.76522 14 6.5V3.914L10.708 7.208C10.615 7.30098 10.5046 7.37473 10.3832 7.42505C10.2617 7.47537 10.1315 7.50126 10 7.50126C9.86851 7.50126 9.73831 7.47537 9.61683 7.42505C9.49535 7.37473 9.38498 7.30098 9.292 7.208C9.19902 7.11502 9.12527 7.00465 9.07495 6.88317C9.02464 6.76169 8.99874 6.63149 8.99874 6.5C8.99874 6.36851 9.02464 6.23831 9.07495 6.11683C9.12527 5.99535 9.19902 5.88498 9.292 5.792L12.586 2.5H10Z" fill="white" />
//                                 </svg>
//                                 Open
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="topArticle-pagination">
//                     <span className="topArticle-dot1"></span>
//                     <span className="topArticle-dot"></span>
//                     <span className="topArticle-dot"></span>
//                     <span className="topArticle-dot"></span>
//                     <span className="topArticle-dot"></span>
//                 </div>
//             </div>
//              {/* Messages Section */}
//           <div className="dash-messages-wrapper">
//             <div className="dash-message-title">
//               <h4>Messages</h4>
//               <button className="dash-expand-btn" onClick={handleMessageNavigation}><svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <g clip-path="url(#clip0_2260_6689)">
//                   <path d="M23.2503 2.31987C23.0903 2.31987 22.9303 2.31987 22.7703 2.31987C21.6505 2.31987 20.534 2.32987 19.4141 2.3132C18.8508 2.3032 18.4875 1.91659 18.4875 1.40332C18.4875 0.880052 18.8442 0.5101 19.4174 0.506767C21.4738 0.496768 23.5302 0.496768 25.5833 0.506767C26.1466 0.5101 26.4899 0.856722 26.4932 1.41998C26.5065 3.47639 26.5065 5.53279 26.4932 7.58586C26.4932 8.15579 26.1132 8.51241 25.5933 8.50907C25.0834 8.50907 24.6968 8.13912 24.6901 7.57586C24.6734 6.456 24.6834 5.33948 24.6834 4.21962C24.6834 4.05964 24.6834 3.903 24.6834 3.63303C24.4734 3.82967 24.3435 3.94299 24.2201 4.06631C21.6971 6.58599 19.1741 9.109 16.6511 11.632C16.5445 11.7387 16.4411 11.852 16.3178 11.9386C15.9279 12.2186 15.4446 12.1719 15.1246 11.8353C14.8147 11.5087 14.7847 11.0454 15.058 10.6721C15.1546 10.5388 15.2813 10.4255 15.3979 10.3088C17.9076 7.79583 20.4206 5.28615 22.9336 2.77648C23.0503 2.65982 23.1969 2.57317 23.3303 2.46985C23.3036 2.41652 23.2769 2.36653 23.2503 2.3132V2.31987Z" fill="#373F51" />
//                   <path d="M2.49221 23.3503C2.58553 23.2137 2.66219 23.057 2.77551 22.9404C5.28186 20.424 7.79487 17.9143 10.3079 15.4047C10.4345 15.278 10.5645 15.1447 10.7112 15.038C11.0711 14.7847 11.5211 14.8214 11.8377 15.1114C12.1676 15.418 12.2343 15.8846 11.981 16.2646C11.881 16.4145 11.7477 16.5412 11.621 16.6678C9.11136 19.1808 6.59835 21.6905 4.08868 24.2035C3.96536 24.3268 3.84537 24.4568 3.66873 24.6435C3.89203 24.6568 4.03202 24.6735 4.17533 24.6735C5.26519 24.6735 6.35172 24.6735 7.44158 24.6735C8.10816 24.6768 8.51144 25.0201 8.52144 25.57C8.53144 26.1366 8.14482 26.4866 7.47157 26.4866C5.50516 26.4932 3.54208 26.4932 1.57566 26.4866C0.825761 26.4866 0.509135 26.1599 0.505802 25.4C0.499136 23.4503 0.502469 21.5005 0.505802 19.5508C0.505802 18.8676 0.835759 18.4809 1.39569 18.4743C1.96895 18.4676 2.3189 18.8775 2.32224 19.5708C2.32557 20.7906 2.32224 22.0105 2.32224 23.2303C2.37889 23.267 2.43555 23.3003 2.49221 23.337V23.3503Z" fill="#373F51" />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_2260_6689">
//                     <rect width="26" height="26" fill="white" transform="translate(0.5 0.5)" />
//                   </clipPath>
//                 </defs>
//               </svg>
//               </button>
//             </div>

//             {/* Messages List */}
//             <div className="dash-message-list">
//               {messagesData.map((msg) => (
//                 <div key={msg.id} className="dash-message-item">
//                   <img src={msg.img} alt="user" className="dash-user-image" />
//                   <div className="dash-message-details">
//                     <span className="dash-user-name">{msg.name}</span>
//                     <span className="dash-message-text">{msg.message}</span>
//                   </div>
//                   <div className="dash-message-meta">
//                     <span className="dash-time-stamp">{msg.time}</span>
//                     <span className="dash-unread-count">{msg.count}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </>
//     );
// };

// export default DashboardHome;










// import React, { useState } from 'react';
// import './DashboardHome.css';

// // Festival data grouped by month
// const festivalsByMonth = {
//   January: [
//     { day: 1, name: 'New Year\'s Day' },
//     { day: 14, name: 'Pongal' },
//   ],
//   February: [
//     { day: 14, name: 'Valentine\'s Day' },
//     { day: 16, name: 'Maha Shivaratri' },
//   ],
//   March: [
//     { day: 8, name: 'International Women\'s Day' },
//     { day: 14, name: 'Holi' },
//   ],
//   April: [
//     { day: 1, name: 'April Fools\' Day' },
//     { day: 14, name: 'Baisakhi' },
//   ],
//   May: [
//     { day: 1, name: 'Labour Day' },
//     { day: 14, name: 'Eid al-Fitr' },
//   ],
//   June: [
//     { day: 21, name: 'International Yoga Day' },
//     { day: 14, name: 'World Blood Donor Day' },
//   ],
//   July: [
//     { day: 4, name: 'Independence Day (USA)' },
//     { day: 14, name: 'Bastille Day (France)' },
//   ],
//   August: [
//     { day: 15, name: 'Independence Day (India)' },
//     { day: 31, name: 'Ganesh Chaturthi' },
//   ],
//   September: [
//     { day: 5, name: 'Teacher\'s Day' },
//     { day: 21, name: 'International Day of Peace' },
//   ],
//   October: [
//     { day: 2, name: 'Gandhi Jayanti' },
//     { day: 31, name: 'Halloween' },
//   ],
//   November: [
//     { day: 1, name: 'All Saints\' Day' },
//     { day: 14, name: 'Diwali' },
//   ],
//   December: [
//     { day: 25, name: 'Christmas' },
//     { day: 31, name: 'New Year\'s Eve' },
//   ],
// };

// const DashboardHome = () => {
//   const today = new Date();

//   // State to store the current date (year and month)
//   const [currentDate, setCurrentDate] = useState({
//     year: today.getFullYear(),
//     month: today.getMonth(),
//   });

//   // State to store festivals for the current month
//   const [currentFestivals, setCurrentFestivals] = useState([]);

//   // Array for days of the week
//   const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

//   // Function to get the number of days in a given month
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   // Function to handle month navigation (next/prev)
//   const changeMonth = (direction) => {
//     const newMonth = currentDate.month + direction;
//     const newYear =
//       newMonth === -1
//         ? currentDate.year - 1
//         : newMonth === 12
//         ? currentDate.year + 1
//         : currentDate.year;
//     setCurrentDate({
//       year: newYear,
//       month: (newMonth + 12) % 12,
//     });
//     setCurrentFestivals(getFestivalsForMonth(newMonth)); // Update festivals for the new month
//   };

//   // Function to get the first day of the month (0 = Sunday, 6 = Saturday)
//   const getStartDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay();
//   };

//   // Function to get festivals for the current month
//   const getFestivalsForMonth = (monthIndex) => {
//     const monthName = Object.keys(festivalsByMonth)[monthIndex];
//     return festivalsByMonth[monthName] || [];
//   };

//   const daysInMonth = getDaysInMonth(currentDate.month, currentDate.year);
//   const startDay = getStartDayOfMonth(currentDate.month, currentDate.year);

//   // Create an array for days to display (including padding for days from the previous month)
//   const datesArray = Array.from({ length: startDay + daysInMonth }, (_, i) => {
//     return i < startDay ? null : i - startDay + 1;
//   });

//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];

//   // Update festivals for the current month
//   React.useEffect(() => {
//     setCurrentFestivals(getFestivalsForMonth(currentDate.month));
//   }, [currentDate]);

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button className="calendar-nav" onClick={() => changeMonth(-1)}>
//           &#8249;
//         </button>
//         <span className="calendar-month">
//           {monthNames[currentDate.month]} {currentDate.year}
//         </span>
//         <button className="calendar-nav" onClick={() => changeMonth(1)}>
//           &#8250;
//         </button>
//       </div>
//       <div className="calendar-grid">
//         {daysOfWeek.map((day, index) => (
//           <div key={index} className="calendar-day-header">
//             {day}
//           </div>
//         ))}
//         {datesArray.map((date, index) => (
//           <div key={index} className="calendar-day">
//             {date ? (
//               <span
//                 className={`calendar-date ${
//                   date === today.getDate() &&
//                   currentDate.month === today.getMonth() &&
//                   currentDate.year === today.getFullYear()
//                     ? 'active'
//                     : ''
//                 }`}
//               >
//                 {date}
//               </span>
//             ) : (
//               ''
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Display festivals for the current month */}
//       <div className="festival-popup">
//         <h3>Festivals this month:</h3>
//         <ul>
//           {currentFestivals.length > 0 ? (
//             currentFestivals.map((festival, index) => (
//               <li key={index}>
//                 {festival.day}: {festival.name}
//               </li>
//             ))
//           ) : (
//             <li>No festivals this month.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;

import React, { useState } from 'react';
import './DashboardCalendar.css';

const DashboardHome= () => {
  const today = new Date();

  // State to store the current date (year and month)
  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // Array for days of the week
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Function to get the number of days in a given month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to handle month navigation (next/prev)
  const changeMonth = (direction) => {
    const newMonth = currentDate.month + direction;
    const newYear =
      newMonth === -1
        ? currentDate.year - 1
        : newMonth === 12
        ? currentDate.year + 1
        : currentDate.year;
    setCurrentDate({
      year: newYear,
      month: (newMonth + 12) % 12,
    });
  };

  // Function to get the first day of the month (0 = Sunday, 6 = Saturday)
  const getStartDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate.month, currentDate.year);
  const startDay = getStartDayOfMonth(currentDate.month, currentDate.year);

  // Create an array for days to display (including padding for days from the previous month)
  const datesArray = Array.from({ length: startDay + daysInMonth }, (_, i) => {
    return i < startDay ? null : i - startDay + 1;
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const events = [
    { date: '14', event: 'Vasant Panchami' },
    { date: '14', event: 'Vasant Panchami' },
    { date: '16', event: 'Ratha Saptami' },
    { date: '14', event: 'Vasant Panchami' },
    { date: '16', event: 'Ratha Saptami' },
    { date: '14', event: 'Vasant Panchami' },
    { date: '16', event: 'Ratha Saptami' },
  ];
  return (
    <>
    <div style={{display:'flex'  ,backgroundColor:'white', boxShadow:'0px 8px 12px rgba(0,0,0,0.1)',width:'700px',borderRadius:"10px",height:'168px',marginLeft:'50px',paddingLeft:"40px"}}>
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={() => changeMonth(-1)}>
          &#8249;
        </button>
        <span className="calendar-month">
          {monthNames[currentDate.month]} {currentDate.year}
        </span>
        <button className="calendar-nav" onClick={() => changeMonth(1)}>
          &#8250;
        </button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-header">
            {day}
          </div>
        ))}
        {datesArray.map((date, index) => (
          <div key={index} className="calendar-day">
            {date ? (
              <span
                className={`calendar-date ${
                  date === today.getDate() &&
                  currentDate.month === today.getMonth() &&
                  currentDate.year === today.getFullYear()
                    ? 'active'
                    : ''
                }`}
              >
                {date}
              </span>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
      <div className="dashcalendararticle-container">
      <h2 className="dashcalendararticle-heading">Calendar</h2>
      <div className="dashcalendararticle-events">
        {events.map((event, index) => (
          <div className="dashcalendararticle-event" key={index}>
            <div className="dashcalendararticle-date">{event.date}</div>
            <div className="dashcalendararticle-name">{event.event}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default DashboardHome;
