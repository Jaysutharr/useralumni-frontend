import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './NewsRead.css'; // Reusing or creating appropriate CSS
// reuse ArticleRead css or similar structure if possible or assume similar classes exist from project context

const NewsRead = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [news, setNews] = useState(location.state?.news || null);

  const [relatedNews, setRelatedNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(!news);
  const [loadingComments, setLoadingComments] = useState(false);

  // If we navigated here without state (e.g. direct link), we need to fetch the news
  // However, we need an ID. Since we don't have URL params set up in the router for this component explicitly shown in the context (it seems to use state), 
  // we will rely on state. If state is missing, we might need a workaround or show an error.
  // Wait, if direct link is supported, params should be used. 
  // Inspecting previous files, Route path='/news-read' element={<NewsRead />} ... so no :id param in route.
  // Thus, it relies ENTIRELY on location.state. 

  useEffect(() => {
    // Set white background
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (news) {
      setLoading(false);
      fetchRelatedNews();
      fetchComments();
    } else {
      // Fallback: If no news in state, redirect or show error? 
      // Without an ID in the URL, we can't fetch.
      // Assuming user always comes from Dash. 
      // If we want to be fancy we could use query params? 
      // For now, let's assume valid state or show "News not found".
      setLoading(false);
    }
  }, [news]);

  const fetchRelatedNews = async () => {
    try {
      const timestamp = new Date().getTime();
      // Using newly fixed endpoint
      const response = await axios.get(`http://localhost:13417/api/v1/news-articles?t=${timestamp}`);

      const sorted = (response.data.news || [])
        .filter(n => n._id !== news._id)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 5);

      setRelatedNews(sorted);
    } catch (err) {
      console.error('Error fetching related news:', err);
    }
  };

  const fetchComments = async () => {
    if (!news?._id) return;
    try {
      // Using newly fixed endpoint
      const response = await axios.get(`http://localhost:13417/api/v1/comments/${news._id}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setLoadingComments(true);
    try {
      // Using newly fixed endpoint
      const payload = {
        newsId: news._id,
        user: "CurrentUser", // Hardcoded for now as per context, or fetch from auth/localstorage if available
        content: newComment
      };

      await axios.post('http://localhost:13417/api/v1/comments', payload);
      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNewsClick = (selectedNews) => {
    setNews(selectedNews);
    window.scrollTo(0, 0);
  };

  if (!news) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>News Article Not Found</h2>
        <button onClick={() => navigate('/news')} style={{
          padding: '10px 20px',
          background: '#58a4b0',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="news-read-container">
      {/* Header / Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', gap: '1rem' }}>
        <span className='back-icon' onClick={handleBackClick} style={{ cursor: 'pointer' }}>
          <svg width="35" height="35" viewBox="0 0 40 40" fill="none">
            <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E" />
            <path d="M9.26973 20L19.6372 30.365C19.8719 30.5997 20.0038 30.918 20.0038 31.25C20.0038 31.5819 19.8719 31.9003 19.6372 32.135C19.4025 32.3697 19.0842 32.5016 18.7522 32.5016C18.4203 32.5016 18.1019 32.3697 17.8672 32.135L6.61723 20.885C6.50083 20.7689 6.40847 20.6309 6.34545 20.4791C6.28244 20.3272 6.25 20.1644 6.25 20C6.25 19.8356 6.28244 19.6728 6.34545 19.5209C6.40847 19.369 6.50083 19.2311 6.61723 19.115L17.8672 7.86499C18.1019 7.63028 18.4203 7.49841 18.7522 7.49841C19.0842 7.49841 19.4025 7.63028 19.6372 7.86499C19.8719 8.09971 20.0038 8.41805 20.0038 8.74999C20.0038 9.08193 19.8719 9.40028 19.6372 9.63499L9.26973 20Z" fill="#1B1B1E" />
          </svg>
        </span>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '600', margin: 0, color: '#333' }}>{news.title}</h1>
          <span style={{ color: '#58a4b0', fontWeight: '500' }}>{news.category}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', padding: '20px' }}>
        {/* Main Content */}
        <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

          {/* Image Placeholder */}
          <div style={{
            width: '100%',
            height: '300px',
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {news.category || 'News'} Image
          </div>

          {/* Meta Data */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <div>
              <strong>By {news.author}</strong>
              <span style={{ margin: '0 10px' }}>•</span>
              {new Date(news.publishedAt).toLocaleDateString()}
            </div>
            <div>
              👁 {news.views || 0} views &nbsp; 💬 {comments.length} comments
            </div>
          </div>

          {/* Content */}
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#2d3748', whiteSpace: 'pre-line' }}>
            {news.content}
          </div>

          {/* Comment Section */}
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ borderBottom: '2px solid #58a4b0', display: 'inline-block', paddingBottom: '5px' }}>Comments ({comments.length})</h3>

            {/* Comment List */}
            <div style={{ marginTop: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{c.user}
                      <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: 'normal', marginLeft: '10px' }}>
                        {new Date(c.createdAt || Date.now()).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ marginTop: '5px', color: '#555' }}>{c.content}</div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#888' }}>No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>

            {/* Post Comment */}
            <div style={{ marginTop: '2rem' }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px', resize: 'vertical' }}
              />
              <button
                onClick={handlePostComment}
                disabled={loadingComments}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  background: '#58a4b0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  opacity: loadingComments ? 0.7 : 1
                }}
              >
                {loadingComments ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar - Related News */}
        <div style={{ width: '350px' }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Recent News</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {relatedNews.length > 0 ? (
              relatedNews.map(item => (
                <div
                  key={item._id}
                  onClick={() => handleNewsClick(item)}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ width: '60px', height: '60px', background: '#ccc', borderRadius: '8px' }}></div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#333' }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{new Date(item.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#999' }}>No related news found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsRead;
