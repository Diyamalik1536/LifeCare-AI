import { MapPin } from "lucide-react";
import "./DonorTable.css";

function availabilityClass(availability) {
  if (availability === "Available") {
    return "availability-badge-available";
  }

  return "availability-badge-unavailable";
}

export default function DonorTable({ donors }) {
  if (donors.length === 0) {
    return (
      <div className="donor-table-empty">
        No donors available.
      </div>
    );
  }

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="donor-table-wrap">
        <table className="donor-table">
          <thead>
            <tr className="donor-table-head-row">
              <th className="donor-table-th">Donor</th>
              <th className="donor-table-th">Blood Type</th>
              <th className="donor-table-th">Location</th>
              <th className="donor-table-th">Distance</th>
              <th className="donor-table-th">Availability</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((donor) => (
              <tr
                key={donor.id}
                className="donor-table-row"
              >
                <td className="donor-table-td donor-table-td-name">
                  {donor.name}
                </td>

                <td className="donor-table-td">
                  <span className="blood-type-chip">
                    {donor.bloodType}
                  </span>
                </td>

                <td className="donor-table-td-muted">
                  {donor.location}
                </td>

                <td className="donor-table-td-muted">
                  {donor.distanceKm} km
                </td>

                <td className="donor-table-td">
                  <span
                    className={`availability-badge ${
                      availabilityClass(donor.availability)
                    }`}
                  >
                    {donor.availability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="donor-cards">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="donor-card"
          >
            <div className="donor-card-top">
              <div>
                <p className="donor-card-name">
                  {donor.name}
                </p>

                <span className="blood-type-chip blood-type-chip-block">
                  {donor.bloodType}
                </span>
              </div>
            </div>

            <div className="donor-card-location">
              <MapPin size={12} />
              {donor.location} · {donor.distanceKm} km
            </div>

            <div className="donor-card-bottom">
              <span
                className={`availability-badge ${
                  availabilityClass(donor.availability)
                }`}
              >
                {donor.availability}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

