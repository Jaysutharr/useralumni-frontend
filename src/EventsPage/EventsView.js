import "./EventView.css";
// import fI from '../assets/eventsimage.jpg'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import fI from '../assets/eventsimage.jpg'; // Default image

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Kept for future use if needed

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
        const response = await axios.get(`${baseUrl}/api/v1/vieweventDetails`);
        const allEvents = Array.isArray(response.data) ? response.data : (response.data.data || []);
        setEvents(allEvents);

        if (id) {
          // Find event by ID (loose comparison for string/number match)
          const found = allEvents.find(e =>
            (e.eventId && String(e.eventId) === String(id)) ||
            (e._id && String(e._id) === String(id))
          );
          setSelectedEvent(found || allEvents[0]); // Fallback to first if not found (or handle 404)
        } else if (allEvents.length > 0) {
          setSelectedEvent(allEvents[0]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  if (loading) return <div className="p-5 text-center">Loading event details...</div>;

  if (!selectedEvent) return <div className="p-5 text-center">Event not found.</div>;

  // Filter out the selected event for the "Other events" list
  const otherEvents = events.filter(e =>
    (e.eventId && String(e.eventId) !== String(selectedEvent.eventId)) &&
    (e._id && String(e._id) !== String(selectedEvent._id))
  );

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="back-icon" style={{ cursor: 'pointer' }} onClick={handleBack}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E" />
            <path d="M9.26778 20L19.6353 30.365C19.87 30.5997 20.0019 30.918 20.0019 31.25C20.0019 31.5819 19.87 31.9003 19.6353 32.135C19.4006 32.3697 19.0822 32.5016 18.7503 32.5016C18.4183 32.5016 18.1 32.3697 17.8653 32.135L6.61528 20.885C6.49887 20.7689 6.40652 20.6309 6.3435 20.4791C6.28048 20.3272 6.24805 20.1644 6.24805 20C6.24805 19.8356 6.28048 19.6728 6.3435 19.5209C6.40652 19.369 6.49887 19.2311 6.61528 19.115L17.8653 7.86499C18.1 7.63028 18.4183 7.49841 18.7503 7.49841C19.0822 7.49841 19.4006 7.63028 19.6353 7.86499C19.87 8.09971 20.0019 8.41805 20.0019 8.74999C20.0019 9.08193 19.87 9.40028 19.6353 9.63499L9.26778 20Z" fill="#1B1B1E" />
          </svg>
        </div>



        <div className="event-card">
          <img
            src={selectedEvent.eventImage || fI}
            alt={selectedEvent.EventName || selectedEvent.title}
            className="event-image"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
          <div className="event-details">
            <h2>{selectedEvent.EventName || selectedEvent.title}</h2>
            <p className="event-host">Event by {selectedEvent.createdby || 'Host'}</p>
            <div className="event-time">
              <span role="img" aria-label="calendar">
                <svg width="22" height="23" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6673 19.0134C10.3918 19.0134 10.1518 18.9111 9.94732 18.7067C9.74287 18.5022 9.64065 18.2622 9.64065 17.9867C9.64065 17.7111 9.74287 17.4716 9.94732 17.268C10.1518 17.0645 10.3918 16.9622 10.6673 16.9614C10.9429 16.9605 11.1829 17.0627 11.3873 17.268C11.5918 17.4734 11.694 17.7134 11.694 17.988C11.694 18.2627 11.5918 18.5022 11.3873 18.7067C11.1829 18.9111 10.9429 19.0134 10.6673 19.0134ZM16.0007 19.0134C15.7251 19.0134 15.4851 18.9111 15.2807 18.7067C15.0762 18.5022 14.974 18.2622 14.974 17.9867C14.974 17.7111 15.0762 17.4716 15.2807 17.268C15.4851 17.0645 15.7251 16.9622 16.0007 16.9614C16.2762 16.9605 16.5162 17.0627 16.7207 17.268C16.9251 17.4734 17.0273 17.7134 17.0273 17.988C17.0273 18.2627 16.9251 18.5022 16.7207 18.7067C16.5162 18.9111 16.2762 19.0134 16.0007 19.0134ZM21.334 19.0134C21.0584 19.0134 20.8184 18.9111 20.614 18.7067C20.4095 18.5022 20.3073 18.2622 20.3073 17.9867C20.3073 17.7111 20.4095 17.4716 20.614 17.268C20.8184 17.0645 21.0584 16.9622 21.334 16.9614C21.6095 16.9605 21.8495 17.0627 22.054 17.268C22.2584 17.4734 22.3607 17.7134 22.3607 17.988C22.3607 18.2627 22.2584 18.5022 22.054 18.7067C21.8495 18.9111 21.6095 19.0134 21.334 19.0134ZM7.48865 28.5C6.87443 28.5 6.36198 28.2947 5.95132 27.884C5.54065 27.4734 5.33487 26.9609 5.33398 26.3467V9.32002C5.33398 8.70669 5.53976 8.19468 5.95132 7.78402C6.36287 7.37335 6.87532 7.16757 7.48865 7.16669H9.84732C9.84732 7.16669 8.80172 4.69833 9.84732 4.19335C10.3523 3.94947 10.7783 3.94947 11.2833 4.19335C12.3289 4.69833 11.2833 7.16669 11.2833 7.16669H20.822C20.822 7.16669 19.7625 4.66847 20.822 4.19335C21.2971 3.9803 21.6802 3.9803 22.1553 4.19335C23.2148 4.66847 22.1553 7.16669 22.1553 7.16669H24.514C25.1273 7.16669 25.6398 7.37246 26.0513 7.78402C26.4629 8.19557 26.6682 8.70802 26.6673 9.32135V26.3467C26.6673 26.96 26.462 27.4725 26.0513 27.884C25.6406 28.2956 25.1278 28.5009 24.5127 28.5H7.48865ZM7.48865 27.1667H24.514C24.7184 27.1667 24.9064 27.0814 25.078 26.9107C25.2495 26.74 25.3349 26.5516 25.334 26.3454V14.6547H6.66732V26.3467C6.66732 26.5511 6.75265 26.7391 6.92332 26.9107C7.09398 27.0822 7.28198 27.1676 7.48732 27.1667M6.66732 13.32H25.334V9.32002C25.334 9.11557 25.2486 8.92757 25.078 8.75602C24.9073 8.58446 24.7189 8.49913 24.5127 8.50002H7.48865C7.28332 8.50002 7.09487 8.58535 6.92332 8.75602C6.75176 8.92669 6.66643 9.11513 6.66643 9.32135V13.32Z" fill="#1B1B1E" />
                </svg>
              </span>
              {selectedEvent.DateTime ? new Date(selectedEvent.DateTime).toLocaleString() : 'Date TBA'}
            </div>
            <div className="event-type">
              <span role="img" aria-label="audio">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-broadcast" viewBox="0 0 16 16">
                  <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.707m2.122 2.122a1 1 0 0 0 0 1.414.5.5 0 1 1-.708.708 2 2 0 0 1 0-2.828.5.5 0 0 1 .708.707M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
                </svg>
              </span>
              {selectedEvent.EventType}
            </div>
            <p className="attendees">{selectedEvent.NoOfAttendees} attendees</p>
            <div className="action-buttons">
              <button className="attend-btn">Attend</button>
              <button className="share-btn">Share</button>
            </div>
            <div className="attend-abt">
              <span className='abt-word'>About</span>
              <p>{selectedEvent.description || 'No description available for this event.'}</p>
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="event-card-create">
            <p>Host an event and invite your network.</p>
            <button className="create-event-btn-create" onClick={() => navigate('/create-event')}>Create an event</button>
          </div>

          <div className="card ">
            <div className="card-header" style={{ backgroundColor: 'white' }}>
              <h5>Other events for you</h5>
              <a href="#see-all" className="see-all-link">See all</a>
            </div>
            <div className="card-body-event">
              {otherEvents.slice(0, 5).map(event => (
                <div key={event.eventId || event._id} className="event-item" onClick={() => navigate(`/eventview/${event.eventId || event._id}`)} style={{ cursor: 'pointer' }}>
                  <img src={event.eventImage || fI} alt="event" className="event-img" />
                  <div className="event-details">
                    <p className="event-date">{event.DateTime ? new Date(event.DateTime).toLocaleDateString() : ''}</p>
                    <h6 className="event-title" >{event.EventName}</h6>
                    <p className="event-type">{event.EventType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventView;
