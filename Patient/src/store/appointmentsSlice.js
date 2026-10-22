import { createSlice, current } from "@reduxjs/toolkit";
import { loadLocalQueue } from "../queue/sharedStorage";
import { mergeQueues } from "../queue/queueUtils";

const now = () => Date.now();

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState: { items: loadLocalQueue() },

  reducers: {
    // Patient books -> joins the END of the doctor's queue for that date.
    addAppointment: (state, action) => {
      const { doctor, date } = action.payload;
      const lastToken = state.items
        .filter((i) => i.doctor === doctor && i.date === date)
        .reduce((max, i) => Math.max(max, i.token || 0), 0);

      state.items.push({
        id: `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: "Pending",
        queueStatus: "Waiting",
        ...action.payload,
        token: lastToken + 1,
        createdAt: now(),
        updatedAt: now(),
      });
    },

    // Reschedule = leave the old queue and join the end of the new one.
    rescheduleAppointment: (state, action) => {
      const { id, date, time } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;

      const lastToken = state.items
        .filter((i) => i.id !== id && i.doctor === item.doctor && i.date === date)
        .reduce((max, i) => Math.max(max, i.token || 0), 0);

      item.date = date;
      item.time = time;
      item.token = lastToken + 1;
      item.status = "Pending";
      item.queueStatus = "Waiting";
      item.updatedAt = now();
    },

    cancelAppointment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.status = "Cancelled";
        item.queueStatus = "Cancelled";
        item.updatedAt = now();
      }
    },

    // Data arriving from the other portal / other tab.
    hydrateQueue: (state, action) => {
      const merged = mergeQueues(current(state).items, action.payload);
      if (JSON.stringify(merged) !== JSON.stringify(current(state).items)) {
        state.items = merged;
      }
    },
  },
});

export const {
  addAppointment,
  rescheduleAppointment,
  cancelAppointment,
  hydrateQueue,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
