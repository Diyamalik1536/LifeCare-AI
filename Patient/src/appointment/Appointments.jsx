import { useMemo, useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./Appointments.css";

const DOCTORS = [
  { name: "Dr. Rahul Sharma", specialization: "General Physician" },
  { name: "Dr. Priya Mehta", specialization: "Dermatologist" },
  { name: "Dr. Amit Verma", specialization: "Cardiologist" },
  { name: "Dr. Neha Kapoor", specialization: "Pediatrician" },
  { name: "Dr. Arjun Singh", specialization: "Orthopedic" },
];

const TIME_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
const FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

function formatDate(dateValue) {
  if (!dateValue) return "Date not selected";
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeValue) {
  if (!timeValue) return "";
  const [hour, minute] = timeValue.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return timeValue;
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function getLocalDateString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function Appointments({ appointments, addAppointment, updateAppointment, cancelAppointment }) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    patientName: "",
    doctor: "",
    specialization: "",
    date: "",
    time: "",
    mode: "Hospital Visit",
  });
  const [editForm, setEditForm] = useState({ date: "", time: "" });

  const visibleAppointments = useMemo(() => {
    const filtered = activeFilter === "All"
      ? appointments
      : appointments.filter((appointment) => appointment.status === activeFilter);
    return [...filtered].sort((a, b) => {
      if (a.status === "Cancelled" && b.status !== "Cancelled") return 1;
      if (b.status === "Cancelled" && a.status !== "Cancelled") return -1;
      return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
    });
  }, [appointments, activeFilter]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === "doctor") {
      const selectedDoctor = DOCTORS.find((doctor) => doctor.name === value);
      setForm((current) => ({
        ...current,
        doctor: value,
        specialization: selectedDoctor?.specialization || "",
      }));
    }
  };

  const resetForm = () => {
    setForm({ patientName: "", doctor: "", specialization: "", date: "", time: "", mode: "Hospital Visit" });
  };

  const handleBook = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (form.date < getLocalDateString()) {
      setError("Please choose today or a future date.");
      return;
    }

    const slotTaken = appointments.some((appointment) =>
      appointment.status !== "Cancelled" &&
      appointment.status !== "Completed" &&
      appointment.doctor === form.doctor &&
      appointment.date === form.date &&
      appointment.time === form.time
    );

    if (slotTaken) {
      setError("This doctor already has an appointment at that time. Please choose another slot.");
      return;
    }

    addAppointment({
      ...form,
      patientName: form.patientName.trim() || "User",
    });
    resetForm();
    setShowBookingForm(false);
    setActiveFilter("All");
    setMessage("Appointment request submitted successfully. Its status is Pending.");
  };

  const startReschedule = (appointment) => {
    setEditingId(appointment.id);
    setEditForm({ date: appointment.date, time: appointment.time });
    setError("");
    setMessage("");
  };

  const handleReschedule = (event, appointment) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (editForm.date < getLocalDateString()) {
      setError("Please choose today or a future date.");
      return;
    }

    const slotTaken = appointments.some((other) =>
      other.id !== appointment.id &&
      other.status !== "Cancelled" &&
      other.status !== "Completed" &&
      other.doctor === appointment.doctor &&
      other.date === editForm.date &&
      other.time === editForm.time
    );

    if (slotTaken) {
      setError("This doctor already has an appointment at that time. Please choose another slot.");
      return;
    }

    updateAppointment(appointment.id, { ...editForm, status: "Pending" });
    setEditingId(null);
    setMessage("Appointment rescheduled. Its status is now Pending confirmation.");
  };

  const handleCancel = (appointment) => {
    const shouldCancel = window.confirm(`Cancel your appointment with ${appointment.doctor}?`);
    if (!shouldCancel) return;
    cancelAppointment(appointment.id);
    setMessage("Appointment cancelled.");
    setError("");
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title="Appointments" />

        <section className="appointments-page">
          <div className="page-header appt-page-header">
            <div>
              <h1>Smart Appointment Booking</h1>
              <p>Book, view, reschedule and manage your doctor appointments.</p>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setShowBookingForm((current) => !current);
                setError("");
                setMessage("");
              }}
            >
              {showBookingForm ? "Close Form" : "+ Book Appointment"}
            </button>
          </div>

          {message && <div className="appt-feedback success" role="status">{message}</div>}
          {error && <div className="appt-feedback error" role="alert">{error}</div>}

          {showBookingForm && (
            <form className="surface-card book-form" onSubmit={handleBook}>
              <div className="form-heading">
                <div>
                  <h2>Book a new appointment</h2>
                  <p>Choose a doctor and an available date and time.</p>
                </div>
                <span className="form-step">NEW BOOKING</span>
              </div>

              <div className="booking-grid">
                <label>
                  Patient name
                  <input
                    type="text"
                    value={form.patientName}
                    onChange={(event) => setField("patientName", event.target.value)}
                    placeholder="Enter patient name"
                    maxLength={80}
                  />
                </label>

                <label>
                  Select doctor <span className="required-mark">*</span>
                  <select
                    value={form.doctor}
                    onChange={(event) => setField("doctor", event.target.value)}
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {DOCTORS.map((doctor) => (
                      <option key={doctor.name} value={doctor.name}>{doctor.name} — {doctor.specialization}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Appointment date <span className="required-mark">*</span>
                  <input
                    type="date"
                    value={form.date}
                    min={getLocalDateString()}
                    onChange={(event) => setField("date", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Time slot <span className="required-mark">*</span>
                  <select value={form.time} onChange={(event) => setField("time", event.target.value)} required>
                    <option value="">Choose a time</option>
                    {TIME_SLOTS.map((time) => <option key={time} value={time}>{formatTime(time)}</option>)}
                  </select>
                </label>

                <label className="booking-mode-field">
                  Consultation mode <span className="required-mark">*</span>
                  <select value={form.mode} onChange={(event) => setField("mode", event.target.value)} required>
                    <option>Hospital Visit</option>
                    <option>Online Consultation</option>
                  </select>
                </label>
              </div>

              <div className="booking-form-footer">
                <p><span className="required-mark">*</span> Required fields</p>
                <button className="btn btn-primary" type="submit">Confirm Booking</button>
              </div>
            </form>
          )}

          <div className="appointment-summary-row">
            <div>
              <h2>Your appointments</h2>
              <p>{appointments.length} appointment{appointments.length === 1 ? "" : "s"} saved</p>
            </div>
            <div className="filter-row" aria-label="Filter appointments">
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                  {filter === "All" ? ` (${appointments.length})` : ` (${appointments.filter((appointment) => appointment.status === filter).length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="appointments-list">
            {visibleAppointments.map((appointment) => (
              <article className="surface-card appt-card" key={appointment.id}>
                <div className="appt-main">
                  <div className="doctor-icon" aria-hidden="true">👨‍⚕️</div>
                  <div className="appt-info">
                    <h3>{appointment.doctor}</h3>
                    <p>{appointment.specialization || "General Consultation"}</p>
                    <div className="appt-meta">
                      <span>📅 {formatDate(appointment.date)}</span>
                      <span>🕒 {formatTime(appointment.time)}</span>
                      <span>📍 {appointment.mode || "Hospital Visit"}</span>
                    </div>
                    {appointment.patientName && appointment.patientName !== "User" && (
                      <p className="patient-name">Patient: {appointment.patientName}</p>
                    )}
                  </div>
                  <span className={`status-pill ${String(appointment.status).toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>

                {editingId === appointment.id ? (
                  <form className="reschedule-form" onSubmit={(event) => handleReschedule(event, appointment)}>
                    <label>
                      New date
                      <input type="date" min={getLocalDateString()} value={editForm.date} onChange={(event) => setEditForm((current) => ({ ...current, date: event.target.value }))} required />
                    </label>
                    <label>
                      New time
                      <select value={editForm.time} onChange={(event) => setEditForm((current) => ({ ...current, time: event.target.value }))} required>
                        {TIME_SLOTS.map((time) => <option key={time} value={time}>{formatTime(time)}</option>)}
                      </select>
                    </label>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditingId(null)}>Keep Current</button>
                  </form>
                ) : (
                  ["Pending", "Confirmed", "Upcoming"].includes(appointment.status) && (
                    <div className="appt-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => startReschedule(appointment)}>Reschedule</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleCancel(appointment)}>Cancel Appointment</button>
                    </div>
                  )
                )}
              </article>
            ))}

            {visibleAppointments.length === 0 && (
              <div className="surface-card appt-empty">
                <div className="empty-calendar">📅</div>
                <h3>No {activeFilter === "All" ? "appointments" : activeFilter.toLowerCase() + " appointments"} found</h3>
                <p>Book an appointment with a doctor to see it listed here.</p>
                {activeFilter === "All" && (
                  <button type="button" className="btn btn-primary" onClick={() => setShowBookingForm(true)}>Book Appointment</button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Appointments;
