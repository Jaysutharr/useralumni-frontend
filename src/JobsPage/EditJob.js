import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './JobsDash.css'; // Reusing styles where possible

const EditJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        DatePosted: '',
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
        const fetchJob = async () => {
            try {
                const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');
                const response = await axios.get(`${baseUrl}/api/v1/jobs/${id}`);
                const jobData = response.data;

                // Ensure date format matches input type="date" (YYYY-MM-DD)
                // Existing format might be DD-MM-YYYY or something else, let's try to parse it
                let dateValue = '';
                if (jobData.DatePosted) {
                    // If stored as DD-MM-YYYY
                    if (jobData.DatePosted.includes('-')) {
                        const parts = jobData.DatePosted.split('-');
                        if (parts[0].length === 2 && parts[2].length === 4) {
                            // DD-MM-YYYY -> YYYY-MM-DD
                            dateValue = `${parts[2]}-${parts[1]}-${parts[0]}`;
                        } else {
                            // Already YYYY-MM-DD or standard ISO
                            dateValue = jobData.DatePosted.split('T')[0];
                        }
                    }
                }

                setFormData({
                    title: jobData.title || '',
                    DatePosted: dateValue,
                    JobType: jobData.JobType || 'Full Time',
                    Required: jobData.Required || 1,
                    Status: jobData.Status || 'Posted',
                    Companyname: jobData.Companyname || '',
                    CompanyOverview: jobData.CompanyOverview || '',
                    RoleAndResposiblity: jobData.RoleAndResposiblity || '',
                    CandidateQualification: jobData.CandidateQualification || '',
                    RequiredSkills: jobData.RequiredSkills || ''
                });

            } catch (err) {
                console.error("Error fetching job:", err);
                setFetchError("Failed to load job details. It may not exist.");
            }
        };

        if (id) {
            fetchJob();
        }

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [id]);

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
            const apiUrl = `${baseUrl}/api/v1/jobs/${id}`;

            // Format date to DD-MM-YYYY for backend consistency
            let formattedDate = formData.DatePosted;
            if (formData.DatePosted) {
                const dateObj = new Date(formData.DatePosted);
                if (!isNaN(dateObj)) {
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const year = dateObj.getFullYear();
                    formattedDate = `${day}-${month}-${year}`;
                }
            }

            const payload = {
                ...formData,
                DatePosted: formattedDate,
                Required: parseInt(formData.Required, 10)
            };

            const response = await axios.put(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Job Updated Successfully:", response.data);
            navigate(`/job-view/${id}`); // Redirect back to view page

        } catch (err) {
            console.error("Error updating job:", err);
            if (err.response) {
                // Server responded with a status code outside of 2xx
                // User said "do error handling accordingly" for the other two responses (likely 404, 400, 500)
                const status = err.response.status;
                if (status === 404) {
                    setError('Job not found (404). It might have been deleted.');
                } else if (status === 500) {
                    setError('Internal Server Error (500). Please try again later.');
                } else {
                    setError(err.response.data?.message || 'Failed to update job posting.');
                }
            } else if (err.request) {
                setError('Network error. No response received from server.');
            } else {
                setError('Error processing request.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetchError) {
        return (
            <div style={{ minHeight: '100vh', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcfcff' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#c53030' }}>{fetchError}</h2>
                    <button onClick={() => navigate('/jobs-dash')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Go Back</button>
                </div>
            </div>
        )
    }

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
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1f36', marginBottom: '8px' }}>Edit Job Posting</h1>
                        <p style={{ color: '#6b7280', fontSize: '15px' }}>Update job details</p>
                    </div>
                    <button
                        onClick={() => navigate(`/job-view/${id}`)}
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
                            onClick={() => navigate(`/job-view/${id}`)}
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
                            {loading ? 'Updating...' : 'Update Job'}
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

export default EditJob;
