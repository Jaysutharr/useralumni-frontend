import React, { useState, useEffect } from 'react';
import './EventsHome.css';
import Dashboard from '../Dashboard/Dashboard';
import fI from '../assets/eventsimage.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import EventsDash from './EventsDash';
import axios from 'axios';


const EventsHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateEventNavigation = () => {
    navigate('/create-event');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const navigate = useNavigate();
  // ========================================
  const [formData, setFormData] = useState({
    coverImage: null,
    eventType: "Online",
    eventFormat: "",
    eventName: "",
    startDate: "",
    endDate: "",
    description: "",
    speakers: ""
  });

  // const [isModalOpen, setIsModalOpen] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0]
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("coverImage", formData.coverImage);
    formDataToSend.append("eventType", formData.eventType);
    formDataToSend.append("eventFormat", formData.eventFormat);
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("speakers", formData.speakers);

    try {
      const response = await fetch(process.env.REACT_APP_LOCALURL + '/api/vone/CreateeventDetails', {
        method: "POST",
        body: formDataToSend // Send the form data
      });

      if (response.ok) {
        // If the API request is successful
        const data = await response.json();
        alert("Event created successfully!");
        closeModal();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create event.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem submitting the form.");
    }
  };

  // ===============================================
  const handleView = () => {
    navigate('/eventview'); // Navigate to the next page
  };
  // const discussions = [
  //   {
  //     id: 1,
  //     date: "Sat, Oct 26, 2024, 8:30 PM",
  //     type: "Live Audio",
  //     title: "In this The DAVID & GOLIATH framework for growing a Service-based business.",
  //     speaker: "Obi Umenze (Cobe)",
  //     attendees: "1,100 attendees",
  //     image: "/images/chess.png" // Correct path to your image
  //   },
  //   {
  //     id: 2,
  //     date: "Sat, Oct 26, 2024, 8:30 PM",
  //     type: "Live Audio",
  //     title: "In this The DAVID & GOLIATH framework for growing a Service-based business.",
  //     speaker: "Obi Umenze (Cobe)",
  //     attendees: "1,100 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 3,
  //     date: "Sat, Oct 26, 2024, 8:30 PM",
  //     type: "Live Audio",
  //     title: "In this The DAVID & GOLIATH framework for growing a Service-based business.",
  //     speaker: "Obi Umenze (Cobe)",
  //     attendees: "1,100 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 4,
  //     date: "Sun, Oct 27, 2024, 10:00 AM",
  //     type: "Live Video",
  //     title: "How to Use Data Analytics to Enhance Your Business",
  //     speaker: "Jane Doe",
  //     attendees: "1,500 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 5,
  //     date: "Mon, Oct 28, 2024, 3:00 PM",
  //     type: "Webinar",
  //     title: "Developing Leadership Skills in the Workplace",
  //     speaker: "John Smith",
  //     attendees: "2,000 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 6,
  //     date: "Sun, Oct 27, 2024, 10:00 AM",
  //     type: "Live Video",
  //     title: "How to Use Data Analytics to Enhance Your Business",
  //     speaker: "Jane Doe",
  //     attendees: "1,500 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 7,
  //     date: "Mon, Oct 28, 2024, 3:00 PM",
  //     type: "Webinar",
  //     title: "Developing Leadership Skills in the Workplace",
  //     speaker: "John Smith",
  //     attendees: "2,000 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 8,
  //     date: "Sun, Oct 27, 2024, 10:00 AM",
  //     type: "Live Video",
  //     title: "How to Use Data Analytics to Enhance Your Business",
  //     speaker: "Jane Doe",
  //     attendees: "1,500 attendees",
  //     image: "/images/chess.png"
  //   },
  //   {
  //     id: 9,
  //     date: "Mon, Oct 28, 2024, 3:00 PM",
  //     type: "Webinar",
  //     title: "Developing Leadership Skills in the Workplace",
  //     speaker: "John Smith",
  //     attendees: "2,000 attendees",
  //     image: "/images/chess.png"
  //   },
  // ];

  // ==============================================================
  const [discussions, setDiscussions] = useState([]); // Holds discussion data
  const [showAll, setShowAll] = useState(false); // Toggles between showing all or limited items

  // Fetch discussions from the API
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
        const response = await axios.get(`${baseUrl}/api/v1/vieweventDetails`);
        // console.log('Fetched Data:', response.data);

        // API response format is an array of objects
        const eventData = Array.isArray(response.data) ? response.data : (response.data.data || []);

        if (Array.isArray(eventData)) {
          const transformedData = eventData.map((event, index) => ({
            id: event.eventId || (event._id ? event._id : index), // specific eventId or fallback
            title: event.EventName || event.title || 'Untitled Event',
            date: event.DateTime ? new Date(event.DateTime).toLocaleDateString() : 'Date TBA',
            type: event.EventType || 'General',
            attendees: event.NoOfAttendees ? `${event.NoOfAttendees} attendees` : '',
            image: event.eventImage || fI,
            speaker: event.createdby || 'Host', // corrected typo 'craetedby'
            status: event.Status
          }));
          setDiscussions(transformedData);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching discussions:', error.message);
      }
    };

    fetchDiscussions();
  }, []);

  // Determine the discussions to display
  const discussionsToShow = showAll ? discussions : discussions.slice(0, 3);
  const toggleShowMore = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };


  return (
    <>
      <EventsDash />
      {/* Button to Open the Modal */}
      <div className="container main-container-eventall ">
        <div className="row justify-content-center">
          {/* Use responsive column widths */}
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 events-container">
            <div className="d-flex justify-content-between align-items-center events-header mt-3 ">
              <h2>Events</h2>
              <button className="create-event-btn" onClick={handleCreateEventNavigation} style={{ width: '150px', fontSize: '15px', padding: '5px 10px' }}>
                Create an event
              </button>
            </div>
            <div className="mt-1 registered-events">
              <p>Your Registered Events</p>
            </div>
          </div>
        </div>


        {/* Modal Structure */}
        {isModalOpen && (
          <div className="modal-overlay-event">
            <div className="modal-content-event">
              <div className="modal-header-event">
                <h2>Create an event</h2>
                <button className="close-btn-event" onClick={closeModal}>
                  &times;
                </button>
                <hr />
              </div>

              <form onSubmit={handleSubmit} className="modal-body-event">
                <div className="upload-cover-image-event">
                  <p>Upload cover image</p>
                  <p className="image-requirement-event">
                    Minimum width 480 pixels, 16:9 recommended
                  </p>
                  <input type="file" name="coverImage" onChange={handleFileChange} />
                </div>

                <div className="event-type-section">
                  <label>Event type</label>
                  <div className="radio-group1">
                    <label>
                      <input
                        type="radio"
                        name="eventType"
                        value="Online"
                        checked={formData.eventType === "Online"}
                        onChange={handleInputChange}
                      />
                      Online
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="eventType"
                        value="In person"
                        checked={formData.eventType === "In person"}
                        onChange={handleInputChange}
                      />
                      In person
                    </label>
                  </div>
                </div>

                <div className="event-format-section">
                  <label>Event format</label>
                  <select
                    name="eventFormat"
                    value={formData.eventFormat}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                  </select>
                </div>

                <div className="event-name-section">
                  <label>Event name</label>
                  <input
                    type="text"
                    name="eventName"
                    placeholder="Event name"
                    value={formData.eventName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="date-section-event">
                  <div className="start-date-event">
                    <label>Start date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="end-date-event">
                    <label>End date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="description-section-event">
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Ex: topics, schedule, etc..."
                    maxLength="5000"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <p className="char-counter-event">
                    {formData.description.length}/5000
                  </p>
                </div>

                <div className="speakers-section-event">
                  <label>Speakers</label>
                  <div className="speakers-input-event">
                    <input
                      type="text"
                      name="speakers"
                      placeholder="Enter speakers"
                      value={formData.speakers}
                      onChange={handleInputChange}
                    />
                    <i className="fas fa-search event-search-icon"></i>
                  </div>
                  <p className="info-text">
                    Invite connections to speak at the event. Speakers can join early and will appear in the event’s Details section and presenter area.
                  </p>
                </div>

                <div className="modal-footer-event">
                  <button
                    type="button"
                    className="cancel-btn-event"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="create-btn-event">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ============================================================ */}





        <div className="featured-discussion-wrapper">
          {/* Header Section */}
          <div className="featured-discussion-header">
            <h3>Featured Discussions</h3>
            <div className="discussion-cards">
              {discussions.slice(0, 3).map((discussion) => (
                <div key={discussion.id} className="featured-card">
                  <div className="card-image" style={{ backgroundImage: `url(${discussion.image})`, backgroundSize: 'cover' }}></div>
                  <p className="card-date">{discussion.date} · {discussion.type}</p>
                  <p className="card-title">
                    {discussion.title}
                  </p>
                  <p className="card-footer">{discussion.speaker} · {discussion.attendees}</p>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/eventview/${discussion.id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>

            <a href="/" className="see-all-link">See All</a>
          </div>

          {/* Discussion Cards Section */}
          <div className="discussion-cards">
            {discussionsToShow.map((discussion) => (
              <div key={discussion.id} className="card-feautred">
                {/* Image Section */}
                <img
                  src={fI}
                  alt={`Discussion: ${discussion.title}`}
                  className="card-image-feautred"
                />

                {/* Content Section */}
                <div className="card-content-feautred">
                  <p className="card-date-feautred">
                    {discussion.date} • {discussion.type}
                  </p>
                  <h4 className="card-title-feautred">{discussion.title}</h4>
                  <p className="card-speaker-feautred">
                    <span>{discussion.speaker}</span>
                    <span style={{ marginLeft: '10px' }}>• {discussion.attendees}</span>
                  </p>

                  {/* Action Buttons */}
                  <div className="card-actions-feautred">
                    <button
                      className="view-btn-feautred"
                      onClick={() => console.log('View clicked for:', discussion.id)}
                      style={{ width: 'auto', padding: '2px 15px', marginRight: '5px' }}
                    >
                      View
                    </button>
                    <button
                      className="view-btn-feautred"
                      onClick={() => navigate(`/edit-event/${discussion.id}`)}
                      style={{ width: 'auto', padding: '2px 15px', borderColor: '#58A4B0', color: '#58A4B0' }}
                    >
                      Edit
                    </button>
                    <button className="share-btn-feautred-event" style={{ marginLeft: 'auto', marginRight: '0' }}>
                      <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9705 0.960316C11.1111 0.819866 11.3017 0.740976 11.5005 0.740976C11.6992 0.740976 11.8899 0.819866 12.0305 0.960316L17.0305 5.96032C17.1709 6.10094 17.2498 6.29157 17.2498 6.49032C17.2498 6.68907 17.1709 6.87969 17.0305 7.02032L12.0305 12.0203C11.9618 12.094 11.879 12.1531 11.787 12.1941C11.695 12.2351 11.5957 12.2571 11.495 12.2589C11.3943 12.2607 11.2943 12.2422 11.2009 12.2044C11.1075 12.1667 11.0227 12.1106 10.9515 12.0394C10.8802 11.9681 10.8241 11.8833 10.7864 11.7899C10.7486 11.6965 10.7301 11.5965 10.7319 11.4958C10.7337 11.3951 10.7557 11.2958 10.7967 11.2038C10.8377 11.1118 10.8968 11.029 10.9705 10.9603L14.6905 7.24032H6.50049C5.78749 7.24032 4.70049 7.46032 3.81349 8.09932C2.96549 8.70932 2.25049 9.73432 2.25049 11.4903C2.25049 11.6892 2.17147 11.88 2.03082 12.0206C1.89017 12.1613 1.6994 12.2403 1.50049 12.2403C1.30158 12.2403 1.11081 12.1613 0.970158 12.0206C0.829506 11.88 0.750488 11.6892 0.750488 11.4903C0.750488 9.24632 1.70249 7.77032 2.93749 6.88132C4.13349 6.02032 5.54749 5.74032 6.50049 5.74032H14.6905L10.9705 2.02032C10.83 1.87969 10.7511 1.68907 10.7511 1.49032C10.7511 1.29157 10.83 1.10094 10.9705 0.960316Z" fill="#58A4B0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Section */}
          <div className="show-more-section">
            <a
              onClick={toggleShowMore}
              className="show-more-link"
              style={{ cursor: 'pointer', marginLeft: '500px', color: 'black' }}
            >
              {showAll ? 'Show Less' : 'Show More'}{' '}
              <i className={`fa fa-chevron-${showAll ? 'up' : 'down'}`}></i>
            </a>
          </div>
        </div>
        {/* ============================================== */}
        {/* <div className="featured-discussion-wrapper1">
        <div className="featured-discussion-header1">
          <h3>Featured Discussion</h3>
          <a href="/" className="see-all1">See all</a>
        </div>

        <div className="discussion-cards1">

          {discussionsToShow.map((discussion) => (

            <div key={discussion.id} className="card-feautred1">
              <img src={fI} alt="Chess" className="card-image-feautred1" />
              <div className="card-content-feautred1">
                <p className="card-date-feautred1">{discussion.date} • {discussion.type}</p>
                <p className="card-title-feautred1">{discussion.title}</p>
                <p className="card-speaker-feautred1">
                  <span>{discussion.speaker}</span>
                  <span style={{ marginLeft: '10px' }}>• {discussion.attendees}</span>
                </p>
                <div className="card-actions-feautred1">
                  <button className="view-btn-feautred1" onClick={handleView}>View</button>

                  <button className="share-btn-feautred1">
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9705 0.960316C11.1111 0.819866 11.3017 0.740976 11.5005 0.740976C11.6992 0.740976 11.8899 0.819866 12.0305 0.960316L17.0305 5.96032C17.1709 6.10094 17.2498 6.29157 17.2498 6.49032C17.2498 6.68907 17.1709 6.87969 17.0305 7.02032L12.0305 12.0203C11.9618 12.094 11.879 12.1531 11.787 12.1941C11.695 12.2351 11.5957 12.2571 11.495 12.2589C11.3943 12.2607 11.2943 12.2422 11.2009 12.2044C11.1075 12.1667 11.0227 12.1106 10.9515 12.0394C10.8802 11.9681 10.8241 11.8833 10.7864 11.7899C10.7486 11.6965 10.7301 11.5965 10.7319 11.4958C10.7337 11.3951 10.7557 11.2958 10.7967 11.2038C10.8377 11.1118 10.8968 11.029 10.9705 10.9603L14.6905 7.24032H6.50049C5.78749 7.24032 4.70049 7.46032 3.81349 8.09932C2.96549 8.70932 2.25049 9.73432 2.25049 11.4903C2.25049 11.6892 2.17147 11.88 2.03082 12.0206C1.89017 12.1613 1.6994 12.2403 1.50049 12.2403C1.30158 12.2403 1.11081 12.1613 0.970158 12.0206C0.829506 11.88 0.750488 11.6892 0.750488 11.4903C0.750488 9.24632 1.70249 7.77032 2.93749 6.88132C4.13349 6.02032 5.54749 5.74032 6.50049 5.74032H14.6905L10.9705 2.02032C10.83 1.87969 10.7511 1.68907 10.7511 1.49032C10.7511 1.29157 10.83 1.10094 10.9705 0.960316Z" fill="#58A4B0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="show-more-section-feautred1">
          <a onClick={toggleShowMore} className="show-more-link-feautred1">
            {showAll ? 'Show less' : 'Show more'} <i className={`fa fa-chevron-${showAll ? 'up' : 'down'}`}></i>
          </a>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default EventsHome;





