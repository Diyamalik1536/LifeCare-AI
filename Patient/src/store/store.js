import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer, { hydrateQueue } from "./appointmentsSlice";
import { saveLocalQueue, connectBridge } from "../queue/sharedStorage";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
});

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
