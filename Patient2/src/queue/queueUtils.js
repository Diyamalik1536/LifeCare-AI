// Queue helpers (same file lives in the Patient and Doctor apps).
// Queue = FIFO per doctor per date, ordered by token number.

export const ACTIVE_STATUSES = ["Pending", "Confirmed"];

export function isActive(item) {
  return (
    ACTIVE_STATUSES.includes(item.status) &&
    (item.queueStatus === "Waiting" || item.queueStatus === "In Consultation")
  );
}

export function sortQueue(items) {
  return [...items].sort(
    (a, b) => a.date.localeCompare(b.date) || (a.token || 0) - (b.token || 0)
  );
}

// Active entries of one doctor on one date, in queue order.
export function getDoctorQueue(items, doctor, date) {
  return sortQueue(
    items.filter((i) => i.doctor === doctor && i.date === date && isActive(i))
  );
}

// { position, ahead, nowServing } for one appointment
export function getQueueInfo(items, appointment) {
  if (!appointment || !isActive(appointment)) return null;
  const queue = getDoctorQueue(items, appointment.doctor, appointment.date);
  const index = queue.findIndex((i) => i.id === appointment.id);
  const serving = queue.find((i) => i.queueStatus === "In Consultation");
  return {
    position: index + 1,
    ahead: index,
    nowServing: serving ? serving.token : null,
    inConsultation: appointment.queueStatus === "In Consultation",
  };
}

export function mergeQueues(a, b) {
  const map = new Map();
  [...a, ...b].forEach((item) => {
    if (!item || !item.id) return;
    const existing = map.get(item.id);
    if (!existing || (item.updatedAt || 0) >= (existing.updatedAt || 0)) {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values());
}

export function getLocalDateString(d = new Date()) {
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "P"
  );
}
