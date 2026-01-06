import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateNews.css';

const CreateNews = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        category: '',
        publishedAt: '',
        tags: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.content || !formData.author || !formData.category || !formData.publishedAt) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Convert tags from comma-separated string to array
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            // Format publishedAt to ISO string
            const publishedAtISO = new Date(formData.publishedAt).toISOString();

            const newsData = {
                title: formData.title,
                content: formData.content,
                author: formData.author,
                category: formData.category,
                publishedAt: publishedAtISO,
                tags: tagsArray
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/news-articles`,
                newsData
            );


            console.log('News created:', response.data);
            setSuccess(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/news');
            }, 2000);

        } catch (err) {
            console.error('Error creating news:', err);
            setError(err.response?.data?.message || 'Failed to create news. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="create-news-container">
            <div className="create-news-header">
                <button onClick={handleBack} className="back-button-news">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                </button>
                <h1 className="create-news-title">Create News Article</h1>
            </div>

            <div className="create-news-content">
                {/* Form Section */}
                <div className="create-news-form-section">
                    <form onSubmit={handleSubmit} className="create-news-form">
                        {error && (
                            <div className="alert alert-error">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                News article created successfully! Redirecting...
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="title">Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter news title"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="author">Author *</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="Author name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category *</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Health">Health</option>
                                    <option value="Science">Science</option>
                                    <option value="Education">Education</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishedAt">Publish Date & Time *</label>
                            <input
                                type="datetime-local"
                                id="publishedAt"
                                name="publishedAt"
                                value={formData.publishedAt}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content *</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your news content here..."
                                rows="10"
                                required
                            />
                            <div className="character-count">
                                {formData.content.length} characters
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tags">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Enter tags separated by commas (e.g., javascript, framework, technology)"
                            />
                            <small className="form-hint">Separate tags with commas</small>
                        </div>

                        <button
                            type="submit"
                            className="submit-button-news"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M12 5L19 12M12 5L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Publish News
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Preview Section */}
                <div className="create-news-preview-section">
                    <h2 className="preview-title">Live Preview</h2>
                    <div className="preview-card">
                        <div className="preview-header">
                            {formData.category && (
                                <span className="preview-category">{formData.category}</span>
                            )}
                            {formData.publishedAt && (
                                <span className="preview-date">
                                    {new Date(formData.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            )}
                        </div>

                        <h3 className="preview-news-title">
                            {formData.title || 'Your news title will appear here'}
                        </h3>

                        <p className="preview-author">
                            By {formData.author || 'Author Name'}
                        </p>

                        <div className="preview-content">
                            {formData.content || 'Your news content will appear here. Start typing to see the preview update in real-time.'}
                        </div>

                        {formData.tags && (
                            <div className="preview-tags">
                                {formData.tags.split(',').map((tag, index) => (
                                    tag.trim() && (
                                        <span key={index} className="preview-tag">
                                            #{tag.trim()}
                                        </span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNews;
