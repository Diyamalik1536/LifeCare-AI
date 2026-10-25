import { useNavigate } from "react-router-dom";
import "./HealthAlert.css";

function HealthAlert({ appointment }) {
  const navigate = useNavigate();

  return (
    <div className="health-alert">
      <div className="health-alert-icon">⚠️</div>

      <div className="health-alert-body">
        <h3>Important Health Alert</h3>
        <p>
          Your upcoming appointment with {appointment.doctor} is scheduled
          for {appointment.date} at {appointment.time}.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/appointments")}
        >
          View Appointment
        </button>
      </div>
    </div>
  );
}

export default HealthAlert;
