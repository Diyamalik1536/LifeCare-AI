// Shares data between the Patient, Doctor and Donor apps (no backend).
// Each app runs on its own port, so they talk to a tiny page hosted by the
// Role app (Role/public/bridge.html) that owns the common localStorage.

const BRIDGE_URL = "http://localhost:5173/bridge.html";
const BRIDGE_ORIGIN = "http://localhost:5173";

const frame = document.createElement("iframe");
frame.src = BRIDGE_URL;
frame.style.display = "none";
document.body.appendChild(frame);

const handlers = {}; // key -> function that receives the saved value
let frameLoaded = false;
const waiting = []; // messages sent before the bridge finished loading

frame.onload = () => {
  frameLoaded = true;
  waiting.forEach(send);
};

function send(message) {
  if (frameLoaded) frame.contentWindow.postMessage(message, BRIDGE_ORIGIN);
  else waiting.push(message);
}

window.addEventListener("message", (e) => {
  if (e.origin !== BRIDGE_ORIGIN) return;
  const handler = handlers[e.data.key];
  if (handler) handler(e.data.value);
});

// Keeps one Redux slice in sync with the shared localStorage.
//   key     -> localStorage key
//   getData -> (state) => the data to save
//   setData -> Redux action creator that replaces the data
export function syncWithStore(store, key, getData, setData) {
  let ready = false; // do not save until the first load is done
  let last = null;

  handlers[key] = (value) => {
    last = value;
    if (value) store.dispatch(setData(JSON.parse(value)));
    ready = true;
  };
  send({ type: "get", key });

  store.subscribe(() => {
    if (!ready) return;
    const json = JSON.stringify(getData(store.getState()));
    if (json === last) return;
    last = json;
    send({ type: "set", key, value: json });
  });

  setTimeout(() => {
    if (!ready) console.warn("Shared storage not reachable. Is the Role app running on port 5173?");
  }, 3000);
}
