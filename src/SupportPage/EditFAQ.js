import React, { useState, useEffect } from 'react';
import SupportDash from './SupportDash';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import './SupportRead.css';
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:13417').replace(/\/$/, '');

const EditFAQ = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // Initialize state with data passed via navigation state if available
    const [question, setQuestion] = useState(location.state?.question || '');
    const [answer, setAnswer] = useState(location.state?.answer || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "#fafafa";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    // Fetch data if not available in state (e.g. direct link or refresh)
    useEffect(() => {
        if (!id) return;

        if (!question || !answer) {
            setLoading(true);

            axios.get(`${API_BASE_URL}/api/v1/faqs/${id}`)
                .then(response => {
                    const data = response.data;
                    if (data) {
                        setQuestion(data.question || '');
                        setAnswer(data.answer || '');
                    }
                })
                .catch(err => {
                    console.error("Error fetching FAQ details:", err);
                    setError("Failed to load FAQ details.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            setError('Please fill in both fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {

            const response = await axios.put(
                `${API_BASE_URL}/api/v1/faqs/${id}`,
                { question, answer },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );


            // Log success response as per user's confirmation of format
            console.log("FAQ Update Successful:", response.data);

            navigate('/support-readnow');

        } catch (err) {
            console.error("Error updating FAQ:", err);
            // Handle specific status codes if needed, defaulting to message
            if (err.response) {
                if (err.response.status === 404) {
                    setError("FAQ not found. It may have been deleted.");
                } else if (err.response.status === 400) {
                    setError(err.response.data.message || "Invalid input data.");
                } else {
                    setError(err.response.data.message || 'Failed to update FAQ. Please try again.');
                }
            } else {
                setError('Network error or server not reachable.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SupportDash />

            {/* 
               Directly using fixed positioning to float the form ABOVE the dashboard.
               This bypasses any flow/overflow issues with the dashboard container.
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
                    <h1 style={{ marginBottom: '30px', color: '#1a1f36', fontSize: '26px', fontWeight: '700' }}>Edit FAQ</h1>

                    {error && <div style={{ color: '#d93025', marginBottom: '25px', textAlign: 'left', backgroundColor: '#fce8e6', padding: '12px', borderRadius: '6px', border: '1px solid #fad2cf' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#3c4257', fontSize: '15px' }}>Question</label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Enter question"
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
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#3c4257', fontSize: '15px' }}>Answer</label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter answer"
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
                                disabled={loading}
                                style={{
                                    padding: '14px 35px',
                                    backgroundColor: '#58a4b0',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    opacity: loading ? 0.8 : 1,
                                    transition: 'transform 0.1s, background-color 0.2s',
                                    boxShadow: '0 2px 5px rgba(88, 164, 176, 0.3)'
                                }}
                                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#4a8f9a')}
                                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#58a4b0')}
                            >
                                {loading ? 'Updating...' : 'Update FAQ'}
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

export default EditFAQ;
