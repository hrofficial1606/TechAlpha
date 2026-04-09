import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import { getUserDashboard, getQrImageUrl } from "../services/ticketService";
import { clearAuthSession, clearPendingAuth, getStoredUser, updateStoredUser } from "../utils/auth";
import "../styles/FeaturePages.css";
import deadCoderAvatar from "../assets/avatar-dead-coder.jpg";
import urbanTrackerAvatar from "../assets/avatar-urban-tracker.jpg";
import nightDriftAvatar from "../assets/avatar-night-drift.jpg";
import warSmileAvatar from "../assets/avatar-war-smile.jpg";
import neonScoutAvatar from "../assets/avatar-neon-scout.jpg";
import angelOfDeathAvatar from "../assets/avatar-angel-of-death.jpg";
import resistanceAvatar from "../assets/avatar-resistance.jpg";
import protonAvatar from "../assets/avatar-proton.jpg";
import frogmanAvatar from "../assets/avatar-frogman.jpg";

const avatarOptions = [
  {
    name: "Dead Coder",
    image: deadCoderAvatar,
  },
  {
    name: "Urban Tracker",
    image: urbanTrackerAvatar,
  },
  {
    name: "Night Drift",
    image: nightDriftAvatar,
  },
  {
    name: "War Smile",
    image: warSmileAvatar,
  },
  {
    name: "Neon Scout",
    image: neonScoutAvatar,
  },
  {
    name: "Angel Of Death",
    image: angelOfDeathAvatar,
  },
  {
    name: "The Resistance",
    image: resistanceAvatar,
  },
  {
    name: "Proton Core",
    image: protonAvatar,
  },
  {
    name: "Frogman",
    image: frogmanAvatar,
  },
];

function MyTickets() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();
  const storedUser = getStoredUser();

  if (storedUser?.roleName === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setDashboard(await getUserDashboard());
        setSelectedAvatar(storedUser?.profileImage || avatarOptions[0].image);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load your profile.");
      }
    };

    loadDashboard();
  }, [storedUser]);

  const handleLogout = () => {
    clearAuthSession();
    clearPendingAuth();
    navigate("/login");
  };

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    updateStoredUser(currentUser => ({
      ...currentUser,
      profileImage: avatarUrl,
    }));
  };

  return (
    <div className="feature-shell">
      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="feature-stage">
        <div className="feature-hero">
          <div className="feature-kicker">USER PROFILE</div>
          <h1 className="feature-title">My Events Hub</h1>
          {dashboard ? (
            <>
              <div className="profile-hero-top">
                <div className="profile-avatar-wrap">
                  <img src={selectedAvatar || avatarOptions[0].image} alt={dashboard.user.fullName} className="profile-avatar-large" />
                </div>
                <div className="profile-hero-copy">
                  <p className="feature-copy">
                    {dashboard.user.fullName} | {dashboard.user.email}
                  </p>
                  <p className="feature-copy" style={{ color: "#8af0c4", marginTop: "10px" }}>
                    Email verified: {dashboard.user.verified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="profile-avatar-row">
                {avatarOptions.map(option => {
                  const avatarUrl = option.image;
                  return (
                    <button
                      key={option.name}
                      className={`profile-avatar-option${selectedAvatar === avatarUrl ? " active" : ""}`}
                      type="button"
                      onClick={() => handleAvatarSelect(avatarUrl)}
                      title={option.name}
                      aria-label={option.name}
                    >
                      <img src={avatarUrl} alt={option.name} className="profile-avatar-option-image" />
                      <span className="profile-avatar-option-label">{option.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="profile-hero-actions">
                <button className="ghost-btn profile-logout-btn" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p className="feature-copy">{error || "Loading profile..."}</p>
          )}
        </div>

        <div className="feature-grid profile-grid">
          <div className="feature-stack">
            <section className="glass-card">
              <h2>Overview</h2>
              <div className="profile-summary">
                <div className="profile-stat">
                  <div className="mini-badge">Bookings</div>
                  <h3 style={{ marginTop: "12px" }}>{dashboard?.registrations?.length || 0}</h3>
                </div>
                <div className="profile-stat">
                  <div className="mini-badge">Certificates</div>
                  <h3 style={{ marginTop: "12px" }}>{dashboard?.certificates?.length || 0}</h3>
                </div>
              </div>
            </section>

            <section className="glass-card">
              <h2>Reminder Highlights</h2>
              {dashboard?.highlights?.length ? dashboard.highlights.map((highlight) => (
                <div key={highlight.eventId} className="timeline-card">
                  <h4>{highlight.eventTitle}</h4>
                  <p className="timeline-copy">{highlight.message}</p>
                </div>
              )) : <div className="empty-state"><p className="feature-copy">No upcoming reminders yet.</p></div>}
            </section>

            <section className="glass-card">
              <h2>Notifications</h2>
              {dashboard?.notifications?.length ? dashboard.notifications.map((notification) => (
                <div key={notification.id} className="timeline-card">
                  <h4>{notification.title}</h4>
                  <p className="timeline-copy">{notification.message}</p>
                </div>
              )) : <div className="empty-state"><p className="feature-copy">No notifications yet.</p></div>}
            </section>
          </div>

          <div className="feature-stack">
            <section className="glass-card">
              <h2>Event History And Tickets</h2>
              {dashboard?.registrations?.length ? (
                <div className="ticket-grid">
                  {dashboard.registrations.map((registration) => (
                    <article key={registration.id} className="ticket-card">
                      <span className="mini-badge">{registration.status}</span>
                      <h3 style={{ marginTop: "14px" }}>{registration.eventTitle}</h3>
                      <p className="timeline-copy"><strong>Venue:</strong> {registration.venue}</p>
                      <p className="timeline-copy"><strong>Starts:</strong> {new Date(registration.startsAt).toLocaleString()}</p>
                      {(registration.status === "PAID" || registration.status === "ATTENDED") ? (
                        <img
                          src={getQrImageUrl(registration.id)}
                          alt={`QR for ${registration.eventTitle}`}
                          className="ticket-qr"
                        />
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : <div className="empty-state"><p className="feature-copy">You have not booked any events yet.</p></div>}
            </section>

            <section className="glass-card">
              <h2>Certificates</h2>
              {dashboard?.certificates?.length ? dashboard.certificates.map((certificate) => (
                <div key={certificate.registrationId} className="timeline-card">
                  <h4>{certificate.eventTitle}</h4>
                  <p className="timeline-copy">Certificate Code: {certificate.certificateCode}</p>
                  <p className="timeline-copy">
                    Issued: {certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleString() : "Pending"}
                  </p>
                </div>
              )) : <div className="empty-state"><p className="feature-copy">Certificates will appear here after attendance is marked by admin.</p></div>}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTickets;
