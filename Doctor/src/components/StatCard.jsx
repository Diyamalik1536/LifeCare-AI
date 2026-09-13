import '../styles/cards.css'

// StatCard component
// Shows one statistic with an icon, a number and a label
// icon, number and label are passed in as props

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
