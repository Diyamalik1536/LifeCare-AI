import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "🏠", end: true },
  { to: "/appointments", label: "Appointments", icon: "📅" },
  { to: "/health-records", label: "Health Records", icon: "📋" },
  { to: "/messages", label: "Messages", icon: "💬" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">❤️</span>
        <span>LifeCare AI</span>
      </div>

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
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">U</div>
        <div>
          <p className="sidebar-user-name">User</p>
          <p className="sidebar-user-role">Patient</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
