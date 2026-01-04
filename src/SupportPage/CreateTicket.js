import React, { useState, useEffect } from 'react';
import SupportDash from './SupportDash';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './SupportRead.css'; // Reusing for consistency, or we can inline style

const CreateTicket = () => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        console.log("CreateTicket Component Mounted"); // Debug log 
        // Retrieve userId from localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            // Optional: Redirect to login if sensitive
            setError("You must be logged in to submit a ticket.");
        }

        document.body.style.backgroundColor = "#fafafa";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject.trim() || !description.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (!userId) {
            setError('User session invalid. Please log in again.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
            const apiUrl = `${baseUrl}/api/v1/support-tickets`;

            // Payload matches controller expectation: { subject, description, user }
            const payload = {
                subject: subject,
                description: description,
                user: userId
            };

            const response = await axios.post(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Ticket Created Successfully:", response.data);
            navigate('/support-readnow'); // Return to support dashboard

        } catch (err) {
            console.error("Error creating ticket:", err);
            setError(err.response?.data?.error || 'Failed to create ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SupportDash />

            {/* 
               Directly using fixed positioning to float the form ABOVE the dashboard.
               Consistent with CreateFAQ and EditFAQ layout fixes.
            */}
            <div style={{
                position: 'fixed',
                top: '90px',
                left: '280px',
                right: '25px',
                bottom: '20px',
                zIndex: 9999,
                overflowY: 'auto'
            }}>
                <div style={{
                    maxWidth: '850px',
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e1e4e8',
                    marginBottom: '50px'
                }}>
                    <h1 style={{ marginBottom: '30px', color: '#1a1f36', fontSize: '26px', fontWeight: '700' }}>Submit a Support Ticket</h1>

                    {error && <div style={{ color: '#d93025', marginBottom: '25px', textAlign: 'left', backgroundColor: '#fce8e6', padding: '12px', borderRadius: '6px', border: '1px solid #fad2cf' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#3c4257', fontSize: '15px' }}>Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Briefly describe your issue..."
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    border: '1px solid #d9dce1',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    color: '#1a1f36'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#58a4b0';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(88, 164, 176, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#d9dce1';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#3c4257', fontSize: '15px' }}>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide detailed information about the problem..."
                                rows="8"
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    border: '1px solid #d9dce1',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    resize: 'vertical',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    fontFamily: 'inherit',
                                    color: '#1a1f36',
                                    lineHeight: '1.5'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#58a4b0';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(88, 164, 176, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#d9dce1';
                                    e.target.style.boxShadow = 'none';
                                }}
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
                            <button
                                type="submit"
                                disabled={loading || !userId}
                                style={{
                                    padding: '14px 35px',
                                    backgroundColor: '#58a4b0',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: (loading || !userId) ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    opacity: (loading || !userId) ? 0.8 : 1,
                                    transition: 'transform 0.1s, background-color 0.2s',
                                    boxShadow: '0 2px 5px rgba(88, 164, 176, 0.3)'
                                }}
                                onMouseOver={(e) => (!loading && userId) && (e.target.style.backgroundColor = '#4a8f9a')}
                                onMouseOut={(e) => (!loading && userId) && (e.target.style.backgroundColor = '#58a4b0')}
                            >
                                {loading ? 'Submitting...' : 'Submit Ticket'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/support-readnow')}
                                style={{
                                    padding: '14px 35px',
                                    backgroundColor: '#fff',
                                    color: '#555',
                                    border: '1px solid #d9dce1',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateTicket;
