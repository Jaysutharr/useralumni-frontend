import React, { useState } from 'react';
import './SupportHome.css';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import axios from 'axios';
import faqImage from '../assets/FaqImage.png'
import ticketSubmit from '../assets/TicketSubmit.png';
import cI from '../assets/ImageChatSupport.png'
import mI from '../assets/ImageEmail.png'
import cpI from '../assets/ImagecallUs.png'
import Dashboard from '../Dashboard/Dashboard';
import SupportDash from './SupportDash';

const SupportHome = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Email');
  const [isOpen, setIsOpen] = useState(false);
  const [ticketDescription, setTicketDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReadNavigation = () => {
    navigate('/support-readnow');
  };

  const handleChatNavigation = () => {
    navigate('/support-chatlive')
  }
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [showPopup, setShowPopup] = useState(false);


  const handleSubmit = async () => {
    // Validation: Check if description is empty
    if (!ticketDescription.trim()) {
      alert('Please provide a description for your ticket.');
      return;
    }

    setLoading(true);

    try {
      // Ensure no trailing slash usage from env var
      const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
      const apiUrl = `${baseUrl}/api/v1/support-tickets`;

      console.log('Sending support ticket to:', apiUrl);

      // Send POST request with raw string body
      const response = await axios.post(
        apiUrl,
        ticketDescription.trim(),
        {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        }
      );

      // Success handling
      if (response.status === 200 || response.status === 201) {
        setShowPopup(true);
        setTicketDescription(''); // Clear the input field
        console.log('Ticket created successfully:', response.data);
      }
    } catch (error) {
      console.error('Error creating support ticket:', error);

      // Error handling
      let errorMessage = 'Failed to submit ticket. Please try again.';

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const errorData = error.response.data;

        console.error('Server error details:', { status, data: errorData });

        if (status === 400) {
          // Handle case where errorData might be a string or object
          const msg = typeof errorData === 'string' ? errorData : (errorData.message || 'Invalid input.');
          errorMessage = `Bad Request (400): ${msg}`;
        } else if (status === 401 || status === 403) {
          errorMessage = 'Unauthorized (401/403): You do not have permission to perform this action.';
        } else if (status === 404) {
          errorMessage = 'Not Found (404): The support ticket API endpoint could not be found.';
        } else if (status === 500) {
          errorMessage = 'Server Error (500): The server encountered an internal error. Please contact the administrator.';
        } else {
          errorMessage = `Error (${status}): ${errorData.message || 'An error occurred'}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred.';
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [showTrackPopup, setShowTrackPopup] = useState(false);

  const handleTrackRequest = () => {
    setShowTrackPopup(true);
  };

  const handleTrackClose = () => {
    setShowTrackPopup(false);
  };
  const [isFirstPopupOpen, setFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setSecondPopupOpen] = useState(false);

  const handleSendEmailClick = () => {
    setSecondPopupOpen(true); // Open second popup inside the first one
  };
  const [isCallSupportPopupOpen, setCallSupportPopupOpen] = useState(false);

  const handleCallSupportPopupClose = () => {
    setCallSupportPopupOpen(false);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample ticket data
  const [tickets] = useState([
    { id: 1, number: '#20240915-001', issue: 'Unable to register for an event', status: 'In Progress', date: 'September 15, 2024' },
    { id: 2, number: '#20240915-002', issue: 'Cannot login', status: 'Open', date: 'September 14, 2024' },
    { id: 3, number: '#20240915-003', issue: 'Payment issue', status: 'Closed', date: 'September 13, 2024' },
    // Add more tickets as needed
  ]);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <SupportDash />

      <div className="support-home-container ">
        <h1 className="support-home-title mt-5">Need Help? We're Here for You</h1>
        <p className="support-home-description">
          At our Alumni Association, we’re dedicated to ensuring that you have a smooth experience.
          If you have any questions, issues, or feedback, we’re always available to assist.
          Choose an option below to get in touch with us or find the answers you’re looking for.
        </p>
        <h2 className="support-home-subtitle">Support Options:</h2>
        <div className="support-home-grid">
          <div className="support-home-row centered">
            <div className="support-home-option">
              <div className="support-home-icon">
                <img src={faqImage} alt="FAQs" className="icon-support" />
              </div>
              <h3>FAQs</h3>
              <button className="support-home-button" onClick={handleReadNavigation}>Read now</button>
            </div>

            <div className="support-home-option">
              <div className="support-home-icon">
                <img src={ticketSubmit} alt="Submit a Ticket" className="icon-support" />
              </div>
              <h3>Submit a Ticket</h3>
              <button className="support-home-button" onClick={openModal}>Submit a ticket</button>
            </div>

            <div className="support-home-option">
              <div className="support-home-icon">
                <img src={cI} alt="Live chat support" className="icon-support" />
              </div>
              <h3>Live chat support</h3>
              <button className="support-home-button" onClick={handleChatNavigation}>Start Live Chat</button>
            </div>
          </div>

          <div className="support-home-row centered">
            <div className="support-home-option">
              <div className="support-home-icon">
                <img src={mI} alt="Email Support" className="icon-support" />
              </div>
              <h3>Email Support</h3>
              <button className="support-home-button" onClick={() => setFirstPopupOpen(true)}>Send an Email</button>
              {/* First Popup */}
              {isFirstPopupOpen && (
                <div className="sendemail-popup-box">
                  <div className="sendemail-popup-content">
                    <h2>Email Support</h2>
                    <p>For detailed inquiries or technical issues, email us at:</p>
                    <a href="mailto:support@alumniportal.com">support@alumniportal.com</a>
                    <button className="sendemail-button" onClick={handleSendEmailClick}>
                      Send an email
                    </button>
                    <span className="sendemail-close-popup" onClick={() => setFirstPopupOpen(false)}>X</span>
                  </div>

                  {/* Second Popup inside the first one */}
                  {isSecondPopupOpen && (
                    <div className="sendemail-popup-box sendemail-second-popup">
                      <div className="sendemail-popup-content">
                        <h2>Gmail Content</h2>
                        <p>Here you can integrate Gmail or any content you want.</p>
                        <span className="sendemail-close-popup" onClick={() => setSecondPopupOpen(false)}>X</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="support-home-option">
              <div className="support-home-icon">
                <img src={cpI} alt="Call Us" className="icon-support" />
              </div>
              <h3>Call Us</h3>
              <button className="support-home-button" onClick={() => setCallSupportPopupOpen(true)}>Call now</button>
              {isCallSupportPopupOpen && (
                <div className="callsupport-popup-overlay">
                  <div className="callsupport-popup-box">
                    <div className="callsupport-popup-content">
                      <h2>Call Support</h2>
                      <p>
                        Prefer to speak directly? You can reach our support team at:
                        <br />
                        <a href="tel:+91-XXXXXXXXXX">+91-XXXXXXXXXX</a>
                        <br />
                        during working hours (10 am – 6 pm).
                      </p>
                      <button className="callsupport-button" onClick={handleCallSupportPopupClose}>
                        Close
                      </button>
                      <span className="callsupport-close-icon" onClick={handleCallSupportPopupClose}>X</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ======================================================================= */}
      {isOpen && (
        <div className="ticket-modal-overlay">
          <div className="ticket-modal-box">
            <h2 className="ticket-title" style={{ color: 'black' }}>Submit a Ticket</h2>
            <p className="ticket-description">
              If you're experiencing any issues or have a question that wasn't answered in the FAQs, please submit a support ticket below.
            </p>

            <div className="ticket-form-group">
              <label className="ticket-label">Select your issue category</label>
              <select className="ticket-input1">
                <option>Issue Category</option>
              </select>
            </div>

            <div className="ticket-form-group">
              <label className="ticket-label">Description</label>
              <textarea
                className="ticket-input ticket-textarea"
                placeholder="Provide more details about the issue you're facing or the question you have."
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
              >
              </textarea>
            </div>

            <div className="ticket-form-group">
              <label className="ticket-label">Attachment <span className="ticket-optional">(optional)</span></label>
              <div className="ticket-attachment-box">
                <div className="ticket-upload-icon"></div>
                <p className="ticket-attachment-description">
                  Upload any relevant screenshots or documents to help us better understand your issue.
                </p>
              </div>
            </div>

            <div className="contact-method">
              <label className="contact-label">Preferred Contact Method</label>
              <div className="contact-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="email"
                    checked={selectedOption === 'email'}
                    onChange={handleOptionChange}
                  />
                  Email
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    value="phone"
                    checked={selectedOption === 'phone'}
                    onChange={handleOptionChange}
                  />
                  Phone
                </label>
              </div>
            </div>
            <div className="ticket-actions">
              <button className="ticket-discard-btn" onClick={closeModal}>Discard</button>
              <button className="ticket-submit-btn" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Ticket'}</button>
              {showPopup && (
                <div className="thank-popup-overlay">
                  <div className="thank-popup-box">
                    <div className="thank-popup-header">
                      <h2>Thank you!</h2>
                      <button className="thank-close-btn" onClick={handleClose}>&times;</button>
                    </div>
                    <p>
                      Thank you for submitting your ticket. Our support team will review your request and
                      respond to you within 24–48 hours. You can track your ticket status in the
                      ‘Your Support Tickets’ section.
                    </p>
                    <div className="thank-popup-actions">
                      <button className="thank-track-request-btn" onClick={handleTrackRequest}>Track your request</button>
                      <button className="thank-close-popup-btn" onClick={handleClose}>Close</button>
                      {showTrackPopup && (
                        <div className="track-popup-overlay">
                          <div className="track-popup-box track-ticket-box">
                            <div className="track-popup-header">
                              <h2>Track your ticket</h2>
                              <button className="track-close-btn" onClick={handleTrackClose}>&times;</button>
                            </div>
                            <div className="table-responsive">
                              <table className="track-ticket-table">
                                <thead>
                                  <tr>
                                    <th>Ticket number</th>
                                    <th>Issue</th>
                                    <th>Status</th>
                                    <th>
                                      Date submitted <span className="track-dropdown-arrow">&#9660;</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                      <td>{ticket.number}</td>
                                      <td>{ticket.issue}</td>
                                      <td>{ticket.status}</td>
                                      <td>{ticket.date}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportHome;
