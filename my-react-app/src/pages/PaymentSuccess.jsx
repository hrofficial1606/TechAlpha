import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { capturePayPalOrder, getQrImageUrl } from "../services/ticketService";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [registration, setRegistration] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const orderId = searchParams.get("token");

    if (!orderId) {
      setError("Missing PayPal order token.");
      return;
    }

    const completePayment = async () => {
      try {
        setRegistration(await capturePayPalOrder(orderId));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to capture PayPal payment.");
      }
    };

    completePayment();
  }, [searchParams]);

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Payment Status</h2>

          {registration ? (
            <>
              <p className="auth-success">Payment completed for {registration.eventTitle}.</p>
              <img
                src={getQrImageUrl(registration.id)}
                alt="Event QR"
                style={{ width: "180px", alignSelf: "center", background: "white", padding: "0.5rem", borderRadius: "14px" }}
              />
              <Link className="register-link" to="/profile">
                Open my profile
              </Link>
            </>
          ) : (
            <p className={error ? "auth-error" : "auth-subtitle"}>
              {error || "Finalizing your PayPal payment..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
