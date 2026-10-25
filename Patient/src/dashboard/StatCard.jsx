import "./StatCard.css";

function StatCard({ icon, iconBg, title, value, text }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <p className="stat-card-title">{title}</p>
      <h3 className="stat-card-value">{value}</h3>
      <p className="stat-card-text">{text}</p>
    </div>
  );
}

export default StatCard;
