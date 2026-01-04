import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ArticleRead.css';
import axios from 'axios';

const ArticleRead = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;

  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(blog?.views || 0);

  useEffect(() => {
    // Set the body background color to white when this component mounts
    document.body.style.backgroundColor = "white";

    // Increment view count when blog is opened
    const incrementViewCount = async () => {
      if (blog && blog._id) {
        try {
          // Call backend to increment view count
          const response = await axios.put(`http://localhost:13417/api/v1/blogs/${blog._id}/view`);
          if (response.data && response.data.views !== undefined) {
            setViewCount(response.data.views);
          }
        } catch (err) {
          console.error('Error incrementing view count:', err);
          // If endpoint doesn't exist yet, just use the current count
          setViewCount(blog.views || 0);
        }
      }
    };

    incrementViewCount();

    // Fetch related blogs (excluding current blog)
    const fetchRelatedBlogs = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await axios.get(`http://localhost:13417/api/v1/blogs?t=${timestamp}`);

        // Sort by date and exclude current blog
        const sortedBlogs = response.data
          .filter(b => b._id !== blog?._id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5); // Get top 5 related blogs

        setRelatedBlogs(sortedBlogs);
      } catch (err) {
        console.error('Error fetching related blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (blog) {
      fetchRelatedBlogs();
    }

    // Reset the body background color when this component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [blog]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate('/edit-blog', { state: { blog } });
  };

  const handleBlogClick = (selectedBlog) => {
    navigate('/readnow-article', { state: { blog: selectedBlog } });
    window.scrollTo(0, 0); // Scroll to top when viewing new blog
  };

  if (!blog) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Blog not found</h2>
        <button onClick={handleBackClick} style={{
          padding: '0.75rem 1.5rem',
          background: '#58a4b0',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', gap: '1rem' }}>
        <span className='donation-back'>
          <svg onClick={handleBackClick} width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
            <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E" />
            <path d="M9.26973 20L19.6372 30.365C19.8719 30.5997 20.0038 30.918 20.0038 31.25C20.0038 31.5819 19.8719 31.9003 19.6372 32.135C19.4025 32.3697 19.0842 32.5016 18.7522 32.5016C18.4203 32.5016 18.1019 32.3697 17.8672 32.135L6.61723 20.885C6.50083 20.7689 6.40847 20.6309 6.34545 20.4791C6.28244 20.3272 6.25 20.1644 6.25 20C6.25 19.8356 6.28244 19.6728 6.34545 19.5209C6.40847 19.369 6.50083 19.2311 6.61723 19.115L17.8672 7.86499C18.1019 7.63028 18.4203 7.49841 18.7522 7.49841C19.0842 7.49841 19.4025 7.63028 19.6372 7.86499C19.8719 8.09971 20.0038 8.41805 20.0038 8.74999C20.0038 9.08193 19.8719 9.40028 19.6372 9.63499L9.26973 20Z" fill="#1B1B1E" />
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '35px',
            fontWeight: '500',
            margin: '10px 0',
            color: 'black',
          }}>
            {blog.title}
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginLeft: '10px',
            marginTop: '0.5rem'
          }}>
            {blog.tags && blog.tags.length > 0 && blog.tags.map((tag, idx) => (
              <span key={idx} style={{
                background: '#dbeef1',
                color: '#3c8b94',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleEditClick}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#58a4b0',
            border: '2px solid #58a4b0',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#58a4b0';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#58a4b0';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Edit Blog
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', padding: '20px' }}>
        <div className="donation-article-card" style={{ flex: 1 }}>
          <div className='donation-article-content'>
            {/* Cover Image Placeholder */}
            <div style={{
              width: '100%',
              height: '300px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Blog Cover Image</span>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="donation-social-stats" style={{
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>
              <div className="donation-social-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '14px',
                color: '#495057',
                fontWeight: '500'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#58a4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#58a4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{viewCount} {viewCount === 1 ? 'view' : 'views'}</span>
              </div>

              <div
                className="donation-social-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '14px',
                  color: '#495057',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/news-comment')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#58a4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{Math.floor(Math.random() * 200) + 10} comments</span>
              </div>

              <div
                className="donation-social-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '14px',
                  color: '#495057',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: `Check out this blog: ${blog.title}`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="#58a4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 6L12 2L8 6" stroke="#58a4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2V15" stroke="#58a4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Share</span>
              </div>
            </div>

            {/* Author and Date Info */}
            <div className="donation-social-stats" style={{ marginBottom: '1.5rem' }}>
              <div className="donation-social-item" style={{ fontSize: '14px', color: '#718096' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                By {blog.author}
              </div>
              <div className="donation-social-item" style={{ fontSize: '14px', color: '#718096' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {blog.updatedAt !== blog.createdAt && (
                <div className="donation-social-item" style={{ fontSize: '14px', color: '#718096' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27542C16.8482 4.26548 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Updated {new Date(blog.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Blog Content */}
            <div className="donation-description" style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333',
              whiteSpace: 'pre-wrap',
              marginBottom: '2rem'
            }}>
              {blog.content}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '2px solid #f0f0f0'
            }}>
              <button
                onClick={() => navigate('/news-comment')}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #58a4b0 0%, #3d7a85 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add Comment
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: `Check out this blog: ${blog.title}`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: 'white',
                  color: '#58a4b0',
                  border: '2px solid #58a4b0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#58a4b0';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#58a4b0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Share Article
              </button>
            </div>
          </div>
        </div>

        {/* Related Blogs Sidebar */}
        <div className="donation-card-list">
          <h2 style={{ color: 'black', fontSize: '20px', marginBottom: '1rem' }}>More Popular Articles</h2>
          <div className="scroll-container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                <p>Loading articles...</p>
              </div>
            ) : relatedBlogs.length > 0 ? (
              relatedBlogs.map((relatedBlog) => (
                <div
                  key={relatedBlog._id}
                  className="donation-card-container"
                  onClick={() => handleBlogClick(relatedBlog)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="recent-img" style={{
                    width: '80px',
                    height: '80px',
                    background: '#f0f0f0',
                    borderRadius: '12px',
                    flexShrink: 0
                  }}></div>
                  <div className="donation-card-content1" style={{ flex: 1 }}>
                    <h5 className="donation-card-title1" style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#333',
                      lineHeight: '1.4'
                    }}>
                      {relatedBlog.title}
                    </h5>
                    <div style={{
                      fontSize: '12px',
                      color: '#718096',
                      marginBottom: '0.5rem'
                    }}>
                      By {relatedBlog.author} • {new Date(relatedBlog.createdAt).toLocaleDateString()}
                    </div>
                    {relatedBlog.tags && relatedBlog.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {relatedBlog.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.7rem',
                              padding: '0.2rem 0.6rem',
                              background: '#e6f7f9',
                              color: '#58a4b0',
                              borderRadius: '12px',
                              fontWeight: '500'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                <p>No more articles available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleRead;
