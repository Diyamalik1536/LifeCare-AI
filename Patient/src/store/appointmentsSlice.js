
import { createSlice } from "@reduxjs/toolkit";

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

function loadAppointments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return sampleAppointments;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : sampleAppointments;
  } catch {
    return sampleAppointments;
  }
}

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState: {
    items: loadAppointments(),
  },

  reducers: {
    addAppointment: (state, action) => {
      const newAppointment = {
        id: `APT-${Date.now()}`,
        status: "Pending",
        queueStatus: "Waiting",
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
  addAppointment,
  updateAppointment,
  cancelAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
