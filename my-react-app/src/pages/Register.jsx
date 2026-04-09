import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initiateRegistration } from "../services/authService";
import { savePendingAuth } from "../utils/auth";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await initiateRegistration(form);

      const pendingAuth = {
        email: form.email,
        mode: "register",
      };

      savePendingAuth(pendingAuth);
      navigate("/verify-otp", { state: pendingAuth });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to register right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2 className="register-title">Create Your Account</h2>

          <p className="auth-subtitle">
            Register once with your email and mobile number, verify your email OTP, and then login directly with your password.
          </p>

          <input
            className="register-input"
            name="fullName"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="mobileNumber"
            type="tel"
            placeholder="Mobile number"
            autoComplete="tel"
            value={form.mobileNumber}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Register With OTP"}
          </button>

          <p className="login-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
