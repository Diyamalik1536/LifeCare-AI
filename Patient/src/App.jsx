
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "./dashboard/Dashboard";
import Appointments from "./appointment/Appointments";
import HealthRecords from "./healthrecords/HealthRecords";
import Messages from "./messages/Messages";

import {
  addAppointment,
  updateAppointment,
  cancelAppointment,
} from "./store/appointmentsSlice";

const STORAGE_KEY = "lifecare_patient_appointments";

function App() {
  const dispatch = useDispatch();

  const appointments = useSelector(
    (state) => state.appointments.items
  );

  // Save Redux appointments to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appointments)
      );
    } catch (error) {
      console.error(
        "Could not save appointments to localStorage:",
        error
      );
    }
  }, [appointments]);

  const handleAddAppointment = (appointment) => {
    dispatch(addAppointment(appointment));
  };

  const handleUpdateAppointment = (id, updates) => {
    dispatch(updateAppointment({ id, updates }));
  };

  const handleCancelAppointment = (id) => {
    dispatch(cancelAppointment(id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard appointments={appointments} />}
        />

        <Route
          path="/appointments"
          element={
            <Appointments
              appointments={appointments}
              addAppointment={handleAddAppointment}
              updateAppointment={handleUpdateAppointment}
              cancelAppointment={handleCancelAppointment}
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
