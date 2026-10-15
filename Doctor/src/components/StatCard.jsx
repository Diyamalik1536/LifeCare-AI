import '../styles/cards.css'


function StatCard({ icon, number, label, iconBg }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <p className="stat-card-number">{number}</p>
        <p className="stat-card-label">{label}</p>
      </div>
    </div>
  )
}

export default StatCard
