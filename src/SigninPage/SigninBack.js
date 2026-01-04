import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SigninBack.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const SigninBack = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:13417/api/v1/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.toLowerCase(),
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the auth token
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back! Redirecting to dashboard...',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });

                // Navigate to dashboard after a short delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                // Handle error response
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: data.message || "Invalid credentials. Please try again.",
                    confirmButtonColor: '#599e9e',
                });
            }
        } catch (error) {
            console.error("Network Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Failed to connect to the server. Please check your connection and try again.',
                confirmButtonColor: '#599e9e',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signinback-container">
            <div className="signinback-background-overlay"></div>
            <div className="signinback-content">
                <div className="signinback-card">
                    <div className="signinback-header">
                        <h1 className="signinback-title">Welcome Back</h1>
                        <p className="signinback-subtitle">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="signinback-form">
                        <div className="signinback-form-group">
                            <label htmlFor="email" className="signinback-label">
                                <FontAwesomeIcon icon={faEnvelope} className="signinback-label-icon" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`signinback-input ${errors.email ? 'signinback-input-error' : ''}`}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="signinback-error-message">{errors.email}</p>
                            )}
                        </div>

                        <div className="signinback-form-group">
                            <label htmlFor="password" className="signinback-label">
                                <FontAwesomeIcon icon={faLock} className="signinback-label-icon" />
                                Password
                            </label>
                            <div className="signinback-password-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`signinback-input ${errors.password ? 'signinback-input-error' : ''}`}
                                    disabled={isLoading}
                                />
                                <span
                                    className="signinback-password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            {errors.password && (
                                <p className="signinback-error-message">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="signinback-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="signinback-loading">
                                    <span className="signinback-spinner"></span>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="signinback-footer">
                        <p className="signinback-footer-text">
                            Forgot your password?{" "}
                            <span
                                onClick={() => navigate("/forgot-password")}
                                className="signinback-link"
                            >
                                Reset it
                            </span>
                        </p>
                        <p className="signinback-footer-text">
                            Don't have an account?{" "}
                            <span
                                onClick={() => navigate("/signup-back")}
                                className="signinback-link"
                            >
                                Sign up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninBack;
