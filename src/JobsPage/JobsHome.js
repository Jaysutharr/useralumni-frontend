import React, { useState } from "react";
import "./JobsHome.css";
import jI from "../assets/jobsimage.jpeg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import JobsDash from "./JobsDash";

/* ---------------- DUMMY DATA ---------------- */

const dummyJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    Company: "Tech Innovators Inc.",
    JobType: "India (Remote)",
    DatePosted: "3 weeks ago",
  },
  {
    id: 2,
    title: "Frontend Developer",
    Company: "Google",
    JobType: "Onsite · Internship",
    DatePosted: "1 week ago",
  },
  {
    id: 3,
    title: "Backend Developer",
    Company: "Amazon",
    JobType: "Hybrid · Full Time",
    DatePosted: "5 days ago",
  },
];

const keywords = [
  "remote",
  "marketing manager",
  "hr",
  "legal",
  "google",
  "amazon",
];

const mentors = Array(4).fill({
  title: "Build a strong resume",
  mentorName: "Sandeep Maheshwari",
});

/* ---------------- COMPONENT ---------------- */

const JobsHome = () => {
  const navigate = useNavigate();
  const [jobs] = useState(dummyJobs);

  return (
    <>
      <JobsDash />

      <div className="jobs-page-layout">
        {/* ================= LEFT COLUMN ================= */}
        <div className="jobs-left">

          <div className="main-jobs-listing-container">
            <h3>Find Your Next Opportunity</h3>
            <h4>Your Gateway to Jobs, Internship, and Career Growth</h4>
          </div>

          <div className="job-listings-container">
            <h4>Job Postings and Internships</h4>

            <div className="job-listings-scrollable">
              {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <img src={jI} alt="job" />

                  <div
                    className="job-details"
                    onClick={() => navigate("/job-details")}
                  >
                    <h5>{job.title}</h5>
                    <p>{job.Company}</p>
                    <p>{job.JobType}</p>
                    <span>{job.DatePosted}</span>
                  </div>

                  <span className="close-icon">×</span>
                </div>
              ))}
            </div>

            <button className="show-all-btn">Show all</button>
          </div>

          <div className="keywords-container">
            <h4>Search by keywords</h4>
            <div className="keywords-list">
              {keywords.map((k, i) => (
                <span key={i} className="keyword-chip">
                  <FaSearch /> {k}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="jobs-right">

          <div className="more-jobs-container">
            <h4>More Jobs for you</h4>

            {jobs.map((job) => (
              <div className="more-job-card" key={job.id}>
                <div>
                  <h5>{job.title}</h5>
                  <p>{job.Company}</p>
                  <span>{job.DatePosted}</span>
                </div>
                <span className="close-icon">×</span>
              </div>
            ))}

            <button className="show-all-btn">Show all</button>
          </div>

          <div className="mentorship-section-jobshome">
            <h4>Career Guidance and Mentorship</h4>

            <div className="card-container-jobshome">
              {mentors.map((m, i) => (
                <div className="card-jobs" key={i}>
                  <img src={jI} alt="mentor" />
                  <h5>{m.title}</h5>
                  <p>{m.mentorName}</p>
                  <button>Join</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default JobsHome;
