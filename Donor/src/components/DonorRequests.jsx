
import { useDispatch, useSelector } from "react-redux";
import { updateDonorStatus } from "../store/donorsSlice.js";
import "./DonorRequests.css";

export default function DonorRequests() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.donors.requests);

  const queue = requests
    .filter((r) => r.status === "Pending")
    .sort((a, b) => a.requestedAt - b.requestedAt);

  const done = requests
    .filter((r) => r.status !== "Pending")
    .sort((a, b) => b.requestedAt - a.requestedAt);

  const approved = done.filter((r) => r.status === "Approved").length;
  const rejected = done.filter((r) => r.status === "Rejected").length;

  return (
    <section className="donor-queue">
      <div className="donor-queue-header">
        <div>
          <span className="donor-queue-eyebrow">DONOR MANAGEMENT</span>
          <h2 className="donor-queue-title">Donor Registration</h2>
          <p className="donor-queue-subtitle">
            Review applications and manage donor registrations.
          </p>
        </div>
        <div className="donor-queue-total">
          <span className="donor-queue-total-label">Total applications</span>
          <strong>{requests.length}</strong>
        </div>
      </div>

      <div className="donor-queue-stats">
        <article className="donor-stat-card pending-stat">
          <div className="donor-stat-icon">◷</div>
          <div>
            <p>Pending approval</p>
            <strong>{queue.length}</strong>
            <span>Awaiting review</span>
          </div>
        </article>

        <article className="donor-stat-card approved-stat">
          <div className="donor-stat-icon">✓</div>
          <div>
            <p>Approved donors</p>
            <strong>{approved}</strong>
            <span>Successfully approved</span>
          </div>
        </article>

        <article className="donor-stat-card rejected-stat">
          <div className="donor-stat-icon">×</div>
          <div>
            <p>Rejected applications</p>
            <strong>{rejected}</strong>
            <span>Not approved</span>
          </div>
        </article>
      </div>

      <div className="donor-queue-panel">
        <div className="donor-panel-heading">
          <div>
            <h3>Pending Registrations</h3>
            <p>Review each application before making a decision.</p>
          </div>
          <span className="donor-count-pill">{queue.length} pending</span>
        </div>

        {queue.length > 0 ? (
          <div className="donor-request-list">
            {queue.map((request, index) => (
              <article className="donor-request-card" key={request.id}>
                <div className="donor-avatar">
                  {request.name?.charAt(0)?.toUpperCase() || "D"}
                </div>

                <div className="donor-request-info">
                  <div className="donor-request-name-row">
                    <h4>{request.name}</h4>
                    <span className="donor-blood-type">
                      {request.bloodType}
                    </span>
                  </div>

                  <p className="donor-request-number">
                    Application #{index + 1}
                  </p>

                  <div className="donor-request-details">
                    <span>Age: {request.age}</span>
                    <span>{request.location || "Location not provided"}</span>
                    <span>{request.contact || "Contact not provided"}</span>
                  </div>
                </div>

                <div className="donor-request-actions">
                  <button
                    type="button"
                    className="donor-action-btn approve-btn"
                    onClick={() =>
                      dispatch(
                        updateDonorStatus({
                          id: request.id,
                          newStatus: "Approved",
                        })
                      )
                    }
                  >
                    ✓ Approve
                  </button>

                  <button
                    type="button"
                    className="donor-action-btn reject-btn"
                    onClick={() =>
                      dispatch(
                        updateDonorStatus({
                          id: request.id,
                          newStatus: "Rejected",
                        })
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="donor-empty-state">
            <div className="donor-empty-icon">✓</div>
            <h4>All caught up!</h4>
            <p>
              There are no pending registrations right now. New applications
              will appear here when donors register.
            </p>
          </div>
        )}
      </div>

      <div className="donor-queue-panel donor-history-panel">
        <div className="donor-panel-heading">
          <div>
            <h3>Registration History</h3>
            <p>Previously reviewed donor applications.</p>
          </div>
          <span className="donor-count-pill">{done.length} reviewed</span>
        </div>

        {done.length > 0 ? (
          <div className="donor-request-list">
            {done.map((request) => (
              <article className="donor-request-card" key={request.id}>
                <div className="donor-avatar history-avatar">
                  {request.name?.charAt(0)?.toUpperCase() || "D"}
                </div>

                <div className="donor-request-info">
                  <div className="donor-request-name-row">
                    <h4>{request.name}</h4>
                    <span className="donor-blood-type">
                      {request.bloodType}
                    </span>
                  </div>

                  <div className="donor-request-details">
                    <span>Age: {request.age}</span>
                    <span>{request.location || "Location not provided"}</span>
                    <span>{request.contact || "Contact not provided"}</span>
                  </div>
                </div>

                <span
                  className={`donor-badge ${request.status.toLowerCase()}`}
                >
                  <span className="donor-status-dot" />
                  {request.status}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="donor-empty-state donor-history-empty">
            <div className="donor-empty-icon history-empty-icon">↻</div>
            <h4>No registration history yet</h4>
            <p>
              Approved and rejected applications will appear here after review.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
