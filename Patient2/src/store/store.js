import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer, {
  setAppointments,
  hydrateQueue,
} from "./appointmentsSlice";
import donorsReducer, { setDonorRequests } from "./donorsSlice";
import { syncWithStore } from "../sharedStorage";
import { saveLocalQueue, connectBridge } from "../queue/sharedStorage";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    donors: donorsReducer,
  },
});

// Sync appointments and donor requests with LocalStorage
syncWithStore(
  store,
  "lifecare_appointments",
  (state) => state.appointments.items,
  setAppointments
);

syncWithStore(
  store,
  "lifecare_donor_requests",
  (state) => state.donors.requests,
  setDonorRequests
);

let lastItems = store.getState().appointments.items;

let bridge;

bridge = connectBridge((remoteItems) => {
  store.dispatch(hydrateQueue(remoteItems));

  const merged = store.getState().appointments.items;

  if (JSON.stringify(merged) !== JSON.stringify(remoteItems)) {
    bridge.push(merged);
  }
});

// Save Redux changes and sync the shared queue
store.subscribe(() => {
  const items = store.getState().appointments.items;

  if (items === lastItems) return;

  lastItems = items;
  saveLocalQueue(items);
  bridge.push(items);
});