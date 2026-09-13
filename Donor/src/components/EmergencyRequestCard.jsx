import { Building2, Clock, MapPin, Droplet } from "lucide-react";
import "./EmergencyRequestCard.css";

const URGENCY_CLASS = {
  Critical: "urgency-badge-critical",
  High: "urgency-badge-high",
  Medium: "urgency-badge-medium",
  Normal: "urgency-badge-normal",
};

function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.max(1, Math.round(diffMs / 60000));

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }

  const diffHrs = Math.round(diffMins / 60);

  if (diffHrs < 24) {
    return `${diffHrs}h ago`;
  }

  return `${Math.round(diffHrs / 24)}d ago`;
}

export default function EmergencyRequestCard({ request }) {
  const isCritical = request.urgency === "Critical";

  return (
    <div
      className={`request-card ${
        isCritical ? "request-card-critical" : ""
      }`}
    >

      {/* Blood Type */}
      <div className="request-card-top">

        <div className="request-card-left">

          <div className="request-card-icon">
            <Droplet
              size={18}
              fill="currentColor"
              className="icon-soft"
            />
          </div>

          <div>
            <p className="request-card-type">
              {request.bloodType}
            </p>

            <p className="request-card-units">
              {request.unitsRequired} units required
            </p>
          </div>

        </div>

        
      </div>

      {/* Request Details */}
      <div className="request-card-details">

        <div className="request-card-detail-row">
          <Building2 size={13} />
          {request.hospital}
        </div>

        <div className="request-card-detail-row">
          <MapPin size={13} />
          {request.location} · {request.distanceKm} km
        </div>

        <div className="request-card-detail-row">
          <Clock size={13} />
          {timeAgo(request.requestedAt)}
        </div>

      </div>

    </div>
  );
}

