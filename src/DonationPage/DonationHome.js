import React, { useEffect, useState } from "react";
import "./DonationHome.css"; // Import the external CSS file
import dI from '../assets/DonationImage.jpeg'
import mI from '../assets/messageImage.jpeg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import DonationDash from "./DonationDash";



const DonationHome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [messages, setMessages] = useState([]);




  const toggleImagePopup = () => {
    setShowImagePopup(!showImagePopup); // Toggle the image popup
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    // Set the body background color to white when this component mounts
    document.body.style.backgroundColor = "#f5f6fc";

    // Fetch Donations
    const fetchDonations = async () => {
      try {
        const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
        const response = await axios.get(`${baseUrl}/api/v1/donations`);

        console.log("Donation API Response:", response.data);

        // Handle response format: { data: [...] } or just array
        let donationData = [];
        if (response.data && Array.isArray(response.data.data)) {
          donationData = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
          donationData = response.data;
        }

        const fetchedCampaigns = donationData.map(item => ({
          _id: item.DonationId || item._id,
          image: dI,
          title: item.CampaignTitle || item.title || "Untitled Campaign",
          progress: item.progress || Math.floor(Math.random() * 100)
        }));
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();

    // Reset the body background color when this component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // or set to the default color you want for other pages
    };
  }, []);
  // Hardcoded messages as they are "Aid requests" potentially different from main donations or just a second list
  const initialMessages = [
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 75,
    },
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 50,
    },
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 60,
    },
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 80,
    },
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 45,
    },
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 90,
    },
    {
      name: "Anshul",
      description: "Help me to Recover from a Health Crisis",
      progress: 20,
    },
  ];
  // Ideally messages should also be fetched, but if they are the same schema, we can split them or just leave as is for now if not requested.
  // User asked to make content dynamic. I will focus on the main campaigns list first.

  const image = mI; // Replace this with the actual image URL

  return (
    <>
      <DonationDash />
      <div className="donation-home-main-wrapper">
        <div className="donation-header-section">
          <h3>Featured Donations</h3>
          <button
            onClick={() => navigate('/create-donation')}
            className="start-fundraiser-btn"
          >
            + Start Fundraiser
          </button>
        </div>

        <div className="donation-content-grid">
          {/* Left Column: Featured Donations */}
          <div className="donation-feed-section">
            <h2 className="section-heading">Empower Future Scholars</h2>

            {campaigns.length === 0 ? (
              <div className="empty-state">
                <p>No active campaigns found. Start one today!</p>
              </div>
            ) : (
              <div className="campaigns-grid">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="campaign-card">
                    <div className="card-image-wrapper">
                      <img src={campaign.image} alt={campaign.title} className="card-image" />
                      <div className="card-overlay">
                        <span className="category-tag">Education</span>
                      </div>
                    </div>

                    <div className="card-body">
                      <h3 className="card-title">{campaign.title}</h3>

                      <div className="progress-section">
                        <div className="progress-bar-bg">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                        <div className="progress-stats">
                          <span className="raised-text">₹{Math.floor(Math.random() * 50000) + 10000} raised</span>
                          <span className="percentage-text">{campaign.progress}%</span>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          className="action-btn view-btn"
                          onClick={() => navigate(`/details-view/${campaign._id}`)}
                        >
                          View
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => navigate(`/edit-donation/${campaign._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Emergency Aid */}
          <div className="aid-sidebar-section">
            <div className="aid-header">
              <div>
                <h5 className="aid-title">Emergency Requests</h5>
                <span className="aid-subtitle">Urgent Help Needed</span>
              </div>
            </div>

            <div className="aid-list">
              {initialMessages.map((campaign, index) => (
                <div className="aid-item-card" key={index}>
                  <img src={image} alt={campaign.name} className="aid-avatar" />
                  <div className="aid-content">
                    <h4 className="aid-name">{campaign.name}</h4>
                    <p className="aid-desc">{campaign.description}</p>
                    <div className="aid-mini-progress">
                      <div className="mini-progress-bar" style={{ width: `${campaign.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="aid-action-btn" onClick={togglePopup}>Donate</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="center-popup-overlay" onClick={togglePopup}>
          <div className="center-popup-box" onClick={(e) => e.stopPropagation()}>
            <div className="center-popup-content">
              <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="50" fill="#58A4B0" />
                <g clip-path="url(#clip0_2182_11600)">
                  <path d="M73.9804 44.1304C73.9804 46.004 73.9601 47.8742 73.9838 49.7478C74.0413 54.3602 72.7187 58.5707 70.3274 62.4644C67.6214 66.8725 64.009 70.4119 59.8723 73.4438C57.1494 75.44 54.2947 77.2046 51.2572 78.6762C50.4421 79.0714 49.6438 79.1225 48.8253 78.7205C43.3694 76.0361 38.3905 72.6637 34.1557 68.2556C31.0033 64.9751 28.4766 61.2755 27.0729 56.8811C26.4269 54.8542 26.0277 52.783 26.021 50.6505C26.0041 46.1675 25.9838 41.6879 26.021 37.2048C26.0446 34.3978 27.083 31.9451 28.8588 29.7956C30.3539 27.9867 32.248 26.8012 34.4567 26.062C39.2598 24.4609 44.0527 22.836 48.8456 21.211C49.5593 20.9692 50.2425 20.9079 50.9799 21.16C56.0197 22.8769 61.1035 24.4745 66.1027 26.3038C70.5912 27.9458 73.2329 31.3115 73.8349 36.0841C74.1089 38.2643 73.9465 40.499 73.977 42.7098C73.9838 43.1833 73.977 43.6568 73.977 44.1269L73.9804 44.1304ZM30.7225 44.0827C30.7225 45.9937 30.6752 47.9048 30.7394 49.8125C30.7834 51.0729 30.8917 52.3436 31.142 53.5767C32.0214 57.9405 34.3586 61.514 37.3589 64.6787C40.9341 68.4463 45.1114 71.3998 49.6844 73.7946C49.8468 73.8798 50.1241 73.8832 50.2899 73.8014C51.0103 73.4403 51.724 73.0554 52.4174 72.6432C57.0547 69.8805 61.2625 66.6 64.628 62.3111C67.7094 58.3834 69.3938 53.9821 69.2856 48.9097C69.2078 45.2443 69.2754 41.572 69.2687 37.9066C69.2653 34.4557 67.3238 31.6964 64.0834 30.5995C59.5374 29.0598 54.9847 27.5472 50.4285 26.0415C50.1681 25.9564 49.8299 25.953 49.5694 26.0415C45.0133 27.5472 40.4605 29.0632 35.9146 30.5995C32.6708 31.6964 30.7293 34.4523 30.7225 37.9032C30.7192 39.9641 30.7225 42.0251 30.7225 44.0861V44.0827Z" fill="#D8DBE2" />
                  <path d="M47.849 51.366C48.2752 50.8891 48.5627 50.5417 48.8807 50.218C51.8166 47.2373 54.7593 44.2668 57.6987 41.2894C58.4901 40.4889 59.3797 40.1142 60.4959 40.5468C61.8455 41.068 62.4239 42.727 61.6662 43.9704C61.5106 44.2259 61.3111 44.461 61.1014 44.6722C57.8407 47.9663 54.5699 51.2536 51.3059 54.5444C49.8988 55.9649 48.2482 56.5099 46.3371 55.8354C45.7553 55.631 45.1769 55.2597 44.7406 54.8203C42.8194 52.882 40.9354 50.8993 39.0649 48.9099C38.0671 47.8471 38.084 46.372 39.0446 45.4591C40.0762 44.478 41.5104 44.5734 42.5995 45.7078C44.1351 47.3156 45.6606 48.9304 47.1861 50.5451C47.3924 50.7631 47.5649 51.0084 47.8524 51.366H47.849Z" fill="#D8DBE2" />
                </g>
                <defs>
                  <clipPath id="clip0_2182_11600">
                    <rect width="48" height="58" fill="white" transform="translate(26 21)" />
                  </clipPath>
                </defs>
              </svg>

              <h2>Secure Donation</h2>
              <div className="donation-amounts-group">
                <button>₹ 100</button>
                <button>₹ 200</button>
                <button>₹ 500</button>
                <button>₹ 800</button>
                <button>₹ 1,000</button>
                <button>₹ 2,000</button>
                <button>₹ 5,000</button>
                <button>₹ 10,000</button>
                <button>₹ 1,00,000</button>
              </div>
              <input type="text" placeholder="type your custom amount..." className='donation-input' />
              <textarea placeholder="Description (optional)" />
              <button className="center-donate-btn" onClick={toggleImagePopup}>Donate</button>
            </div>
          </div>
        </div>
      )}


      {showImagePopup && (
        <div className="image-popup-overlay" onClick={toggleImagePopup}>
          <div className="image-popup-box" onClick={(e) => e.stopPropagation()}>
            <h2 >Payment Gateway</h2>

          </div>
        </div>
      )}
    </>
  );
};

export default DonationHome;
