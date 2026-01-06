import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const API_BASE_URL =
    (process.env.REACT_APP_API_URL || "http://localhost:13417").replace(/\/$/, "");

const EditDonation = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL

    const [formData, setFormData] = useState({
        CampaignTitle: "",
        CampaignDescription: "",
        Categories: "Education",
        GoalAmount: "",
        PaymentMethods: "",
        Paymentdetail: "",
        AllowCommenting: true
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = "#f5f6fc";
        fetchDonationDetails();
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [id]);

    const fetchDonationDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/getdonationsbyid/${id}`);

            const data = response.data;
            setFormData({
                CampaignTitle: data.CampaignTitle || "",
                CampaignDescription: data.CampaignDescription || "",
                Categories: data.Categories || "Education",
                GoalAmount: data.GoalAmount || "",
                PaymentMethods: data.PaymentMethods || "",
                Paymentdetail: data.Paymentdetail || "",
                AllowCommenting: data.AllowCommenting === "true" || data.AllowCommenting === true
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching donation details:", err);
            setError("Failed to load donation details. It might have been deleted.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError("");

        const payload = {
            ...formData,
            AllowCommenting: formData.AllowCommenting.toString()
        };

        try {
            const response = await axios.put(`${API_BASE_URL}/api/v1/updatedonations/${id}`, payload);

            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/donation");
                }, 2000);
            }
        } catch (err) {
            console.error("Error updating donation:", err);
            if (err.response) {
                if (err.response.status === 404) {
                    setError("Donation not found. It may have been deleted.");
                } else {
                    setError("Server error. Please try again later.");
                }
            } else {
                setError("Network error. Please check your connection.");
            }
        } finally {
            setUpdating(false);
        }
    };

    const containerStyle = {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
    };

    const headerStyle = {
        fontSize: "28px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "30px",
        textAlign: "center"
    };

    const formGroupStyle = {
        marginBottom: "20px"
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontWeight: "500",
        color: "#555"
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "16px",
        boxSizing: "border-box",
        transition: "border 0.3s"
    };

    const buttonStyle = {
        width: "100%",
        padding: "14px",
        backgroundColor: "#58a4b0",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: updating ? "not-allowed" : "pointer",
        opacity: updating ? 0.7 : 1,
        marginTop: "20px"
    };

    if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading details...</div>;

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Edit Fundraiser</h2>

            {success ? (
                <div style={{ padding: "20px", textAlign: "center", color: "green", background: "#e8f5e9", borderRadius: "8px" }}>
                    <h3>🎉 Campaign Updated Successfully!</h3>
                    <p>Redirecting to dashboard...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Campaign Title</label>
                        <input
                            type="text"
                            name="CampaignTitle"
                            value={formData.CampaignTitle}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Category</label>
                        <select
                            name="Categories"
                            value={formData.Categories}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="Education">Education</option>
                            <option value="Environment">Environment</option>
                            <option value="Health">Health</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Charity">Charity</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Goal Amount (₹)</label>
                        <input
                            type="number"
                            name="GoalAmount"
                            value={formData.GoalAmount}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Description</label>
                        <textarea
                            name="CampaignDescription"
                            value={formData.CampaignDescription}
                            onChange={handleChange}
                            required
                            style={{ ...inputStyle, minHeight: "150px" }}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Payment Methods Accepted</label>
                        <input
                            type="text"
                            name="PaymentMethods"
                            value={formData.PaymentMethods}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Payment Details</label>
                        <textarea
                            name="Paymentdetail"
                            value={formData.Paymentdetail}
                            onChange={handleChange}
                            style={{ ...inputStyle, minHeight: "80px" }}
                        />
                    </div>

                    <div style={{ ...formGroupStyle, display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                            type="checkbox"
                            name="AllowCommenting"
                            checked={formData.AllowCommenting}
                            onChange={handleChange}
                            style={{ width: "20px", height: "20px" }}
                        />
                        <label style={{ margin: 0, fontWeight: "500", color: "#555" }}>Allow people to comment on this campaign</label>
                    </div>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                    <button type="submit" style={buttonStyle}>
                        {updating ? "Updating..." : "Update Campaign"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/donation')}
                        style={{
                            ...buttonStyle,
                            backgroundColor: 'transparent',
                            color: '#555',
                            border: '1px solid #ddd',
                            marginTop: '10px'
                        }}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditDonation;
