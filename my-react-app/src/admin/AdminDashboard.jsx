import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getAdminDashboard } from "../services/eventService";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setData(await getAdminDashboard());
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load admin dashboard.");
      }
    };

    loadDashboard();
  }, []);

  return (
    <AdminLayout
      title="Overview"
      subtitle="Track platform activity and jump into event, gallery, and hackathon management."
    >
      {error ? <p className="admin-feedback-error">{error}</p> : null}

      {data ? (
        <section className="admin-grid admin-stats">
          <div className="admin-stat-card glass-admin">
            <h3>Total Users</h3>
            <div className="admin-metric">{data.totalUsers}</div>
          </div>
          <div className="admin-stat-card glass-admin">
            <h3>Published Events</h3>
            <div className="admin-metric">{data.totalEvents}</div>
          </div>
          <div className="admin-stat-card glass-admin">
            <h3>Registrations</h3>
            <div className="admin-metric">{data.totalRegistrations}</div>
          </div>
          <div className="admin-stat-card glass-admin">
            <h3>Paid Tickets</h3>
            <div className="admin-metric">{data.paidRegistrations}</div>
          </div>
          <div className="admin-stat-card glass-admin">
            <h3>Gallery Items</h3>
            <div className="admin-metric">{data.galleryItems}</div>
          </div>
        </section>
      ) : null}

      <section className="admin-grid admin-actions" style={{ marginTop: "1.5rem" }}>
        <Link className="admin-action-link glass-admin" to="/admin/events">
          <strong>Manage Events</strong>
          <span>Create and publish new workshops or event listings.</span>
        </Link>
        <Link className="admin-action-link glass-admin" to="/admin/gallery">
          <strong>Manage Gallery</strong>
          <span>Add photo and video memories from previous events.</span>
        </Link>
        <Link className="admin-action-link glass-admin" to="/admin/hackathon">
          <strong>Edit Hackathon Page</strong>
          <span>Update the hero, prizes, timeline, sponsors, and more.</span>
        </Link>
      </section>
    </AdminLayout>
  );
}

export default AdminDashboard;
