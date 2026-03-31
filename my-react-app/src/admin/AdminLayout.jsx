import { NavLink, useNavigate } from "react-router-dom";
import { clearAuthSession, clearPendingAuth } from "../utils/auth";
import "../styles/AdminPanel.css";

const navItems = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/hackathon", label: "Hackathon" },
];

function AdminLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    clearPendingAuth();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <p className="admin-eyebrow">TechAlpha</p>
          <h1>Admin Panel</h1>
          <p>Control events, media, and hackathon content from one workspace.</p>
        </div>

        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) => `admin-nav-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout-btn" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header glass-admin">
          <div>
            <p className="admin-eyebrow">Management Console</p>
            <h2>{title}</h2>
            {subtitle ? <p className="admin-subtitle">{subtitle}</p> : null}
          </div>

          <button className="admin-logout-btn header" type="button" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
