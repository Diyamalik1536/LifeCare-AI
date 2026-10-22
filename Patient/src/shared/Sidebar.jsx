import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "⌂", end: true },
  { to: "/appointments", label: "Appointments", icon: "▦" },
  { to: "/health-records", label: "Health Records", icon: "▤" },
  { to: "/messages", label: "Messages", icon: "✉" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img
          src="/logo.png"
          alt="LifeCare AI Logo"
          className="sidebar-brand-logo"
        />
        <span className="sidebar-brand-name">
          LifeCare<span className="sidebar-brand-accent"> AI</span>
        </span>
      </div>

      <p className="sidebar-section-label">PATIENT PORTAL</p>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-link-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">U</div>
        <div className="sidebar-user-info">
          <p className="sidebar-user-name">User</p>
          <p className="sidebar-user-role">Patient</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;