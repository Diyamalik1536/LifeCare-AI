import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

function QuickActions({ addAppointment }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = (e) => {
    e.preventDefault();
    if (!doctor || !date || !time) return;

    addAppointment({ doctor, specialization, date, time });

    setDoctor("");
    setSpecialization("");
    setDate("");
    setTime("");
    setShowForm(false);
  };

  return (
    <div className="surface-card quick-actions">
      <h3>Quick Actions</h3>

      <div className="quick-actions-buttons">
        <button
          className="quick-action-btn"
          onClick={() => navigate("/appointments")}
        >
          <span>📅</span> Book Appointment
        </button>
        <button
          className="quick-action-btn"
          onClick={() => navigate("/health-records")}
        >
          <span>📋</span> View Records
        </button>
        <button
          className="quick-action-btn"
          onClick={() => navigate("/messages")}
        >
          <span>💬</span> Message Doctor
        </button>
      </div>

      {showForm && (
        <form className="quick-book-form" onSubmit={handleBook}>
          <input
            type="text"
            placeholder="Doctor name"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <div className="quick-book-row">
            <input
              type="text"
              placeholder="Date (e.g. 25 Aug)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Time (e.g. 3:00 PM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}

export default QuickActions;
