import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DonationDetails.css';
import dI from '../assets/DonationImage.jpeg';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [moreDonations, setMoreDonations] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    fetchDonationDetails();
    fetchMoreDonations();
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [id]);

  const fetchDonationDetails = async () => {
    try {
      const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
      const response = await axios.get(`${baseUrl}/api/v1/getdonationsbyid/${id}`);
      console.log("Donation details response:", response.data);

      // Handle response format - could be { data: {...} } or direct object
      const donationData = response.data?.data || response.data;
      setDonation(donationData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching donation details:", err);
      setError("Failed to load donation details.");
      setLoading(false);
    }
  };

  const fetchMoreDonations = async () => {
    try {
      const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
      const response = await axios.get(`${baseUrl}/api/v1/donations`);
      console.log("More donations response:", response.data);

      // Handle response format
      let donationsArray = [];
      if (Array.isArray(response.data?.data)) {
        donationsArray = response.data.data;
      } else if (Array.isArray(response.data)) {
        donationsArray = response.data;
      }

      // Exclude current one and limit to 10
      setMoreDonations(donationsArray.filter(d => d._id !== id && d.DonationId !== id).slice(0, 10));
    } catch (err) {
      console.error("Error fetching more donations:", err);
    }
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  // Header Component
  const DetailsHeader = () => (
    <div className="details-header">
      <div className="back-nav" onClick={handleBackClick}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="back-icon">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back</span>
      </div>
      <button className="edit-action-btn" onClick={() => navigate(`/edit-donation/${id}`)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edit-icon">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Edit Donation
      </button>
    </div>
  );

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!donation) return <div className="error-state">Donation not found</div>;

  return (
    <div className="donation-details-page">
      <DetailsHeader />

      <div className="details-content-grid">
        {/* Main Content Column */}
        <div className="main-content-column">
          <div className="meta-tags-row">
            <span className="campaign-tag">{donation.Categories || 'Education'}</span>
            <span className="campaign-tag secondary">{donation.PaymentMethods || 'Verified'}</span>
          </div>

          <div className="hero-image-container">
            <img src={dI} alt={donation.CampaignTitle} className="hero-image" />
          </div>

          <div className="interaction-bar">
            <div className="interaction-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>{Math.floor(Math.random() * 1000) + 100} views</span>
            </div>
            <div className="interaction-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>45 comments</span>
            </div>
            <div className="interaction-item share-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>Share</span>
            </div>
          </div>

          <div className="author-meta-row">
            <div className="author-info">
              <span className="by-text">By</span>
              <span className="author-name">{donation.userId || 'Anonymous User'}</span>
              <span className="dot-separator">•</span>
              <span className="post-date">July 20, 2024</span>
            </div>
          </div>

          <div className="article-body">
            <h1 className="article-title">{donation.CampaignTitle}</h1>
            <p className="article-description">{donation.CampaignDescription}</p>

            {/* Progress and Action Section */}
            <div className="campaign-funding-box">
              <div className="funding-progress">
                <div className="funding-stats">
                  <span className="amount-raised"><strong>₹{Math.floor(donation.GoalAmount * 0.75)}</strong> raised</span>
                  <span className="amount-goal">of ₹{donation.GoalAmount}</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: '75%' }}></div>
                </div>
                <span className="percent-text">75% Funded</span>
              </div>
              <button className="primary-donate-btn">Donate Now</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar-column">
          <h3 className="sidebar-heading">More Popular Campaigns</h3>
          <div className="sidebar-list">
            {moreDonations.map((item) => (
              <div key={item._id} className="sidebar-card" onClick={() => navigate(`/details-view/${item._id}`)}>
                <img src={dI} alt={item.CampaignTitle} className="sidebar-thumb" />
                <div className="sidebar-card-info">
                  <h4 className="sidebar-card-title">{item.CampaignTitle}</h4>
                  <div className="sidebar-card-meta">
                    <span className="sidebar-author">By {item.userId || 'User'}</span>
                    <span className="sidebar-date"> • 2d ago</span>
                  </div>
                  <div className="sidebar-tags">
                    <span className="mini-tag">{item.Categories || 'General'}</span>
                  </div>
                </div>
              </div>
            ))}
            {moreDonations.length === 0 && <p className="no-more-text">No other campaigns to show.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
