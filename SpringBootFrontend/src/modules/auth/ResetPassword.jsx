import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [params] = useSearchParams();
    const token = params.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing token.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("token is", token);

        if (!token) {
            setError("Reset token is missing or invalid.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        setError("");
        setMessage("");

        try {
            const response = await axios.post("http://localhost:8080/api/otp/reset-password", {
                token,
                emailId: email,
                newPassword: password,
            });
            if (response.data === "Password reset successfully") {
                setMessage(response.data || "Password reset successful.");
                setTimeout(() => {
                    navigate("/login/user");  // Redirect to login page
                }, 2000);
            } else if(response.data === "Token Expired") {
                setError(response.data || "Invalid or expired token");
            }
            else if(response.data === "Invalid email") {
                setError(response.data || "Invalid Email");
            }

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);

        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Reset Password</h2>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {message && <div className="alert alert-success">{message}</div>}

                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                                <label className="form-label">EmailID</label>
                                <div className="input-group">
                                    <input 
                                        type="email"                                   
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm New Password</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Resetting..." : "Set New Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;