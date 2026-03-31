import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import { getEvents } from "../services/eventService";
import { isAuthenticated } from "../utils/auth";
import "../styles/FeaturePages.css";

function Workshops() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setEvents(await getEvents());
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load events.");
      }
    };

    loadEvents();
  }, []);

  const handleProtectedAction = (eventId) => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { from: { pathname: `/workshops/${eventId}` } } });
      return;
    }

    navigate(`/workshops/${eventId}`);
  };

  return (
    <div className="feature-shell">
      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="feature-stage">
        <div className="feature-hero">
          <div className="feature-kicker">EVENT COLLECTION</div>
          <h1 className="feature-title">Workshops And Experiences</h1>
          <p className="feature-copy">
            Explore every TechAlpha event in one centered stage. Browse freely, open details, and only login when you are ready to book.
          </p>
          {error ? <p className="auth-error" style={{ marginTop: "14px" }}>{error}</p> : null}
        </div>

        <div className="feature-grid">
          {events.map((event) => (
            <article key={event.id} className="glass-card event-card">
              <div>
                <span className="event-badge">{event.category}</span>
                <h2 style={{ marginTop: "18px" }}>{event.title}</h2>
                <p className="feature-copy" style={{ marginTop: "10px" }}>{event.description}</p>
                <div className="event-price">Rs. {event.price}</div>
                <div className="event-meta">
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Starts:</strong> {new Date(event.startsAt).toLocaleString()}</p>
                  {event.highlightText ? <p><strong>Highlight:</strong> {event.highlightText}</p> : null}
                </div>
              </div>

              <div className="event-actions">
                <button className="ghost-btn" onClick={() => navigate(`/workshops/${event.id}`)}>
                  Explore
                </button>
                <button className="glass-btn" onClick={() => handleProtectedAction(event.id)}>
                  Buy Ticket
                </button>
              </div>
            </article>
          ))}
        </div>

        {!events.length && !error ? (
          <div className="glass-card empty-state" style={{ marginTop: "22px" }}>
            <h3>No events live yet</h3>
            <p className="feature-copy">Once your admin publishes events, they will appear here in the same TechAlpha style.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Workshops;
