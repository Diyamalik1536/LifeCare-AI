import '../styles/cards.css'

function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function AppointmentItem({ appointment, queueNumber, onStatusChange }) {
  const { id, status } = appointment
  const patient = appointment.patientName || 'User'

  return (
    <div className="appointment-item">
      <div className="appointment-dot"></div>

      <div className="appointment-time">
        <p className="appointment-time-text">{appointment.time}</p>
        <p className="appointment-duration">{appointment.date}</p>
      </div>

      <div className="appointment-avatar">{getInitials(patient)}</div>

      <div className="appointment-info">
        <p className="appointment-name">
          {queueNumber ? `#${queueNumber} · ` : ''}{patient}
        </p>
        <p className="appointment-type">
          • {appointment.mode} · {appointment.doctor}
        </p>
      </div>

      <span className={`status-badge status-${status.toLowerCase()}`}>
        • {status}
      </span>

      {status === 'Pending' && (
        <>
          <button className="btn btn-primary" onClick={() => onStatusChange(id, 'Confirmed')}>
            Accept
          </button>
          <button className="btn btn-danger" onClick={() => onStatusChange(id, 'Rejected')}>
            Reject
          </button>
        </>
      )}

      {status === 'Confirmed' && (
        <button className="btn btn-primary" onClick={() => onStatusChange(id, 'Completed')}>
          Complete
        </button>
      )}
    </div>
  )
}

export default AppointmentItem
