import React, { useState, useEffect } from 'react';
import SupportDash from './SupportDash';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './SupportRead.css'; // Ensure we use the shared layout styles
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:13417').replace(/\/$/, '');

const CreateFAQ = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Ensure body background is white/light grey, matching SupportRead behavior
        document.body.style.backgroundColor = "#fafafa";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            setError('Please fill in both fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const apiUrl = `${API_BASE_URL}/api/v1/faqs`;


            await axios.post(apiUrl, {
                question: question,
                answer: answer
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Navigate back to SupportRead after successful creation
            navigate('/support-readnow');

        } catch (err) {
            console.error("Error creating FAQ:", err);
            setError(err.response?.data?.message || 'Failed to create FAQ. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:13417').replace(/\/$/, '');
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
                    <h1 style={{ marginBottom: '30px', color: '#1a1f36', fontSize: '26px', fontWeight: '700' }}>Create New FAQ</h1>

                    {error && <div style={{ color: '#d93025', marginBottom: '25px', textAlign: 'left', backgroundColor: '#fce8e6', padding: '12px', borderRadius: '6px', border: '1px solid #fad2cf' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#3c4257', fontSize: '15px' }}>Question</label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="e.g. How do I reset my password?"
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
                                placeholder="Enter the detailed answer here..."
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
                                {loading ? 'Creating...' : 'Create FAQ'}
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

export default CreateFAQ;
