import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="surface-card quick-actions">
      <h3>Quick Actions</h3>
      <div className="quick-actions-buttons">
        <button className="quick-action-btn" onClick={() => navigate("/appointments")}>
          <span>📅</span> Book Appointment
        </button>
        <button className="quick-action-btn" onClick={() => navigate("/health-records")}>
          <span>📋</span> View Records
        </button>
        <button className="quick-action-btn" onClick={() => navigate("/messages")}>
          <span>💬</span> Message Doctor
        </button>
        <button className="quick-action-btn" onClick={() => navigate("/donor")}>
          <span>🩸</span> Register as Donor
        </button>
      </div>
      <p className="quick-actions-note">Book and manage your appointments from the Appointments page.</p>
    </div>
  );
}

export default QuickActions;
