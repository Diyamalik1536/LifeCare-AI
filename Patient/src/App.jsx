import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Appointments from "./appointment/Appointments";
import HealthRecords from "./healthrecords/HealthRecords";
import Messages from "./messages/Messages";

function App() {

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "18 Aug",
      doctor: "Dr. Rahul Sharma",
      specialization: "General Physician",
      status: "Upcoming",
      time: "10:30 AM",
      mode: "Online Consultation",
    },
    {
      id: 2,
      date: "12 Aug",
      doctor: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      status: "Completed",
      time: "02:00 PM",
      mode: "Hospital Visit",
    },
    {
      id: 3,
      date: "05 Aug",
      doctor: "Dr. Amit Verma",
      specialization: "Cardiologist",
      status: "Completed",
      time: "11:00 AM",
      mode: "Online Consultation",
    },
  ]);

 
  
  const addAppointment = (appointment)=>{
    const newAppointment = {
      id:Date.now(),
      status:"Upcoming",
      ...appointment
    };

    setAppointments((prev)=>[
      newAppointment,
      ...prev
    ]);
  }

  return (
    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <Dashboard
              appointments={appointments}
              addAppointment={addAppointment}
            />
          }
        />

        {/* APPOINTMENTS */}
        <Route
          path="/appointments"
          element={
            <Appointments
              appointments={appointments}
              addAppointment={addAppointment}
            />
          }
        />

        {/* HEALTH RECORDS */}
        <Route
          path="/health-records"
          element={<HealthRecords />}
        />

        {/* MESSAGES */}
        <Route
          path="/messages"
          element={<Messages />}
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;