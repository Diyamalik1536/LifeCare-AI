import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecentAppointments.css";

function RecentAppointments({ appointments }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? appointments : appointments.slice(0, 3);

  const statusClass = {
    Upcoming: "upcoming",
    Completed: "completed",
    Cancelled: "cancelled",
  };

  return (
    <div className="surface-card recent-appointments">
      <div className="section-title-row">
        <h3>Recent Appointments</h3>
        {appointments.length > 3 && (
          <button
            className="view-all-link"
            onClick={() => setShowAll((s) => !s)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <div className="recent-list">
        {visible.map((a) => (
          <div className="recent-item" key={a.id}>
            <div className="recent-item-icon">👨‍⚕️</div>

            <div className="recent-item-info">
              <h4>{a.doctor}</h4>
              <p>{a.specialization}</p>
            </div>

            <div className="recent-item-datetime">
              <span>📅 {a.date}</span>
              <span>🕐 {a.time}</span>
            </div>

            <span className={`status-pill ${statusClass[a.status]}`}>
              {a.status}
            </span>
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="recent-empty">No appointments yet.</p>
        )}
      </div>

      <Link to="/appointments" className="recent-manage-link">
        Manage all appointments →
      </Link>
    </div>
  );
}

export default RecentAppointments;
