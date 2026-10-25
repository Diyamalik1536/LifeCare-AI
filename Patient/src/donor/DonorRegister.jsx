import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import { addDonorRequest } from "../store/donorsSlice";
import "../appointment/Appointments.css"; // reuse the same card / form styles

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EMPTY_FORM = { name: "", bloodType: "", age: "", location: "", contact: "" };

function DonorRegister() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.donors.requests);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState("");

  const setField = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addDonorRequest({
        name: form.name.trim(),
        bloodType: form.bloodType,
        age: Number(form.age),
        location: form.location.trim(),
        contact: form.contact.trim(),
        availability: "Available",
        lastDonation: null,
        eligible: true,
        distanceKm: Math.round((Math.random() * 20 + 0.5) * 10) / 10,
      })
    );

    setForm(EMPTY_FORM);
    setMessage("Registration sent. It is now in the donor queue waiting for approval.");
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title="Become a Donor" />

        <section className="appointments-page">
          <div className="page-header appt-page-header">
            <div>
              <h1>Register as a Blood Donor</h1>
              <p>Your request goes to the donor team, who will approve or reject it.</p>
            </div>
          </div>

          {message && <div className="appt-feedback success" role="status">{message}</div>}

          <form className="surface-card book-form" onSubmit={handleSubmit}>
            <div className="booking-grid">
              <label>
                Full name
                <input type="text" required value={form.name} onChange={(e) => setField("name", e.target.value)} />
              </label>

              <label>
                Blood group
                <select required value={form.bloodType} onChange={(e) => setField("bloodType", e.target.value)}>
                  <option value="">Choose</option>
                  {BLOOD_GROUPS.map((group) => <option key={group} value={group}>{group}</option>)}
                </select>
              </label>

              <label>
                Age (18-65)
                <input type="number" required min="18" max="65" value={form.age} onChange={(e) => setField("age", e.target.value)} />
              </label>

              <label>
                Location
                <input type="text" required value={form.location} onChange={(e) => setField("location", e.target.value)} />
              </label>

              <label>
                Contact number
                <input type="tel" required pattern="\+?[0-9\s\-]{10,15}" title="Enter a valid phone number" value={form.contact} onChange={(e) => setField("contact", e.target.value)} />
              </label>
            </div>

            <div className="booking-form-footer">
              <p>Only adults between 18 and 65 can donate.</p>
              <button className="btn btn-primary" type="submit">Register as Donor</button>
            </div>
          </form>

          <div className="appointment-summary-row">
            <div>
              <h2>Donor registrations</h2>
              <p>{requests.length} registration{requests.length === 1 ? "" : "s"}</p>
            </div>
          </div>

          <div className="appointments-list">
            {requests.map((request) => (
              <article className="surface-card appt-card" key={request.id}>
                <div className="appt-main">
                  <div className="doctor-icon" aria-hidden="true">🩸</div>
                  <div className="appt-info">
                    <h3>{request.name} · {request.bloodType}</h3>
                    <p>{request.location} · {request.contact}</p>
                  </div>
                  <span className={`status-pill ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DonorRegister;
