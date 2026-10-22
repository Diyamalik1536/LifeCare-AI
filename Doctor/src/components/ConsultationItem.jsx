import '../styles/cards.css'
import { getInitials } from '../queue/queueUtils.js'

function ConsultationItem({ consultation, isActive, onClick }) {
  const label = consultation.queueStatus === 'In Consultation' ? 'In Consultation' : consultation.status
  return (
    <div
      className={"consultation-item" + (isActive ? " consultation-item-active" : "")}
      onClick={onClick}
    >
      <div className="consultation-avatar">{getInitials(consultation.patientName)}</div>
      <div className="consultation-info">
        <p className="consultation-name">#{consultation.token} {consultation.patientName}</p>
        <p className="consultation-symptoms">{consultation.symptoms || 'No symptoms provided'}</p>
      </div>
      <span className="consultation-status">{label}</span>
    </div>
  )
}

export default ConsultationItem
