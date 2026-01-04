import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProfileDialog = ({ show, handleClose, userId, initialProfileData }) => {
  const [profileData, setProfileData] = useState({
    fullName: initialProfileData?.fullName || "",
    email: initialProfileData?.email || "",
    password: initialProfileData?.password || "",
    streetAddress: initialProfileData?.streetAddress || "",
    city: initialProfileData?.city || "",
    state: initialProfileData?.state || "",
    country: initialProfileData?.country || "",
    postalCode: initialProfileData?.postalCode || "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Store the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare form data for the request
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", profileData.fullName);
    formData.append("email", profileData.email);
    formData.append("password", profileData.password);
    formData.append("streetAddress", profileData.streetAddress);
    formData.append("city", profileData.city);
    formData.append("state", profileData.state);
    formData.append("country", profileData.country);
    formData.append("postalCode", profileData.postalCode);
    if (image) {
      formData.append("profileImage", image); // Append image if uploaded
    }

    try {
      // const response = await fetch('http://13.235.100.222:13417/api/v1/user/updateProfile', {
      const response = await fetch(process.env.REACT_APP_LOCALURL+'/api/v1/user/updateProfile', {
        method: 'POST',
        body: formData, // Send form data with userId and other details
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      console.log('Profile updated successfully', data);
    } catch (error) {
      console.error('Error during profile update:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set Up Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="text-center mb-4">
            <label htmlFor="imageUpload" className="image-upload-label">
              <div className="image-placeholder">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Profile Preview"
                    width="100"
                    height="100"
                  />
                ) : (
                  <span>Upload Profile Image</span>
                )}
              </div>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="d-none"
            />
          </div>

          <div className="row">
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  disabled
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={profileData.password}
                  disabled
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formStreetAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={profileData.streetAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={profileData.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group controlId="formPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={profileData.postalCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit" block>
            Save Profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileDialog;
