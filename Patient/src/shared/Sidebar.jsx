import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "⌂", end: true },
  { to: "/appointments", label: "Appointments", icon: "▦" },
  { to: "/health-records", label: "Health Records", icon: "▤" },
  { to: "/messages", label: "Messages", icon: "✉" },
];

// Must match the breakpoint used in Sidebar.css / index.css
const DESKTOP_MIN_WIDTH = 901;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the drawer whenever the page changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // While the drawer is open: lock page scroll, close on Escape,
  // and close automatically if the window grows to desktop size
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <>
      {/* Top bar - only visible on tablets and phones */}
      <div className="mobile-topbar">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="patient-sidebar"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
        <img src="/logo.png" alt="" className="mobile-topbar-logo" />
        <span className="mobile-topbar-title">
          LifeCare<span className="sidebar-brand-accent"> AI</span>
        </span>
      </div>

      {/* Dark overlay behind the open drawer */}
      <div
        className={`sidebar-overlay${isOpen ? " sidebar-overlay-visible" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="patient-sidebar"
        className={`sidebar${isOpen ? " open" : ""}`}
      >
        <div className="sidebar-brand">
          <img
            src="/logo.png"
            alt="LifeCare AI Logo"
            className="sidebar-brand-logo"
          />
          <span className="sidebar-brand-name">
            LifeCare<span className="sidebar-brand-accent"> AI</span>
          </span>

          <button
            type="button"
            className="sidebar-close-btn"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
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
    </>
  );
}

export default Sidebar;
