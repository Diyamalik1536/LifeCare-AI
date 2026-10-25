import { useDispatch, useSelector } from "react-redux";
import { updateDonorStatus } from "../store/donorsSlice.js";
import "./DonorRequests.css";

export default function DonorRequests() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.donors.requests);

  // Pending = queue (oldest first), baaki = accepted / rejected list
  const queue = requests
    .filter((r) => r.status === "Pending")
    .sort((a, b) => a.requestedAt - b.requestedAt);

  const done = requests
    .filter((r) => r.status !== "Pending")
    .sort((a, b) => b.requestedAt - a.requestedAt);

  return (
    <section className="donor-queue">
      <h2 className="donor-queue-title">Donor Registration Queue</h2>
      <p className="donor-queue-subtitle">{queue.length} waiting for approval</p>

      {queue.map((request, index) => (
        <div className="donor-queue-item" key={request.id}>
          <div className="donor-queue-info">
            <p className="donor-queue-name">
              #{index + 1} · {request.name} ({request.bloodType})
            </p>
            <p className="donor-queue-meta">
              Age {request.age} · {request.location} · {request.contact}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => dispatch(updateDonorStatus({ id: request.id, newStatus: "Approved" }))}
          >
            Approve
          </button>
          <button
            className="btn-secondary"
            onClick={() => dispatch(updateDonorStatus({ id: request.id, newStatus: "Rejected" }))}
          >
            Reject
          </button>
        </div>
      ))}

      {queue.length === 0 && (
        <p className="donor-queue-subtitle">No pending registrations.</p>
      )}

      {/* Accepted / Rejected list */}
      <h3 className="donor-queue-title donor-history-title">
        Registration History ({done.length})
      </h3>

      {done.map((request) => (
        <div className="donor-queue-item" key={request.id}>
          <div className="donor-queue-info">
            <p className="donor-queue-name">
              {request.name} ({request.bloodType})
            </p>
            <p className="donor-queue-meta">
              Age {request.age} · {request.location} · {request.contact}
            </p>
          </div>

          <span className={`donor-badge ${request.status.toLowerCase()}`}>
            {request.status}
          </span>
        </div>
      ))}

      {done.length === 0 && (
        <p className="donor-queue-subtitle">No approved or rejected donors yet.</p>
      )}
    </section>
  );
}