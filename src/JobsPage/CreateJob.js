import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobsDash.css'; // Reusing styles where possible

const CreateJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        DatePosted: new Date().toISOString().split('T')[0], // Default to today: YYYY-MM-DD
        JobType: 'Full Time',
        Required: 1,
        Status: 'Posted',
        Companyname: '',
        CompanyOverview: '',
        RoleAndResposiblity: '',
        CandidateQualification: '',
        RequiredSkills: ''
    });

    useEffect(() => {
        document.body.style.backgroundColor = "#fce8e6";
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
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/jobs`;


            // Format date to DD-MM-YYYY
            const dateObj = new Date(formData.DatePosted);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            const payload = {
                ...formData,
                DatePosted: formattedDate,
                Required: parseInt(formData.Required, 10)
            };

            const response = await axios.post(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Job Created Successfully:", response.data);
            navigate('/jobs-dash');

        } catch (err) {
            console.error("Error creating job:", err);
            setError(err.response?.data?.message || 'Failed to create job posting. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#fcfcff' }}>
            <div style={{
                maxWidth: '900px',
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                padding: '40px'
            }}>
                <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1f36', marginBottom: '8px' }}>Post a New Job</h1>
                        <p style={{ color: '#6b7280', fontSize: '15px' }}>Find the best talent for your company</p>
                    </div>
                    <button
                        onClick={() => navigate('/jobs-dash')}
                        style={{ padding: '10px 20px', border: '1px solid #e1e4e8', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: '600', color: '#555' }}
                    >
                        Cancel
                    </button>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fff5f5', color: '#c53030', padding: '15px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #fed7d7' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Basic Info Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                        <div>
                            <label style={labelStyle}>Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Senior Software Engineer"
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Company Name</label>
                            <input
                                type="text"
                                name="Companyname"
                                value={formData.Companyname}
                                onChange={handleChange}
                                placeholder="e.g. TechCorp Inc."
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                        <div>
                            <label style={labelStyle}>Job Type</label>
                            <select
                                name="JobType"
                                value={formData.JobType}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Itership">Internship</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Openings (Required)</label>
                            <input
                                type="number"
                                name="Required"
                                value={formData.Required}
                                onChange={handleChange}
                                min="1"
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Date Posted</label>
                            <input
                                type="date"
                                name="DatePosted"
                                value={formData.DatePosted}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    {/* Detailed Info Section */}
                    <div style={{ marginBottom: '30px' }}>
                        <label style={labelStyle}>Company Overview</label>
                        <textarea
                            name="CompanyOverview"
                            value={formData.CompanyOverview}
                            onChange={handleChange}
                            placeholder="Tell us about your company..."
                            rows="4"
                            style={textareaStyle}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={labelStyle}>Roles & Responsibility</label>
                        <textarea
                            name="RoleAndResposiblity"
                            value={formData.RoleAndResposiblity}
                            onChange={handleChange}
                            placeholder="What will the candidate do?"
                            rows="5"
                            style={textareaStyle}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={labelStyle}>Candidate Qualification</label>
                        <textarea
                            name="CandidateQualification"
                            value={formData.CandidateQualification}
                            onChange={handleChange}
                            placeholder="e.g. B.Tech in Computer Science, 3+ years experience..."
                            rows="4"
                            style={textareaStyle}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <label style={labelStyle}>Required Skills</label>
                        <textarea
                            name="RequiredSkills"
                            value={formData.RequiredSkills}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, SQL..."
                            rows="3"
                            style={textareaStyle}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/jobs-dash')}
                            style={{ padding: '14px 30px', border: '1px solid #e1e4e8', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: '600', color: '#555', fontSize: '16px' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '14px 40px',
                                border: 'none',
                                borderRadius: '8px',
                                background: '#58a4b0',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                                color: '#fff',
                                fontSize: '16px',
                                boxShadow: '0 4px 6px rgba(88, 164, 176, 0.2)',
                                transition: 'transform 0.1s'
                            }}
                            onMouseOver={(e) => !loading && (e.target.style.background = '#4a8f9a')}
                            onMouseOut={(e) => !loading && (e.target.style.background = '#58a4b0')}
                        >
                            {loading ? 'Posting...' : 'Post Job'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

// Internal styles for clean component
const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px'
};

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff'
};

const textareaStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: 'vertical',
    backgroundColor: '#fff',
    fontFamily: 'inherit'
};

export default CreateJob;
