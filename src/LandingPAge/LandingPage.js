import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import bg from '../assets/companylogo1.png'
import lp from '../assets/Landing-page3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function LandingPage() {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate('/about'); // Redirect to '/about' page (adjust the path as needed)
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
            <h1>Empowering Alumni for a Brighter Future</h1>
            <h2>Welcome to Matrix Alumni Association</h2>
            <p className='text-justify'>
              At Matrix, we take pride in the achievements of our alumni, who continue to make a significant impact
              across various fields worldwide. Our Alumni Association serves as a vibrant community, reconnecting you
              with your alma mater and fellow alumni, while providing resources to support your ongoing success.
            </p>
            <div className='aboutus-btb-div mt-5'>
            <button 
        className="btn about-btn" 
        id="about" 
        onClick={handleAboutClick} // Add the click handler
      >
        About us
      </button>      </div>
          </div>
          <div className="col-lg-6 image-section">
            <img src={lp} alt="Graduating students" className="graduation-image img-fluid" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
