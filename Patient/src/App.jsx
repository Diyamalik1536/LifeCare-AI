import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Appointments from "./appointment/Appointments";
import HealthRecords from "./healthrecords/HealthRecords";
import Messages from "./messages/Messages";

const STORAGE_KEY = "lifecare_patient_appointments";

const sampleAppointments = [
  {
    id: "APT-SAMPLE-1",
    patientName: "User",
    date: "2026-10-18",
    doctor: "Dr. Rahul Sharma",
    specialization: "General Physician",
    status: "Confirmed",
    time: "10:30",
    mode: "Online Consultation",
    queueStatus: "Waiting",
  },
  {
    id: "APT-SAMPLE-2",
    patientName: "User",
    date: "2026-08-12",
    doctor: "Dr. Priya Mehta",
    specialization: "Dermatologist",
    status: "Completed",
    time: "14:00",
    mode: "Hospital Visit",
    queueStatus: "Completed",
  },
  {
    id: "APT-SAMPLE-3",
    patientName: "User",
    date: "2026-08-05",
    doctor: "Dr. Amit Verma",
    specialization: "Cardiologist",
    status: "Completed",
    time: "11:00",
    mode: "Online Consultation",
    queueStatus: "Completed",
  },
];

function readSavedAppointments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return sampleAppointments;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : sampleAppointments;
  } catch {
    return sampleAppointments;
  }
}

function App() {
  const [appointments, setAppointments] = useState(readSavedAppointments);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
      console.error("Could not save appointments to localStorage:", error);
    }
  }, [appointments]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      id: `APT-${Date.now()}`,
      status: "Pending",
      queueStatus: "Waiting",
      ...appointment,
    };
    setAppointments((current) => [newAppointment, ...current]);
    return newAppointment;
  };

  const updateAppointment = (id, updates) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
  };

  const cancelAppointment = (id) => {
    updateAppointment(id, { status: "Cancelled" });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              appointments={appointments}
              addAppointment={addAppointment}
            />
          }
        />
        <Route
          path="/appointments"
          element={
            <Appointments
              appointments={appointments}
              addAppointment={addAppointment}
              updateAppointment={updateAppointment}
              cancelAppointment={cancelAppointment}
            />
          }
        />
        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
