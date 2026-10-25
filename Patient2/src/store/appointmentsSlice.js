import { createSlice, current } from "@reduxjs/toolkit";
import { loadLocalQueue } from "../queue/sharedStorage";
import { mergeQueues } from "../queue/queueUtils";

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

const now = () => Date.now();

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState: {
    items: loadLocalQueue() ?? sampleAppointments,
  },

  reducers: {
    // Load or replace appointments
    setAppointments: (state, action) => {
      state.items = action.payload;
    },

    // Patient books an appointment and joins the end of the queue
    addAppointment: (state, action) => {
      const { doctor, date } = action.payload;

      const lastToken = state.items
        .filter(
          (item) =>
            item.doctor === doctor &&
            item.date === date &&
            item.status !== "Cancelled"
        )
        .reduce((max, item) => Math.max(max, item.token || 0), 0);

      state.items.push({
        id: `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: "Pending",
        queueStatus: "Waiting",
        requestedAt: Date.now(),
        ...action.payload,
        token: lastToken + 1,
        createdAt: now(),
        updatedAt: now(),
      });
    },

    // Reschedule an appointment
    rescheduleAppointment: (state, action) => {
      const { id, date, time } = action.payload;
      const item = state.items.find((appointment) => appointment.id === id);

      if (!item) return;

      const lastToken = state.items
        .filter(
          (appointment) =>
            appointment.id !== id &&
            appointment.doctor === item.doctor &&
            appointment.date === date &&
            appointment.status !== "Cancelled"
        )
        .reduce((max, appointment) => Math.max(max, appointment.token || 0), 0);

      item.date = date;
      item.time = time;
      item.token = lastToken + 1;
      item.status = "Pending";
      item.queueStatus = "Waiting";
      item.updatedAt = now();
    },

    // Cancel an appointment
    cancelAppointment: (state, action) => {
      const item = state.items.find(
        (appointment) => appointment.id === action.payload
      );

      if (item) {
        item.status = "Cancelled";
        item.queueStatus = "Cancelled";
        item.updatedAt = now();
      }
    },

    // Merge appointments received from shared storage
    hydrateQueue: (state, action) => {
      const existingItems = current(state).items;
      const merged = mergeQueues(existingItems, action.payload);

      if (JSON.stringify(merged) !== JSON.stringify(existingItems)) {
        state.items = merged;
      }
    },
  },
});

export const {
  setAppointments,
  addAppointment,
  rescheduleAppointment,
  cancelAppointment,
  hydrateQueue,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;