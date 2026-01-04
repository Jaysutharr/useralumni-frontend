import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import bg from '../assets/companylogo1.png'
// import lp from '../assets/Landing-page3.png'
import as from '../assets/aboutus.jpeg'
import { FaArrowLeft } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function AboutUs() {
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleSigninClick = () => {
    navigate('/signin');
  };

  return (
    <div className="app-container">
      <header className="header container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <img height="70px" width="90px" src={bg} alt="Company Logo" />
            <span className="fs-3">University</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end gap-2">
          <div className="search-container1">
              <input type="text" placeholder="Search anything..." className="search-bar1 " />
              <span className="search-icon1">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>          
              <button className="btn sign-in-btn" onClick={handleSigninClick}>Sign in</button>
            <button className="btn sign-up-btn" onClick={handleSignupClick}>Sign up</button>
          </div>
        </div>
      </header>
      <main className="main-content container">
        <div className="row">
          <div className="col-lg-6 text-section">
          <div  style={{ cursor: 'pointer', color:'white',marginLeft:'95px' }}><svg onClick={goBackPage} width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="white" />
        <path d="M9.26778 20L19.6353 30.365C19.87 30.5997 20.0019 30.918 20.0019 31.25C20.0019 31.5819 19.87 31.9003 19.6353 32.135C19.4006 32.3697 19.0822 32.5016 18.7503 32.5016C18.4183 32.5016 18.1 32.3697 17.8653 32.135L6.61528 20.885C6.49887 20.7689 6.40652 20.6309 6.3435 20.4791C6.28048 20.3272 6.24805 20.1644 6.24805 20C6.24805 19.8356 6.28048 19.6728 6.3435 19.5209C6.40652 19.369 6.49887 19.2311 6.61528 19.115L17.8653 7.86499C18.1 7.63028 18.4183 7.49841 18.7503 7.49841C19.0822 7.49841 19.4006 7.63028 19.6353 7.86499C19.87 8.09971 20.0019 8.41805 20.0019 8.74999C20.0019 9.08193 19.87 9.40028 19.6353 9.63499L9.26778 20Z" fill="white" />
      </svg>
      </div> 

            <h2 style={{color:'white',fontWeight:'100px', marginLeft:'100px'}}>About Us</h2>
            <p style={{fontSize:'16px', textAlign:'justify', marginLeft:"100px"}}>
            Founded in 2023, the Alumni Association has been a cornerstone in bridging the gap between past and present students. Over the years, we have grown into a vibrant network of professionals and innovators across various industries, dedicated to supporting each other and the next generation.
            </p>
           <h5 style={{color:"#58A4B0", marginLeft:"100px"}}>OUR MISSION</h5>
           <p style={{fontSize:'16px', textAlign:'justify', marginLeft:"100px"}}>We aim to foster a strong connection between alumni and students, creating opportunities for networking, career growth, mentorship, and lifelong friendships that enhance personal and professional development.</p>
          </div>
          <div className="col-lg-6 image-section">
            <img src={as} alt="Graduating students"style={{borderRadius:'12px', marginLeft:'40px', height:'470px'}} className="graduation-image img-fluid" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
