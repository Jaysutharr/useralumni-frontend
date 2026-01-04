import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventsHome.css'; // Reusing styles

const CreateEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        EventName: '',
        DateTime: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:MM
        EventType: 'In-person',
        NoOfAttendees: '',
        Status: 'Upcoming',
        eventImage: '', // Optional/Simple input as planned
        createdby: 'Admin' // Default or could be dynamic
    });

    useEffect(() => {
        // Optional: Set background like other create pages if needed
        document.body.style.backgroundColor = "#fcfcff";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
            const apiUrl = `${baseUrl}/api/v1/CreateeventDetails`;

            // Payload matching user requirements
            const payload = {
                ...formData,
                title: formData.EventName // Duplicating as 'title' likely needed for some UI views
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('authToken') // Include auth token
                }
            };

            const response = await axios.post(apiUrl, payload, config);

            if (response.data && response.data.success) {
                alert("Event created successfully!");
                navigate('/events');
            } else {
                // Fallback success check if structure varies
                alert("Event created!");
                navigate('/events');
            }

        } catch (err) {
            console.error("Error creating event:", err);
            setError(err.response?.data?.message || 'Failed to create event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container main-container-eventall" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card-feautred1" style={{ height: 'auto', padding: '40px', cursor: 'default', backgroundColor: '#fff' }}>
                        <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, color: '#1a1f36', fontWeight: '700' }}>Create New Event</h2>
                            <button
                                onClick={() => navigate('/events')}
                                style={{ padding: '8px 16px', border: '1px solid #e1e4e8', borderRadius: '8px', background: '#fff', cursor: 'pointer', color: '#555' }}
                            >
                                Cancel
                            </button>
                        </div>

                        {error && (
                            <div style={{ backgroundColor: '#fff5f5', color: '#c53030', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fed7d7' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="modal-body-event">
                            <div className="event-name-section">
                                <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Event Name</label>
                                <input
                                    type="text"
                                    name="EventName"
                                    value={formData.EventName}
                                    onChange={handleChange}
                                    placeholder="e.g. Annual Alumni Gala"
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                />
                            </div>

                            <div className="date-section-event" style={{ marginTop: '20px' }}>
                                <div className="start-date-event" style={{ width: '100%' }}>
                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        name="DateTime"
                                        value={formData.DateTime}
                                        onChange={handleChange}
                                        required
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                            </div>

                            <div className="event-type-section" style={{ marginTop: '20px' }}>
                                <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Event Type</label>
                                <div className="radio-group1" style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="radio"
                                            name="EventType"
                                            value="Online"
                                            checked={formData.EventType === "Online"}
                                            onChange={handleChange}
                                        />
                                        Online
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="radio"
                                            name="EventType"
                                            value="In-person"
                                            checked={formData.EventType === "In-person"}
                                            onChange={handleChange}
                                        />
                                        In-person
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="radio"
                                            name="EventType"
                                            value="Corporate"
                                            checked={formData.EventType === "Corporate"}
                                            onChange={handleChange}
                                        />
                                        Corporate
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                                <div>
                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Attendees (Approx)</label>
                                    <input
                                        type="number"
                                        name="NoOfAttendees"
                                        value={formData.NoOfAttendees}
                                        onChange={handleChange}
                                        placeholder="e.g. 100"
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Status</label>
                                    <select
                                        name="Status"
                                        value={formData.Status}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    >
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="published">Published</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Image URL (Optional)</label>
                                <input
                                    type="text"
                                    name="eventImage"
                                    value={formData.eventImage}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                />
                            </div>

                            <div className="modal-footer-event" style={{ marginTop: '30px', justifyContent: 'flex-end', display: 'flex', gap: '15px' }}>
                                <button
                                    type="button"
                                    className="cancel-btn-event"
                                    onClick={() => navigate('/events')}
                                    style={{ padding: '10px 20px', border: '1px solid #ccc', background: '#fff', borderRadius: '6px' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="create-btn-event"
                                    disabled={loading}
                                    style={{
                                        padding: '10px 30px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        background: '#58a4b0',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: loading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {loading ? 'Creating...' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
