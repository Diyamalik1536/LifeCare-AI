import '../styles/cards.css'
import { getInitials } from '../queue/queueUtils.js'

function formatTime(value) {
  if (!value) return ''
  const [h, m] = value.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return value
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function AppointmentItem({ appointment, position, doctorBusy, onAccept, onStart, onComplete, onCancel }) {
  const { status, queueStatus } = appointment
  const inConsultation = queueStatus === 'In Consultation'
  const done = status === 'Completed'
  const cancelled = status === 'Cancelled'

  let badgeClass = 'status-badge status-waiting'
  let badgeText = status === 'Pending' ? 'Pending request' : 'Waiting'
  if (inConsultation) { badgeClass = 'status-badge status-progress'; badgeText = 'In Consultation' }
  if (done) { badgeClass = 'status-badge status-completed'; badgeText = 'Completed' }
  if (cancelled) { badgeClass = 'status-badge status-cancelled'; badgeText = 'Cancelled' }

  return (
    <div className={'appointment-item' + (inConsultation ? ' appointment-item-active' : '')}>
      <div className="queue-token">
        <span className="queue-token-label">TOKEN</span>
        <span className="queue-token-number">#{appointment.token}</span>
      </div>

      <div className="appointment-time">
        <p className="appointment-time-text">{formatTime(appointment.time)}</p>
        <p className="appointment-duration">
          {position ? `Queue position ${position}` : 'preferred slot'}
        </p>
      </div>

      <div className="appointment-avatar">{getInitials(appointment.patientName)}</div>

      <div className="appointment-info">
        <p className="appointment-name">{appointment.patientName}</p>
        <p className="appointment-type">
          • {appointment.mode === 'Online Consultation' ? 'Video Consultation' : 'In-person Visit'}
        </p>
        {appointment.symptoms && (
          <p className="appointment-type">Reason: {appointment.symptoms}</p>
        )}
      </div>

      <span className={badgeClass}>• {badgeText}</span>

      <div className="appointment-actions">
        {status === 'Pending' && (
          <button className="btn btn-outline" onClick={() => onAccept(appointment.id)}>Accept</button>
        )}
        {queueStatus === 'Waiting' && (
          <button
            className="btn btn-primary"
            disabled={doctorBusy}
            title={doctorBusy ? 'Complete the current consultation first' : 'Call patient in'}
            onClick={() => onStart(appointment.id)}
          >
            Call In
          </button>
        )}
        {inConsultation && (
          <button className="btn btn-primary" onClick={() => onComplete(appointment.id)}>Complete</button>
        )}
        {(queueStatus === 'Waiting' || inConsultation) && (
          <button className="btn btn-outline btn-reject" onClick={() => onCancel(appointment.id)}>
            {status === 'Pending' ? 'Reject' : 'Remove'}
          </button>
        )}
      </div>
    </div>
  )
}

export default AppointmentItem
