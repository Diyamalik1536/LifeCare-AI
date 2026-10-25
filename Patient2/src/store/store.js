import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer, { setAppointments } from "./appointmentsSlice";
import donorsReducer, { setDonorRequests } from "./donorsSlice";
import { syncWithStore } from "../sharedStorage";
import appointmentsReducer, { hydrateQueue } from "./appointmentsSlice";
import { saveLocalQueue, connectBridge } from "../queue/sharedStorage";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    donors: donorsReducer,
  },
});

// Same keys are used by the Doctor and Donor apps
syncWithStore(store, "lifecare_appointments", (state) => state.appointments.items, setAppointments);
syncWithStore(store, "lifecare_donor_requests", (state) => state.donors.requests, setDonorRequests);
let lastItems = store.getState().appointments.items;

const bridge = connectBridge((remoteItems) => {
  store.dispatch(hydrateQueue(remoteItems));
  const merged = store.getState().appointments.items;
  // if we hold newer data than the shared copy, send it back
  if (JSON.stringify(merged) !== JSON.stringify(remoteItems)) bridge.push(merged);
});

// Every Redux change -> localStorage + shared queue
store.subscribe(() => {
  const items = store.getState().appointments.items;
  if (items === lastItems) return;
  lastItems = items;
  saveLocalQueue(items);
  bridge.push(items);
});
