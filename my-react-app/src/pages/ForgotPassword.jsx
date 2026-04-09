import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initiateForgotPassword } from "../services/authService";
import { savePendingAuth } from "../utils/auth";
import "../styles/Login.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await initiateForgotPassword({ email });
      const pendingAuth = { email, mode: "forgot-password" };
      savePendingAuth(pendingAuth);
      navigate("/verify-otp", { state: pendingAuth });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to send password reset OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">Forgot Password</h2>

          <p className="auth-subtitle">
            Enter your email and we will send you an OTP to reset your password.
          </p>

          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send Reset OTP"}
          </button>

          <p className="login-register">
            Remembered it?
            <Link className="register-link" to="/login">
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
