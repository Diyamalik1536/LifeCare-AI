import "./HealthOverview.css";

const VITALS = [
  { label: "Heart Rate", value: "72", unit: "bpm", icon: "💓", status: "Normal" },
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", icon: "🩺", status: "Normal" },
  { label: "Blood Sugar", value: "94", unit: "mg/dL", icon: "🍬", status: "Normal" },
  { label: "Weight", value: "68", unit: "kg", icon: "⚖️", status: "Stable" },
];

function HealthOverview() {
  return (
    <div className="surface-card health-overview">
      <div className="section-title-row">
        <h3>Health Overview</h3>
        <span className="section-subtitle">Last updated today</span>
      </div>

      <div className="vitals-grid">
        {VITALS.map((v) => (
          <div className="vital-item" key={v.label}>
            <div className="vital-icon">{v.icon}</div>
            <div className="vital-info">
              <p className="vital-label">{v.label}</p>
              <p className="vital-value">
                {v.value} <span>{v.unit}</span>
              </p>
            </div>
            <span className="vital-status">{v.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthOverview;
