import { Droplet } from "lucide-react";
import "./BloodInventoryCard.css";

export default function BloodInventoryCard({
  bloodType,
  percentage,
  units,
  status,
}) {
  const statusClass = status.toLowerCase();

  return (
    <div className={`inventory-card inventory-card-${statusClass}`}>

      <div className="inventory-card-top">

        <div className="inventory-card-icon">
          <Droplet size={16} />
        </div>

        <span className="inventory-card-type">
          {bloodType}
        </span>

      </div>

      <div className="inventory-card-row">

        <span className="inventory-card-percentage">
          {percentage}%
        </span>

        <span className={`status-badge status-badge-${statusClass}`}>
          {status}
        </span>

      </div>

      <div className="inventory-card-track">
        <div
          className={`inventory-card-bar inventory-card-bar-${statusClass}`}
          style={{ "--bar-width": `${percentage}%` }}
        />
      </div>

      <p className="inventory-card-units">
        {units} units available
      </p>

    </div>
  );
}
