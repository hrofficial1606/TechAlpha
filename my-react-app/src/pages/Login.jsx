import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { initiateLogin } from "../services/authService";
import { savePendingAuth } from "../utils/auth";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const successMessage = location.state?.message || "";

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await initiateLogin(form);

      const pendingAuth = {
        email: form.email,
        mode: "login",
        redirectTo,
      };

      savePendingAuth(pendingAuth);
      navigate("/verify-otp", { state: pendingAuth });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to send login OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">Login To Continue</h2>

          <p className="auth-subtitle">
            Browse freely on TechAlpha. Login is only needed when you open a protected feature.
          </p>

          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {successMessage ? <p className="auth-success">{successMessage}</p> : null}
          {error ? <p className="auth-error">{error}</p> : null}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send Login OTP"}
          </button>

          <p className="login-register">
            New here?
            <Link className="register-link" to="/register">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
