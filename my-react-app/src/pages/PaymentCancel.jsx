import { Link } from "react-router-dom";

function PaymentCancel() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Payment Cancelled</h2>
          <p className="auth-subtitle">Your PayPal checkout was cancelled. You can go back and try again anytime.</p>
          <Link className="register-link" to="/workshops">
            Return to workshops
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancel;
