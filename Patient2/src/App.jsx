
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "./dashboard/Dashboard";
import Appointments from "./appointment/Appointments";
import HealthRecords from "./healthrecords/HealthRecords";
import Messages from "./messages/Messages";
import DonorRegister from "./donor/DonorRegister";

import {
  addAppointment,
  rescheduleAppointment,
  cancelAppointment,
} from "./store/appointmentsSlice";

function App() {
  const dispatch = useDispatch();

  const appointments = useSelector(
    (state) => state.appointments.items
  );

  const handleAddAppointment = (appointment) => {
    dispatch(addAppointment(appointment));
  };

  const handleRescheduleAppointment = (id, date, time) => {
    dispatch(rescheduleAppointment({ id, date, time }));
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
              rescheduleAppointment={handleRescheduleAppointment}
              cancelAppointment={handleCancelAppointment}
            />
          }
        />

        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/donor" element={<DonorRegister />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
