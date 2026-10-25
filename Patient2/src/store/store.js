import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer, { setAppointments } from "./appointmentsSlice";
import donorsReducer, { setDonorRequests } from "./donorsSlice";
import { syncWithStore } from "../sharedStorage";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    donors: donorsReducer,
  },
});

// Same keys are used by the Doctor and Donor apps
syncWithStore(store, "lifecare_appointments", (state) => state.appointments.items, setAppointments);
syncWithStore(store, "lifecare_donor_requests", (state) => state.donors.requests, setDonorRequests);
