import React, { useState } from 'react';
import './NetworkingData.css'; // Updated CSS file name
import bI from '../assets/NetworkBackgrounf.jpeg'
import pnI from '../assets/ProfileData.jpeg'
import bookIcon from '../assets/BookIcon.jpeg'
import cL from '../assets/companynamelogo.jpeg'
import Dashboard from '../Dashboard/Dashboard';
import NetworkingDash from './NetworkingDash';

const NetworkingData = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleBack = () => {
        window.history.back(); // Navigate back to the previous page
    };
    const profiles = Array.from({ length: 15 }, (_, index) => ({
        name: "Sudhir Sahu",
        title: index % 2 === 0 ? "Front-end Developer" : "Java Desktop | Web API (C#)",
        id: index + 1
    }));
    return (
        <>
            <NetworkingDash />
            <div className='flex-container1'>
                <div className="back-icon-network" onClick={handleBack} style={{ cursor: 'pointer' }}><svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E" />
                    <path d="M9.26778 20L19.6353 30.365C19.87 30.5997 20.0019 30.918 20.0019 31.25C20.0019 31.5819 19.87 31.9003 19.6353 32.135C19.4006 32.3697 19.0822 32.5016 18.7503 32.5016C18.4183 32.5016 18.1 32.3697 17.8653 32.135L6.61528 20.885C6.49887 20.7689 6.40652 20.6309 6.3435 20.4791C6.28048 20.3272 6.24805 20.1644 6.24805 20C6.24805 19.8356 6.28048 19.6728 6.3435 19.5209C6.40652 19.369 6.49887 19.2311 6.61528 19.115L17.8653 7.86499C18.1 7.63028 18.4183 7.49841 18.7503 7.49841C19.0822 7.49841 19.4006 7.63028 19.6353 7.86499C19.87 8.09971 20.0019 8.41805 20.0019 8.74999C20.0019 9.08193 19.87 9.40028 19.6353 9.63499L9.26778 20Z" fill="#1B1B1E" />
                </svg>
                </div>
                <div className='networking-data-all'>
                    <div className='networking-main-data-container'>
                        <div className="banner-profile-wrapper">
                            <img className="banner-profile-img" src={bI} alt="Profile" />
                            <img className="banner-profile-image" src={pnI} alt="" />
                        </div>

                        <div className="networkingData-profile-container">
                            <div className="networkingData-profile-info">
                                <h1 className="networkingData-profile-name">Sudhir Sahu</h1>
                                <p className="networkingData-profile-role">Front-end Developer</p>
                                <p className="networkingData-profile-location">Wankaner, Gujarat, India • <a href="/" className="networkingData-contact-info">Contact info</a></p>
                                <p className="networkingData-connections">500+ connections</p>
                                <div className="networkingData-button-section">
                                    <button className="networkingData-message-btn"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.833984 6.29026C0.833984 4.78737 1.43101 3.34603 2.49371 2.28332C3.55642 1.22062 4.99776 0.623596 6.50065 0.623596C8.00354 0.623596 9.44488 1.22062 10.5076 2.28332C11.5703 3.34603 12.1673 4.78737 12.1673 6.29026V9.89568C12.1673 10.4963 12.1673 10.7953 12.0781 11.0354C12.0071 11.2257 11.8961 11.3985 11.7525 11.5421C11.6089 11.6857 11.4361 11.7967 11.2458 11.8677C11.0057 11.9569 10.706 11.9569 10.1061 11.9569H6.50065C4.99776 11.9569 3.55642 11.3599 2.49371 10.2972C1.43101 9.2345 0.833984 7.79316 0.833984 6.29026Z" stroke="#373F51" />
                                        <path d="M4.375 5.58191H8.625M6.5 8.41524H8.625" stroke="#373F51" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                        Message</button>
                                    <div className="networkingData-dropdown">
                                        <button className="networkingData-more-btn" onClick={toggleDropdown}>More</button>
                                        {isDropdownOpen && (
                                            <ul className="networkingData-dropdown-menu">
                                                <li className="networkingData-dropdown-item">Option 1</li>
                                                <li className="networkingData-dropdown-item">Option 2</li>
                                                <li className="networkingData-dropdown-item">Option 3</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* =================================================================== */}
                    <div className="exact-highlights-container">
                        {/* Highlights Section */}
                        <div className="exact-highlights-section">
                            <h3 className="exact-title">Highlights</h3>
                            <div style={{ display: 'flex' }}>
                                <img src={bookIcon} arc="" className='book-icon' />
                                <div className="exact-highlight-item">
                                    <p className="exact-highlight-text">You both studied at Vivekanand School, Durg</p>
                                    <button className="exact-share-btn"><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.1958 6.78044L18.6256 6.49034L18.1958 6.20025L11.9736 2.00025L11.4278 1.63182V2.29034V4.37483C8.42892 4.70904 6.23896 5.60682 4.67511 6.81322C3.05537 8.06273 2.12755 9.62786 1.66442 11.1909L1.29483 12.4383L2.24039 11.5447C4.31545 9.5838 7.22045 8.63192 11.4278 8.58239V10.6903V11.3489L11.9736 10.9804L18.1958 6.78044Z" stroke="#1B1B1E" stroke-width="0.7" />
                                    </svg>
                                        Share to your feed</button>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="exact-about-section">
                            <h3 className="exact-title">About</h3>
                            <p className="exact-about-text">
                                Creative Front-End Developer skilled in crafting responsive, user-friendly web interfaces. Expertise in HTML, CSS, JavaScript, and modern frameworks like React. Passionate about turning ideas into visually appealing, seamless digital experiences. Dedicated to delivering clean, efficient code and enhancing user engagement.
                            </p>
                        </div>
                    </div>
                    {/* ====================================================================== */}
                    <div className="profile-container-custom">
                        {/* Activity Section */}
                        <div className="activity-section-custom">
                            <h3>Activity</h3>
                            <p>825 followers</p>
                            <div className="activity-btn-group-custom">
                                <button className="activity-btn-custom">Posts</button>
                                <button className="activity-btn-custom">Comments</button>
                            </div>
                            <div className="activity-content-custom">
                                <p>
                                    🎉 Excited to share that I've completed the Foundation of UX Research Certificate by Google! 🎉
                                    This course has given me a solid foundation in understanding user behavior, conducting effective research,
                                    and translating insights into actionable <h7>...show more</h7>
                                </p>

                            </div>
                            <button className="show-posts-btn-custom">Show all posts →</button>
                        </div>
                        {/* ================================================================= */}
                        {/* Experience Section */}
                        <div className="experience-section-custom">
                            <h3>Experience</h3>
                            <div className="experience-item-custom">
                                <div className="experience-logo-custom"><img src={cL} alt="" className='logo-custom' /></div>
                                <div className="experience-details-custom">
                                    <h4>Front-end Developer</h4>
                                    <h5>Jain Computers Ltd.</h5>
                                    <h6>July 2024 - Present · 3 months</h6>
                                    <h6>Raipur, Chhattisgarh, India · Remote</h6>
                                    <p className="experience-description-custom">
                                        As a Front-end Developer at Jain Computers Ltd., my role involves building and maintaining the user
                                        interface of websites, ensuring they are visually appealing and functional across different devices.
                                        I conduct thorough code reviews to optimize performance and accessibility. I create responsive layouts
                                        using HTML, CSS, and JavaScript, and I integrate them with back-end services. Additionally, I work on
                                        developing interactive features and implementing design specifications to ensure a seamless user experience.
                                        <br /> read more...</p>

                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="education-section-custom">
                            <h3>Education</h3>
                            <div className="education-item-custom">
                                <div className="education-logo-custom"><img src={cL} alt="" className='logo-custom' /></div>
                                <div className="education-details-custom">
                                    <h4>Kalinga University</h4>
                                    <h5>B.Tech (computer science)</h5>
                                    <h6>2021 - 2025</h6>
                                    <h6>Raipur, Chhattisgarh, India · Remote</h6>
                                    <p>Activities and societies: volleyball</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ========================================== */}
                <div className="custom-profile-list-wrapper">
                    <div className="custom-profile-list-header">
                        <h3>More profiles for you</h3>
                        <a href="#" className="custom-profile-list-seeall">See all</a>
                    </div>
                    <ul className="custom-profile-list">
                        {profiles.map((profile, index) => (
                            <li key={profile.id} className="custom-profile-list-item">
                                <div className="custom-profile-info">
                                    <img
                                        src={pnI}
                                        alt="Profile"
                                        className="custom-profile-image"
                                    />
                                    <div className="custom-profile-details">
                                        <h4 className="custom-profile-name">{profile.name}</h4>
                                        <p className="custom-profile-title">{profile.title}</p>
                                    </div>
                                </div>
                                <button className="custom-message-btn">Message</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>

    );
};

export default NetworkingData;
