import { Droplets, ShieldCheck } from "lucide-react";
import { getInventoryStatus } from "../data/mockData.js";
import "./BloodAvailability.css";

export default function BloodAvailability({ inventory }) {
  let totalUnits = 0;
  let stable = 0;
  let moderate = 0;
  let low = 0;
  let critical = 0;

  inventory.forEach((item) => {
    totalUnits += item.units;

    const percentage = Math.round(
      (item.units / item.totalCapacity) * 100
    );

    const status = getInventoryStatus(percentage);

    if (status === "Stable") stable++;
    else if (status === "Moderate") moderate++;
    else if (status === "Low") low++;
    else critical++;
  });

  return (
    <section className="availability-card">

      <div className="availability-header">
        <div className="availability-icon">
          <Droplets size={22} />
        </div>

        <div>
          <p className="availability-label">
            Total Blood Units Available
          </p>

          <p className="availability-value">
            {totalUnits}
          </p>
        </div>
      </div>

      <div className="availability-stats-grid">
        <SummaryStat
          label="Stable"
          value={stable}
          tone="emerald"
        />

        <SummaryStat
          label="Moderate"
          value={moderate}
          tone="amber"
        />

        <SummaryStat
          label="Low Supply"
          value={low}
          tone="orange"
        />

        <SummaryStat
          label="Critical"
          value={critical}
          tone="red"
        />
      </div>

      <p className="availability-footnote">
        <ShieldCheck size={13} />
        Current blood stock status
      </p>

    </section>
  );
}

function SummaryStat({ label, value, tone }) {
  return (
    <div className={`summary-stat summary-stat-${tone}`}>
      <p className="summary-stat-value">
        {value}
      </p>

      <p className="summary-stat-label">
        {label}
      </p>
    </div>
  );
}
