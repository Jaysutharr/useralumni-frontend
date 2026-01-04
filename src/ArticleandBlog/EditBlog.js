import React, { useState, useEffect } from 'react';
import './CreateBlog.css'; // Reuse the same CSS
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const blogToEdit = location.state?.blog;

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        tags: ''
    });

    useEffect(() => {
        if (blogToEdit) {
            setFormData({
                title: blogToEdit.title || '',
                content: blogToEdit.content || '',
                author: blogToEdit.author || '',
                tags: blogToEdit.tags ? blogToEdit.tags.join(', ') : ''
            });
        } else {
            // If no blog data, redirect back
            navigate('/articles-blogs');
        }
    }, [blogToEdit, navigate]);

    const handleBackClick = () => {
        navigate(-1);
    };

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
        setSuccess(false);

        // Convert tags string to array
        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');

        const blogData = {
            title: formData.title,
            content: formData.content,
            author: formData.author,
            tags: tagsArray
        };

        try {
            const response = await axios.put(
                `http://localhost:13417/api/v1/blogs/${blogToEdit._id}`,
                blogData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSuccess(true);

            // Navigate back after 2 seconds
            setTimeout(() => {
                navigate('/articles-blogs');
            }, 2000);

        } catch (err) {
            console.error('Error updating blog:', err);

            // Handle different error scenarios
            if (err.response) {
                // Server responded with error
                const status = err.response.status;
                const errorData = err.response.data;

                if (status === 400) {
                    // Validation error
                    setError(errorData.message || 'Invalid blog data. Please check all fields.');
                } else if (status === 404) {
                    // Blog not found
                    setError('Blog post not found. It may have been deleted.');
                } else if (status === 500) {
                    // Server error
                    setError('Server error. Please try again later.');
                } else {
                    setError(errorData.message || 'Failed to update blog post.');
                }
            } else if (err.request) {
                // Request made but no response
                setError('No response from server. Please check your connection.');
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!blogToEdit) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="create-blog-container">
            <div className="create-blog-header">
                <button onClick={handleBackClick} className="back-button-blog">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="create-blog-title">Edit Blog Post</h1>
            </div>

            <div className="create-blog-content">
                <form onSubmit={handleSubmit} className="blog-form">
                    {success && (
                        <div className="alert alert-success">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor" />
                            </svg>
                            Blog post updated successfully! Redirecting...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-error">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Blog Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter an engaging title for your blog post"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author" className="form-label">
                            Author Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Your name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content" className="form-label">
                            Content <span className="required">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Write your blog content here..."
                            rows="10"
                            required
                            disabled={loading}
                        />
                        <span className="form-hint">
                            {formData.content.length} characters
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags" className="form-label">
                            Tags <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="tech, coding, web development (comma-separated)"
                            required
                            disabled={loading}
                        />
                        <span className="form-hint">
                            Separate tags with commas. Example: tech, coding, javascript
                        </span>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="btn-secondary"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Updating...
                                </>
                            ) : (
                                'Update Blog'
                            )}
                        </button>
                    </div>
                </form>

                <div className="blog-preview-section">
                    <h2 className="preview-title">Preview</h2>
                    <div className="preview-card">
                        <div className="preview-header">
                            <h3 className="preview-blog-title">
                                {formData.title || 'Your blog title will appear here'}
                            </h3>
                            <p className="preview-author">
                                By {formData.author || 'Author Name'}
                            </p>
                        </div>

                        {formData.tags && (
                            <div className="preview-tags">
                                {formData.tags.split(',').map((tag, index) => (
                                    tag.trim() && (
                                        <span key={index} className="preview-tag">
                                            {tag.trim()}
                                        </span>
                                    )
                                ))}
                            </div>
                        )}

                        <div className="preview-content">
                            <p>{formData.content || 'Your blog content will appear here...'}</p>
                        </div>

                        {blogToEdit && (
                            <div style={{
                                marginTop: '1.5rem',
                                paddingTop: '1.5rem',
                                borderTop: '2px solid #f0f0f0',
                                fontSize: '0.85rem',
                                color: '#718096'
                            }}>
                                <p style={{ margin: '0.25rem 0' }}>
                                    <strong>Created:</strong> {new Date(blogToEdit.createdAt).toLocaleString()}
                                </p>
                                <p style={{ margin: '0.25rem 0' }}>
                                    <strong>Last Updated:</strong> {new Date(blogToEdit.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
