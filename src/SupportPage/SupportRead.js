

import React, { useState, useEffect } from 'react';
import './SupportRead.css';
import SupportDash from './SupportDash';
import ticketSubmit from '../assets/TicketSubmit.png';
import cI from '../assets/ImageChatSupport.png'
import mI from '../assets/ImageEmail.png'
import cpI from '../assets/ImagecallUs.png'
import { FaArrowLeft } from 'react-icons/fa'; // Using FontAwesome for the left arrow
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:13417').replace(/\/$/, '');

const SupportRead = () => {
  const navigate = useNavigate();

  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [showTicketPopup, setShowTicketPopup] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Fetch FAQs from API
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/faqs`);


        // Strictly expect an array based on user's specification
        if (Array.isArray(response.data)) {
          setFaqs(response.data);
          console.log("FAQs fetched successfully:", response.data);
        } else {
          console.warn("Unexpected API response format, expected array:", response.data);
          // Fallback if wrapped in a data property
          setFaqs(response.data.data && Array.isArray(response.data.data) ? response.data.data : []);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleCreateFAQNavigation = () => {
    navigate('/create-faq');
  };

  return (
    <>
      <SupportDash />
      <div className="support-read-layout">

        {/* Left Side: FAQs */}
        <div className="support-faq-column">
          <div className="support-header-row">
            <FaArrowLeft onClick={goBack} className="back-arrow-icon" />
            <h1 className="support-main-title">Frequently Asked Questions (FAQs)</h1>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleCreateFAQNavigation}
              style={{
                backgroundColor: '#58a4b0',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              + Create New FAQ
            </button>
          </div>

          <div className="faq-category-section">
            <h2 className="faq-category-title">Frequently Asked Questions:</h2>

            {loading ? (
              <p>Loading FAQs...</p>
            ) : faqs.length > 0 ? (
              faqs.map((faq) => (
                <details className="faq-custom-dropdown" key={faq.id || faq._id}>
                  <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '20px' }}>
                    <span>{faq.question}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent details from toggling
                        e.stopPropagation();
                        navigate(`/edit-faq/${faq.id || faq._id}`, { state: faq });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#58a4b0',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginLeft: '10px'
                      }}
                    >
                      Edit ✎
                    </button>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))
            ) : (
              <p>No FAQs available at the moment.</p>
            )}

          </div>
        </div>

        {/* Right Side: Action Grid */}
        <div className="support-action-column">
          <h2 className="action-column-title">Select another category</h2>
          <div className="action-cards-grid">

            <div className="action-card">
              <div className="action-card-icon">
                <img src={ticketSubmit} alt="Submit a Ticket" />
              </div>
              <h3>Submit a Ticket</h3>
              <button className="action-card-btn" onClick={() => navigate('/create-ticket')}>Submit a ticket</button>
            </div>

            <div className="action-card">
              <div className="action-card-icon">
                <img src={cI} alt="Live chat support" />
              </div>
              <h3>Live chat support</h3>
              <button className="action-card-btn" onClick={() => setShowChatPopup(true)}>Start Live Chat</button>
            </div>

            <div className="action-card">
              <div className="action-card-icon">
                <img src={mI} alt="Email Support" />
              </div>
              <h3>Email Support</h3>
              <button className="action-card-btn" onClick={() => setShowEmailPopup(true)}>Send an Email</button>
            </div>

            <div className="action-card">
              <div className="action-card-icon">
                <img src={cpI} alt="Call Us" />
              </div>
              <h3>Call Us</h3>
              <button className="action-card-btn" onClick={() => setShowCallPopup(true)}>Call now</button>
            </div>

          </div>
        </div>

      </div>

      {/* Email Support Popup */}
      {showEmailPopup && (
        <div className="email-popup-overlay">
          <div className="email-popup-box">
            <button className="email-popup-close-btn" onClick={() => setShowEmailPopup(false)}>&times;</button>
            <h2 className="email-popup-title">Email Support</h2>
            <p className="email-popup-text">
              For detailed inquiries or technical issues, email us at:
            </p>
            <a href="mailto:support@alumniportal.com" className="email-popup-link">support@alumniportal.com</a>
            <button className="email-popup-action-btn">
              Send an email
            </button>
          </div>
        </div>
      )}

      {/* Call Support Popup */}
      {showCallPopup && (
        <div className="email-popup-overlay">
          <div className="email-popup-box">
            <button className="email-popup-close-btn" onClick={() => setShowCallPopup(false)}>&times;</button>
            <h2 className="email-popup-title">Call Support</h2>
            <p className="email-popup-text">
              Prefer to speak directly? You can reach our support team at:
              <br />
              <a href="tel:+91-XXXXXXXXXX" className="email-popup-link" style={{ margin: '10px 0' }}>+91-XXXXXXXXXX</a>
              <br />
              during working hours (10 am – 6 pm).
            </p>
            <button className="email-popup-action-btn" onClick={() => setShowCallPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Live Chat Support Popup */}
      {showChatPopup && (
        <div className="email-popup-overlay">
          <div className="chat-popup-box">
            <div className="chat-header">
              <h2>Support team</h2>
              <button className="chat-close-btn" onClick={() => setShowChatPopup(false)}>&times;</button>
            </div>

            <div className="chat-messages-area">
              <div className="chat-message user-message">
                Hello, How are you?
              </div>
              <div className="chat-message bot-message">
                Hello, I am fine!
              </div>
              <div className="chat-message user-message">
                Lorem ipsum dolor sit amet consectetur. Feugiat elit sit ut egestas cras morbi consequat sollicitudin. Dictum eget mattis potenti
              </div>
              <div className="chat-message bot-message">
                Lorem ipsum dolor sit amet consectetur. Feugiat elit sit ut egestas cras morbi consequat sollicitudin. Dictum eget mattis potenti
              </div>
            </div>

            <div className="chat-input-area">
              <input type="text" placeholder="Type a message" className="chat-input-field" />
              <button className="chat-send-btn">Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Ticket Popup */}
      {showTicketPopup && (
        <div className="email-popup-overlay">
          <div className="ticket-modal-box"> {/* Use the class from SupportHome.css if shared, or keep local if defined */}
            <h2 className="ticket-popup-title">Submit a Ticket</h2>
            <p className="ticket-popup-desc">
              If you're experiencing any issues or have a question that wasn't answered in the FAQs, please submit a support ticket below.
            </p>

            <div className="ticket-form-group">
              <label>Select your issue category</label>
              <select className="ticket-select">
                <option>Issue Category</option>
                <option>Login Issue</option>
                <option>Payment Issue</option>
                <option>Technical Bug</option>
              </select>
            </div>

            <div className="ticket-form-group">
              <label>Description</label>
              <textarea className="ticket-textarea" placeholder="Provide more details about the issue you're facing or the question you have."></textarea>
            </div>

            <div className="ticket-form-group">
              <label>Attachment <span style={{ color: '#888', fontWeight: '400' }}>(optional)</span></label>
              <div className="ticket-upload-area">
                <p>Upload any relevant screenshots or documents to help us better understand your issue.</p>
              </div>
            </div>

            <div className="ticket-form-group">
              <label>Preferred Contact Method</label>
              <div className="ticket-radio-group">
                <label className="radio-label">
                  <input type="radio" name="contact" value="email" /> Email
                </label>
                <label className="radio-label">
                  <input type="radio" name="contact" value="phone" /> Phone
                </label>
              </div>
            </div>

            <div className="ticket-actions-row">
              <button className="ticket-discard-btn" onClick={() => setShowTicketPopup(false)}>Discard</button>
              <button className="ticket-submit-btn">Submit Ticket</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SupportRead;
