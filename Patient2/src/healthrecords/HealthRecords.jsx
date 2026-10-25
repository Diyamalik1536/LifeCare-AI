import { useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./HealthRecords.css";

const INITIAL_RECORDS = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    type: "Lab Report",
    date: "02 Aug 2026",
    doctor: "Dr. Rahul Sharma",
    icon: "🧪",
  },
  {
    id: 2,
    title: "Chest X-Ray",
    type: "Imaging",
    date: "22 Jul 2026",
    doctor: "Dr. Amit Verma",
    icon: "🩻",
  },
  {
    id: 3,
    title: "Skin Allergy Test",
    type: "Lab Report",
    date: "10 Jul 2026",
    doctor: "Dr. Priya Mehta",
    icon: "🧪",
  },
  {
    id: 4,
    title: "ECG Report",
    type: "Cardiac",
    date: "28 Jun 2026",
    doctor: "Dr. Amit Verma",
    icon: "💓",
  },
  {
    id: 5,
    title: "General Checkup Summary",
    type: "Consultation Note",
    date: "15 Jun 2026",
    doctor: "Dr. Rahul Sharma",
    icon: "📝",
  },
];

function HealthRecords() {

  const [records, setRecords] = useState(INITIAL_RECORDS);

  const addReport = () => {

    const newReport = {
      id: Date.now(),
      title: "New Medical Report",
      type: "Lab Report",
      date: "08 Sep 2026",
      doctor: "Dr. New Doctor",
      icon: "🧪",
    };

    setRecords((prev) => [newReport, ...prev]);
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header title="Health Records" />

        <section className="records-page">

          <div className="page-header">
            <h1>Health Records</h1>
            <p>All your medical reports and history in one place</p>
          </div>

          <div className="filter-row">
            <button className="filter-chip active">
              All
            </button>
          </div>

          <button
            className="btn btn-primary add-report-btn"
            onClick={addReport}
          >
            + Add Report
          </button>

          <div className="records-list">

            {records.map((r) => (

              <div
                className="surface-card record-card"
                key={r.id}
              >

                <div className="record-icon">
                  {r.icon}
                </div>

                <div className="record-info">
                  <h3>{r.title}</h3>

                  <p>
                    {r.type} · {r.doctor}
                  </p>
                </div>

                <div className="record-date">
                  {r.date}
                </div>

                <button className="btn btn-secondary">
                  View
                </button>

              </div>

            ))}

            {records.length === 0 && (
              <p className="records-empty">
                No records available.
              </p>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default HealthRecords;