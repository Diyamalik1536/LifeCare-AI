import { useState } from "react";
import { Link } from "react-router-dom";
import { getQueueInfo } from "../queue/queueUtils";
import "./RecentAppointments.css";

function formatDate(dateValue) {
  if (!dateValue) return "Date not set";
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(timeValue) {
  if (!timeValue) return "";
  const [hour, minute] = timeValue.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return timeValue;
  const parsed = new Date();
  parsed.setHours(hour, minute, 0, 0);
  return parsed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function RecentAppointments({ appointments }) {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...appointments].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const visible = showAll ? sorted : sorted.slice(0, 3);
  const statusClass = {
    Upcoming: "upcoming",
    Pending: "pending",
    Confirmed: "confirmed",
    Completed: "completed",
    Cancelled: "cancelled",
    Rejected: "rejected",
  };

  return (
    <div className="surface-card recent-appointments">
      <div className="section-title-row">
        <h3>Recent Appointments</h3>
        {appointments.length > 3 && (
          <button className="view-all-link" onClick={() => setShowAll((current) => !current)}>
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <div className="recent-list">
        {visible.map((appointment) => (
          <div className="recent-item" key={appointment.id}>
            <div className="recent-item-icon">👨‍⚕️</div>
            <div className="recent-item-info">
              <h4>{appointment.doctor}</h4>
              <p>{appointment.specialization}</p>
              {appointment.token != null && (
                <p style={{ color: "#1d6483", fontWeight: 600 }}>
                  🎟️ Token #{appointment.token}
                  {(() => {
                    const info = getQueueInfo(appointments, appointment);
                    if (!info) return "";
                    if (info.inConsultation) return " · Your turn now";
                    return info.ahead === 0 ? " · You are next" : ` · ${info.ahead} ahead`;
                  })()}
                </p>
              )}
            </div>
            <div className="recent-item-datetime">
              <span>📅 {formatDate(appointment.date)}</span>
              <span>🕐 {formatTime(appointment.time)}</span>
            </div>
            <span className={`status-pill ${statusClass[appointment.status] || "upcoming"}`}>
              {appointment.status}
            </span>
          </div>
        ))}
        {appointments.length === 0 && <p className="recent-empty">No appointments yet.</p>}
      </div>

      <Link to="/appointments" className="recent-manage-link">Manage all appointments →</Link>
    </div>
  );
}

export default RecentAppointments;
