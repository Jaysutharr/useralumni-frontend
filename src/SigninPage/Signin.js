import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import fi1 from "../assets/fimage1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Signin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: "",
    StreetAddress: "",
    City: "",
    State: "",
    Country: "India",
    Postalcode: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [userIdFromResponse, setUserIdFromResponse] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (validateForm()) {
      try {
        // const response = await fetch("http://13.235.100.222:13417/api/v1/auth/signin", {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              email: formData.email.toLowerCase(),
            }),
          }
        );


        if (response.ok) {
          const data = await response.json();
          const userId = data.userDetails.userId;
          console.log("userIdFromResponse:", userId);
          const token = data.token;  // assuming the backend sends a new token
          localStorage.setItem('authToken', token);
          // Set the userId in the state
          setUserIdFromResponse(userId);
          setShowPopup(true);
          updateProfile(userId);

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You will be redirected to the dashboard.',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);

          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorData.message || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Network Error:", error);

        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Failed to connect to the server. Please try again.',
        });
      }
    }
  };


  const updateProfile = async (userIdFromResponse) => {
    // Check if all required form fields are filled
    const { StreetAddress, City, State, Postalcode } = formData;
    if (!formData.StreetAddress || !formData.City || !formData.State || !formData.Postalcode) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    // Check if userIdFromResponse is valid
    if (!userIdFromResponse) {
      alert("User ID is missing. Please log in first.");
      return;
    }

    try {
      // Log the form data and userId being submitted
      console.log("FormData being submitted:", formData);
      console.log("UserID being used:", userIdFromResponse);

      // Make the API call using the correct userIdFromResponse
      // const response = await fetch(`http://13.235.100.222:13417/api/v1/updateuser/${userIdFromResponse}`, {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/updateuser/${userIdFromResponse}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ StreetAddress, City, State, Postalcode }),
        }
      );


      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log("Profile Updated:", data);

        // Check for success status from backend
        if (data.success === true) {
          alert(data.message || "Profile updated successfully!");
        } else {
          alert(data.message || "Failed to update profile. Please try again.");
        }
        setShowPopup(false); // Close popup on success
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData);
        alert(errorData.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to connect to the server. Please try again.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleClickSign = () => {
    navigate("/signup-back");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="signin-wrapper col-sm-6">
            <h2>Sign in</h2>
            <h5>Sign in into your account</h5>
            <div className="signin-form-wrapper">
              <form onSubmit={handleSubmit} className="signin-form">
                <div className="signin-form-group">
                  <label htmlFor="email" className="signin-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="signin-form-input"
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>
                <div className="signin-form-group">
                  <label htmlFor="password" className="signin-form-label">
                    Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="signin-form-input1"
                    />
                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </span>
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit" className="signin-button">
                  Sign in
                </button>

                <div className="signin-or-container">
                  <hr className="signin-line" />
                  <span className="signin-or-text">OR</span>
                  <hr className="signin-line" />
                </div>
                <button type="button" className="google-signin-button">
                  <span className="google">G</span> Continue with Google
                </button>
              </form>
              <div className="signin-footer1">
                <p className="signin-forgot1">
                  Forgot password?{" "}
                  <span
                    onClick={() => navigate("/forgot-password")}
                    className="signin-forgot-password1"
                    style={{ cursor: "pointer" }}
                  >
                    Reset
                  </span>
                </p>
                <p className="signin-sign1">
                  Don't have an account?{" "}
                  <span onClick={handleClickSign} className="signin-sign-up1">
                    Sign up
                  </span>
                </p>
                <p className="terms">
                  By continuing, you agree to our{" "}
                  <span
                    onClick={() => handleNavigation("/terms")}
                    className="link"
                    style={{ cursor: "pointer", color: "rgb(89,158,158)" }}
                  >
                    Terms of Service
                  </span>
                  .<br />
                  Read our{" "}
                  <span
                    onClick={() => handleNavigation("/privacy")}
                    className="link"
                    style={{ cursor: "pointer", color: "rgb(89,158,158)" }}
                  >
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="background-container-sigin col-sm-6">
            <img src={fi1} alt="" />
          </div>
        </div>
      </div>
      {/* Popup (Displayed when form is submitted) */}
      {/* Popup (Displayed when form is submitted) */}
      {/* Popup (Displayed when form is submitted) */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>Set Up Your Profile</h2>

            {/* Profile Image Upload Placeholder - Centered */}
            <div className="upload-container">
              <div className="upload-circle">
                <p>Upload Profile image</p>
              </div>
            </div>

            {/* Split the content into left and right sections */}
            <div className="left-side">
              {/* Address Form (Street Address, City, State, Country, Postal Code) */}
              <form>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="StreetAddress"
                    value={formData.StreetAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="State"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <select
                    name="country"
                    value={formData.Country}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    {/* Add other countries as needed */}
                  </select>
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    name="Postalcode"
                    value={formData.Postalcode}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>

            <div className="right-side">
              {/* Personal Info Form (Full Name, Email, Password) */}
              <form>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    disabled
                  />
                </div>

              </form>


              <button
                className="save-btn"
                type="button"
                onClick={() => updateProfile(userIdFromResponse)} // Call the updateProfile function
              >
                Save
              </button>
            </div>
          </div>
        </div>

      )}


    </>
  );
};

export default Signin;
