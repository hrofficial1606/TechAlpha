import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import { getEvent } from "../services/eventService";
import { createPayPalOrder } from "../services/ticketService";
import { isAuthenticated } from "../utils/auth";
import "../styles/FeaturePages.css";

function WorkshopExplore() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setEvent(await getEvent(eventId));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load this event.");
      }
    };

    loadEvent();
  }, [eventId]);

  const openBrochure = () => {
    if (event?.brochureUrl) {
      window.open(event.brochureUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setError("Brochure is not available for this event yet.");
  };

  const startCheckout = async () => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { from: { pathname: `/workshops/${eventId}` } } });
      return;
    }

    try {
      setPaying(true);
      setError("");
      const order = await createPayPalOrder(eventId);
      window.location.href = order.approvalUrl;
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to start PayPal checkout.");
    } finally {
      setPaying(false);
    }
  };

  if (!event) {
    return (
      <div className="feature-shell">
        <Header />
        <SideMenu />
        <RightSideMenu />
        <div className="feature-stage">
          <div className="glass-card empty-state">
            <p className="feature-copy">{error || "Loading event..."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-shell">
      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="feature-stage">
        <div className="feature-hero">
          <div className="feature-kicker">EVENT DETAIL</div>
          <h1 className="feature-title">{event.title}</h1>
          <p className="feature-copy">
            Dive into the full event details, then move into checkout only when you are ready.
          </p>
        </div>

        <div className="detail-grid">
          <section className="glass-card">
            <img className="detail-media" src={event.imageUrl} alt={event.title} />

            <div className="event-actions" style={{ marginTop: "20px" }}>
              <button className="glass-btn" onClick={startCheckout} disabled={paying}>
                {paying ? "Redirecting..." : "Pay With PayPal"}
              </button>
              <button className="ghost-btn" onClick={openBrochure}>
                View Brochure
              </button>
            </div>

            <div className="feature-note">
              <div className="mini-badge">{event.category}</div>
              <div className="detail-price">
                Rs. {event.price}
                {event.oldPrice ? <span>Rs. {event.oldPrice}</span> : null}
              </div>
            </div>
          </section>

          <section className="glass-card">
            <h2>Event Overview</h2>
            <p className="feature-copy">{event.description}</p>

            <div className="detail-info-grid">
              <div className="detail-info-card">
                <h5>Category</h5>
                <p>{event.category}</p>
              </div>
              <div className="detail-info-card">
                <h5>Venue</h5>
                <p>{event.venue}</p>
              </div>
              <div className="detail-info-card">
                <h5>Starts</h5>
                <p>{new Date(event.startsAt).toLocaleString()}</p>
              </div>
              {event.endsAt ? (
                <div className="detail-info-card">
                  <h5>Ends</h5>
                  <p>{new Date(event.endsAt).toLocaleString()}</p>
                </div>
              ) : null}
            </div>

            {event.highlightText ? (
              <div className="feature-note" style={{ color: "#bde8ff" }}>
                <strong>Highlight:</strong> {event.highlightText}
              </div>
            ) : null}

            {event.certificateEnabled ? (
              <div className="feature-note" style={{ color: "#8af0c4" }}>
                Attendance certificates are enabled for this event.
              </div>
            ) : null}

            {error ? <p className="auth-error" style={{ marginTop: "1rem" }}>{error}</p> : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default WorkshopExplore;
