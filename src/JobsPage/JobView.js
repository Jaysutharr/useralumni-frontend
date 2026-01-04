import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobView.css";

const JobView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const baseUrl = (process.env.REACT_APP_LOCALURL || 'http://localhost:13417').replace(/\/$/, '');

        // Fetch current job details
        const jobResponse = await axios.get(`${baseUrl}/api/v1/jobs/${id}`);
        if (jobResponse.data) {
          setJob(jobResponse.data);
        }

        // Fetch other jobs for "More Jobs for you"
        const allJobsResponse = await axios.get(`${baseUrl}/api/v1/jobs`);
        if (allJobsResponse.data && allJobsResponse.data.data) {
          const others = allJobsResponse.data.data.filter(j => (j._id || j.id) !== id);
          setSuggestedJobs(others.slice(0, 5)); // Show top 5
        } else if (Array.isArray(allJobsResponse.data)) {
          const others = allJobsResponse.data.filter(j => (j._id || j.id) !== id);
          setSuggestedJobs(others.slice(0, 5));
        }

      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div className="job-page"><p>Loading job details...</p></div>;
  if (!job) return <div className="job-page"><p>Job not found</p></div>;

  return (
    <div className="job-page">
      {/* LEFT PANEL */}
      <div className="job-details">
        <div className="job-header">
          <Link to="/jobs-dash" className="back-arrow" style={{ textDecoration: 'none', color: 'inherit', fontSize: '24px', marginRight: '10px' }}>←</Link>
          <span className="company">{job.Companyname}</span>
        </div>

        <h1 className="job-title">{job.title}</h1>

        <div className="job-meta">
          <span>{job.Status}</span>
          <span>• {job.DatePosted}</span>
          <span>• {job.JobType}</span>
        </div>

        <div className="job-tags">
          <span>Required: {job.Required}</span>
          <span>{job.JobType}</span>
        </div>

        <div className="job-actions">
          <button className="apply-btn">Apply</button>
          <button
            className="save-btn"
            style={{
              backgroundColor: '#58a4b0',
              color: 'white',
              border: 'none',
              boxShadow: '0 2px 5px rgba(88, 164, 176, 0.3)'
            }}
          >
            Save
          </button>
          <button
            className="save-btn"
            style={{ backgroundColor: '#e1e4e8', color: '#555' }}
            onClick={() => navigate(`/edit-job/${id}`)}
          >
            Edit
          </button>
        </div>

        <section>
          <h3>About the job</h3>
          <h4>Company overview</h4>
          <p>{job.CompanyOverview}</p>
        </section>

        <section>
          <h4>Role And Responsibilities</h4>
          <p>{job.RoleAndResposiblity}</p>
        </section>

        <section>
          <h4>Candidate Qualifications</h4>
          <p>{job.CandidateQualification}</p>
        </section>

        <section>
          <h4>Required Skills</h4>
          <p>{job.RequiredSkills}</p>
        </section>
      </div>

      {/* RIGHT PANEL */}
      <div className="job-suggestions">
        <h3>More Jobs for you</h3>

        {suggestedJobs.length > 0 ? (
          suggestedJobs.map((suggestion, index) => (
            <div
              className="job-card"
              key={index}
              onClick={() => navigate(`/job-view/${suggestion._id || suggestion.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h4>{suggestion.title}</h4>
                <p>{suggestion.Companyname}</p>
                <span>{suggestion.JobType}</span>
                <span className="time">{suggestion.DatePosted}</span>
              </div>
              <span className="close">×</span>
            </div>
          ))
        ) : (
          <p>No other jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default JobView;
