import '../styles/cards.css'



function ConsultationItem({ consultation, isActive, onClick }) {
  return (
    <div
      className={"consultation-item" + (isActive ? " consultation-item-active" : "")}
      onClick={onClick}
    >
      <div className="consultation-avatar">{consultation.initials}</div>
      <div className="consultation-info">
        <p className="consultation-name">{consultation.patient}</p>
        <p className="consultation-symptoms">{consultation.symptoms}</p>
      </div>
      <span className="consultation-status">{consultation.status}</span>
    </div>
  )
}

export default ConsultationItem
