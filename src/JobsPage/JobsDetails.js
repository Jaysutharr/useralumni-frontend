import React, { useState, useEffect } from 'react';
import './JobsDetails.css';
import dI from '../assets/companynamelogo.jpeg';
import jI from '../assets/jobsimage.jpeg';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";   // ✅ FIXED
import axios from 'axios';
const JobDetails = () => {
  useEffect(() => {
    // Set the body background color to white when this component mounts
    document.body.style.backgroundColor = "white";

    // Reset the body background color when this component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // or set to the default color you want for other pages
    };
  }, []);
  const job = {
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'India',
    datePosted: 'August 9, 2024',
    applicants: '45 applicants',
    jobType: 'Full-Time Job',
    workMode: 'Remote',
    description: `At Tech Innovators Inc., we are looking for a passionate and skilled Senior Software Engineer to join our dynamic team.
    As a leading technology company, we specialize in innovative solutions that drive the future of software development. 
    In this role, you'll have the opportunity to work on cutting-edge projects, collaborating with talented engineers and developers.`,
    roleAndResponsibilities: [
      'Lead Development: Oversee the design, development, and implementation of software projects.',
      'Collaborate: Work closely with cross-functional teams to define, design, and ship new features.',
      'Mentorship: Provide guidance and mentorship to junior developers.',
      'Problem-Solving: Identify and resolve performance bottlenecks.',
      'Innovation: Contribute to continuous improvement of technology stack and engineering processes.',
    ],
    candidateQualifications: [
      'Education: Bachelor\'s or Master\'s degree in Computer Science, Engineering, or a related field.',
      'Experience: Minimum of 5 years in full-stack software development.',
      'Certifications: Software engineering or development certifications are optional but preferred.',
    ],
    requiredSkills: [
      'Programming Languages: Java, Python, C#.',
      'Frameworks: React.js, Angular, Vue.js.',
      'Databases: SQL and NoSQL databases.',
      'DevOps: Familiarity with CI/CD pipelines and cloud platforms like AWS or Azure.',
      'Problem Solving: Excellent analytical and problem-solving skills.',
      'Communication: Strong verbal and written communication skills.',
    ],
    additionalSkills: [
      'Leadership: Leading a team of developers.',
      'Agile Methodology: Understanding Agile/Scrum.',
      'UI/UX: Basic UI/UX understanding.',
      'Continuous Learning: Staying updated with latest trends.',
    ],
    companyDetails: {
      name: 'Tech Innovators Inc.',
      followers: '10,000 followers',
      description: `Tech Innovators Inc. is a leading technology company dedicated to pushing the boundaries of software development.
      With a global team of innovators, we focus on creating solutions that not only meet but exceed the expectations of our clients.
      Our mission is to empower businesses by providing them with the tools and technologies needed to succeed in the digital age.
      Join us in shaping the future of technology.`,
    },
  };

  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };
  const navigate = useNavigate();
  const handleClick = () => {
    // Redirect to another page when clicked
    window.location.href = '/job-details'; // Change this to your desired URL
  };
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const baseUrl = (process.env.REACT_APP_API_URL || "http://localhost:13417").replace(/\/$/, "");
        const response = await axios.get(`${baseUrl}/api/v1/jobs`);


        setJobs(response.data.data);
        console.log("data", response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job listings");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);



  if (loading) return <p>Loading job listings...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="job-details-page">
      {/* LEFT SIDE */}
      <div className="job-main-card">
        <div className="job-header">
          <FaArrowLeft className="back-icon" />   {/* ✅ FIXED */}
          <div className="company-logo"></div>

          <div className="job-title-section">
            <p className="company-name">Tech Innovators Inc.</p>
            <h2>Senior Software Engineer</h2>

            <p className="job-meta">
              India • August 9, 2024 • 45 applicants
            </p>

            <div className="job-tags">
              <span>Full-Time Job</span>
              <span>Remote</span>
            </div>

            <div className="job-actions">
              <button className="apply-btn">Apply</button>
              <button className="save-btn">Save</button>
            </div>
          </div>
        </div>

        <div className="job-content">
          <section>
            <h3>About the job</h3>
            <p className="section-title">Company overview</p>
            <p>
              At Tech Innovators Inc., we are looking for a passionate and skilled
              Senior Software Engineer to join our dynamic team. As a leading
              technology company, we specialize in innovative solutions that
              drive the future of software development.
            </p>
          </section>

          <section>
            <h3>Role And Responsibilities</h3>
            <ul>
              <li>Lead Development: Oversee design and implementation.</li>
              <li>Collaborate with cross-functional teams.</li>
              <li>Mentorship for junior developers.</li>
              <li>Problem-solving and optimization.</li>
              <li>Innovation in technology stack.</li>
            </ul>
          </section>

          <section>
            <h3>Candidate Qualifications</h3>
            <ul>
              <li>Bachelor’s or Master’s in Computer Science.</li>
              <li>Minimum 5 years of experience.</li>
              <li>Relevant certifications (optional).</li>
            </ul>
          </section>

          <section>
            <h3>Required Skills</h3>
            <p>React, Node.js, MongoDB, REST APIs, System Design</p>
          </section>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="job-sidebar">
        <h3>More Jobs for you</h3>

        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className={`sidebar-job ${item === 1 ? "active" : ""}`}>
            <div>
              <h4>Senior Software Engineer</h4>
              <p>Tech Innovators Inc.</p>
              <span>India (Remote)</span>
              <span className="time">3 weeks ago</span>
            </div>
            <span className="close">×</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetails;