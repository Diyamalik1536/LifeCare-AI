
import { createSlice } from "@reduxjs/toolkit";

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

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState: {
    items: sampleAppointments,
  },

  reducers: {
    // Replaces everything with the data coming from the shared storage
    setAppointments: (state, action) => {
      state.items = action.payload;
    },

    addAppointment: (state, action) => {
      const newAppointment = {
        id: `APT-${Date.now()}`,
        status: "Pending",
        queueStatus: "Waiting",
        requestedAt: Date.now(), // decides the position in the doctor's queue
        ...action.payload,
      };

      state.items.unshift(newAppointment);
    },

    updateAppointment: (state, action) => {
      const { id, updates } = action.payload;

      const appointment = state.items.find(
        (item) => item.id === id
      );

      if (appointment) {
        Object.assign(appointment, updates);
      }
    },

    cancelAppointment: (state, action) => {
      const appointment = state.items.find(
        (item) => item.id === action.payload
      );

      if (appointment) {
        appointment.status = "Cancelled";
      }
    },
  },
});

export const {
  setAppointments,
  addAppointment,
  updateAppointment,
  cancelAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
