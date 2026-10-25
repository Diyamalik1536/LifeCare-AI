import { ClipboardList, AlertTriangle } from "lucide-react";
import BloodInventoryCard from "./BloodInventoryCard.jsx";
import { getInventoryStatus } from "../data/mockData.js";

import "./BloodInventoryOverview.css";

export default function BloodInventoryOverview({ inventory }) {

  const enriched = inventory.map((item) => {
    const percentage = Math.round(
      (item.units / item.totalCapacity) * 100
    );

    return {
      ...item,
      percentage,
      status: getInventoryStatus(percentage),
    };
  });

  const criticalCount = enriched.filter(
    (item) => item.status === "Critical"
  ).length;

  return (
    <section className="inventory-overview">

      <div className="inventory-overview-header">

        <div className="inventory-overview-title-group">

          <div className="inventory-icon">
            <ClipboardList size={18} />
          </div>

          <div>
            <h2 className="inventory-overview-title">
              Blood Inventory Overview
            </h2>

            <p className="inventory-overview-subtitle">
              Blood stock across all blood groups
            </p>
          </div>

        </div>

        {criticalCount > 0 && (
          <div className="critical-badge">
            <AlertTriangle size={14} />

            {criticalCount} blood group
            {criticalCount > 1 ? "s" : ""} critical
          </div>
        )}

      </div>

      <div className="inventory-grid">

        {enriched.map((item) => (
          <BloodInventoryCard
            key={item.bloodType}
            bloodType={item.bloodType}
            percentage={item.percentage}
            units={item.units}
            status={item.status}
          />
        ))}

      </div>

    </section>
  );
}