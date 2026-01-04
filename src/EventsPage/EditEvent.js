import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EventsHome.css'; // Reusing existing styles
import '@fortawesome/fontawesome-free/css/all.min.css';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        eventId: '',
        EventName: '',
        DateTime: '',
        EventType: 'Online',
        NoOfAttendees: '',
        Status: 'published',
        // Optional fields if needed by backend, though user prompt didn't specify them for update
        title: '',
        description: ''
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetching single event details
                const response = await axios.get(`${process.env.REACT_APP_LOCALURL}/api/v1/getSingleeventDetails/${id}`);
                const event = response.data.data || response.data; // Adjust based on actual response structure

                if (event) {
                    setFormData({
                        eventId: event.eventId,
                        EventName: event.EventName || event.title || '',
                        DateTime: event.DateTime ? new Date(event.DateTime).toISOString().split('T')[0] : '',
                        EventType: event.EventType || 'Online',
                        NoOfAttendees: event.NoOfAttendees || '',
                        Status: event.Status || 'published',
                        title: event.title || '',
                        description: event.description || '' // Assuming description maps to title or separate field
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event details:", error);
                setLoading(false);
                // alert("Failed to fetch event details.");
            }
        };

        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show loading state
        Swal.fire({
            title: 'Updating Event...',
            text: 'Please wait while we update the event details.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const token = localStorage.getItem('token');

            // Construct payload matching user request format
            const payload = {
                eventId: formData.eventId,
                EventName: formData.EventName,
                DateTime: formData.DateTime,
                EventType: formData.EventType,
                NoOfAttendees: formData.NoOfAttendees,
                Status: formData.Status
            };

            // Ensure eventId is treated as number/integer if backend requires
            if (payload.eventId) payload.eventId = parseInt(payload.eventId, 10);

            // Use PUT method with the specified endpoint
            const response = await axios.put(
                `${process.env.REACT_APP_LOCALURL}/api/v1/updateeventDeatils/`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    }
                }
            );

            // Handle successful response
            if (response.data && response.data.eventId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `Event "${response.data.EventName}" has been updated successfully!`,
                    confirmButtonColor: '#58A4B0',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/events');
                });
            } else {
                // Handle unexpected response format
                Swal.fire({
                    icon: 'warning',
                    title: 'Update Status Unclear',
                    text: 'The event may have been updated, but the response was unexpected. Please check the event list.',
                    confirmButtonColor: '#58A4B0'
                });
            }
        } catch (error) {
            console.error("Error updating event:", error);

            // Handle different error scenarios
            if (error.response) {
                // Server responded with an error status
                const status = error.response.status;
                const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to update event';

                if (status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: errorMessage,
                        confirmButtonColor: '#58A4B0'
                    });
                } else if (status === 401 || status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Authentication Error',
                        text: 'You are not authorized to update this event. Please log in again.',
                        confirmButtonColor: '#58A4B0'
                    }).then(() => {
                        navigate('/signin');
                    });
                } else if (status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Event Not Found',
                        text: 'The event you are trying to update was not found.',
                        confirmButtonColor: '#58A4B0'
                    });
                } else if (status >= 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: 'A server error occurred. Please try again later.',
                        confirmButtonColor: '#58A4B0'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        text: errorMessage,
                        confirmButtonColor: '#58A4B0'
                    });
                }
            } else if (error.request) {
                // Request was made but no response received
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Unable to connect to the server. Please check your internet connection and try again.',
                    confirmButtonColor: '#58A4B0'
                });
            } else {
                // Something else happened
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An unexpected error occurred while updating the event.',
                    confirmButtonColor: '#58A4B0'
                });
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    return (
        <div className="container main-container-eventall" style={{ marginTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card-feautred1" style={{ height: 'auto', padding: '20px', cursor: 'default' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Event</h2>
                        <form onSubmit={handleSubmit} className="modal-body-event">
                            <div className="event-name-section">
                                <label>Event Name</label>
                                <input
                                    type="text"
                                    name="EventName"
                                    value={formData.EventName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="event-type-section">
                                <label>Event Type</label>
                                <div className="radio-group1" style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="EventType"
                                            value="Online"
                                            checked={formData.EventType === "Online"}
                                            onChange={handleInputChange}
                                        />
                                        Online
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="EventType"
                                            value="In-person"
                                            checked={formData.EventType === "In-person"}
                                            onChange={handleInputChange}
                                        />
                                        In-person
                                    </label>
                                </div>
                            </div>

                            <div className="date-section-event">
                                <div className="start-date-event" style={{ width: '100%' }}>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        name="DateTime"
                                        value={formData.DateTime}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="event-name-section">
                                <label>No. of Attendees</label>
                                <input
                                    type="text"
                                    name="NoOfAttendees"
                                    value={formData.NoOfAttendees}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 100"
                                />
                            </div>

                            <div className="event-name-section">
                                <label>Status</label>
                                <select
                                    name="Status"
                                    value={formData.Status}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '5px', borderRadius: '10px', border: '1px solid #ccc' }}
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="modal-footer-event" style={{ marginTop: '20px' }}>
                                <button
                                    type="button"
                                    className="cancel-btn-event"
                                    onClick={() => navigate('/events')}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="create-btn-event" style={{ marginRight: '0' }}>
                                    Update Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;
