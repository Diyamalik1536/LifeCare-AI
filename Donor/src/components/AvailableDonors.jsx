import { Users, MapPin } from "lucide-react";

import "./AvailableDonors.css";

export default function AvailableDonors({ donors }) {

  const available = donors.filter(
    (donor) => donor.availability === "Available"
  );

  const within5 = available.filter(
    (donor) => donor.distanceKm <= 5
  ).length;

  const within10 = available.filter(
    (donor) => donor.distanceKm <= 10
  ).length;

  const within25 = available.filter(
    (donor) => donor.distanceKm <= 25
  ).length;

  return (
    <section className="donors-card">

      <div className="donors-header">

        <div className="donors-icon">
          <Users size={22} />
        </div>

        <div>
          <p className="donors-label">
            Available Donors
          </p>

          <p className="donors-value">
            {available.length}
          </p>
        </div>

      </div>

      <div className="donors-stats-grid">

        <RadiusStat
          label="Within 5 km"
          value={within5}
        />

        <RadiusStat
          label="Within 10 km"
          value={within10}
        />

        <RadiusStat
          label="Within 25 km"
          value={within25}
        />

      </div>

    </section>
  );
}

function RadiusStat({ label, value }) {
  return (
    <div className="radius-stat">

      <div className="radius-stat-icon">
        <MapPin size={13} />
      </div>

      <p className="radius-stat-value">
        {value}
      </p>

      <p className="radius-stat-label">
        {label}
      </p>

    </div>
  );
}
