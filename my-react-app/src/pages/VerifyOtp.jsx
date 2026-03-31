import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { verifyLoginOtp, verifyRegistrationOtp } from "../services/authService";
import { clearPendingAuth, getPendingAuth, saveAuthSession } from "../utils/auth";
import "../styles/Login.css";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const pendingAuth = useMemo(
    () => location.state || getPendingAuth(),
    [location.state]
  );

  const [form, setForm] = useState({
    email: pendingAuth?.email || "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!pendingAuth?.email || !pendingAuth?.mode) {
    return <Navigate to="/login" replace />;
  }

  const heading =
    pendingAuth.mode === "register" ? "Verify Registration OTP" : "Verify Login OTP";

  const helperText =
    pendingAuth.mode === "register"
      ? "Enter the OTP sent to your email to finish registration."
      : "Enter the OTP sent to your email to complete login.";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (pendingAuth.mode === "register") {
        await verifyRegistrationOtp(form);
        clearPendingAuth();
        navigate("/login", {
          replace: true,
          state: {
            email: form.email,
            message: "Registration verified. Please login to continue.",
          },
        });
        return;
      }

      const authResponse = await verifyLoginOtp(form);
      saveAuthSession(authResponse);
      clearPendingAuth();
      navigate(pendingAuth.redirectTo || "/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">{heading}</h2>
          <p className="auth-subtitle">{helperText}</p>

          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="login-input"
            name="otp"
            inputMode="numeric"
            maxLength={6}
            placeholder="6 digit OTP"
            value={form.otp}
            onChange={handleChange}
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="login-register">
            Need to start again?
            <Link className="register-link" to={pendingAuth.mode === "register" ? "/register" : "/login"}>
              Back
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
