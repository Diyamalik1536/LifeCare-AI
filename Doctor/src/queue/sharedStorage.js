// localStorage persistence + cross-portal sync (no backend).
// 1. Always saved in this portal's own localStorage (works even if the bridge is offline).
// 2. Synced through the hidden iframe at the Role origin (http://localhost:5173/bridge.html)
//    so the Patient and Doctor portals see the same queue.
import { mergeQueues } from "./queueUtils";

export const QUEUE_KEY = "lifecare_shared_queue_v1";
const BRIDGE_ORIGIN = "http://localhost:5173";
const BRIDGE_URL = `${BRIDGE_ORIGIN}/bridge.html`;

export function loadLocalQueue() {
  try {
    const parsed = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalQueue(items) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Could not save queue:", error);
  }
}

// Returns { push(items) }. onRemote(items) is called whenever the shared queue changes.
export function connectBridge(onRemote) {
  const iframe = document.createElement("iframe");
  iframe.src = BRIDGE_URL;
  iframe.style.display = "none";
  iframe.setAttribute("aria-hidden", "true");
  let ready = false;
  let pending = null;

  const post = (message) => iframe.contentWindow?.postMessage(message, BRIDGE_ORIGIN);

  window.addEventListener("message", (event) => {
    if (event.origin !== BRIDGE_ORIGIN || event.source !== iframe.contentWindow) return;
    const data = event.data || {};
    if (data.type === "lc-ready") {
      ready = true;
      post({ type: "lc-get" });
      if (pending) {
        post({ type: "lc-push", items: pending });
        pending = null;
      }
    } else if (data.type === "lc-state" && Array.isArray(data.items)) {
      onRemote(data.items);
    }
  });

  document.body.appendChild(iframe);

  return {
    push(items) {
      if (ready) post({ type: "lc-push", items });
      else pending = pending ? mergeQueues(pending, items) : items;
    },
  };
}
