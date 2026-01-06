import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Reuse existing CSS or generic styles. 
// Assuming CreateNews.css exists and can be reused or we create inline/new css. 
// For "UX good", I'll use inline styles with a clean layout similar to NewsRead update.

const CreateDonation = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        CampaignTitle: "",
        CampaignDescription: "",
        Categories: "Education", // Default
        GoalAmount: "",
        PaymentMethods: "Credit Card, PayPal", // Default or typical
        Paymentdetail: "",
        AllowCommenting: true,
        userId: "85201" // Hardcoded as per request
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = "#f5f6fc";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Auto-generate DonationId
        const payload = {
            ...formData,
            DonationId: "D" + Date.now(),
            AllowCommenting: formData.AllowCommenting.toString() // Schema asks for string "true" in example
        };

        try {
            const baseUrl = (process.env.REACT_APP_API_URL || "http://localhost:13417").replace(/\/$/, "");

            const response = await axios.post(
                `${baseUrl}/api/v1/createdonations`,
                payload
            );

            if (response.status === 201 || response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/donation"); // Go back to donation home
                }, 2000);
            }
        } catch (err) {
            console.error("Error creating donation:", err);
            setError("Failed to create donation campaign. Please try again.");
        } finally {
            setLoading(false);
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
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        marginTop: "20px"
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Start a Fundraiser</h2>

            {success ? (
                <div style={{ padding: "20px", textAlign: "center", color: "green", background: "#e8f5e9", borderRadius: "8px" }}>
                    <h3>🎉 Campaign Created Successfully!</h3>
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
                            placeholder="e.g. Help Save the Ocean"
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
                            placeholder="e.g. 50000"
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
                            placeholder="Tell your story..."
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
                        <label style={labelStyle}>Payment Details (UPI/Bank/PayPal)</label>
                        <textarea
                            name="Paymentdetail"
                            value={formData.Paymentdetail}
                            onChange={handleChange}
                            style={{ ...inputStyle, minHeight: "80px" }}
                            placeholder="e.g. VPA: name@upi"
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
                        {loading ? "Creating..." : "Create Campaign"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateDonation;
