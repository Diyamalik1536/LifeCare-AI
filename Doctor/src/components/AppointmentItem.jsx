import '../styles/cards.css'

function AppointmentItem({ appointment, onStatusChange }) {
  function handleButtonClick() {
    if (appointment.status === 'Pending') {
      onStatusChange(appointment.id, 'Completed')
    }
  }

  const isCompleted = appointment.status === 'Completed'

  return (
    <div className="appointment-item">
      <div className="appointment-dot"></div>

      <div className="appointment-time">
        <p className="appointment-time-text">{appointment.time}</p>
        <p className="appointment-duration">{appointment.duration}</p>
      </div>

      <div className="appointment-avatar">
        {appointment.initials}
      </div>

      <div className="appointment-info">
        <p className="appointment-name">{appointment.patient}</p>
        <p className="appointment-type">• {appointment.type}</p>
      </div>

      <span
        className={
          isCompleted
            ? 'status-badge status-completed'
            : 'status-badge status-pending'
        }
      >
        • {appointment.status}
      </span>

      <button
        className={isCompleted ? 'btn btn-outline' : 'btn btn-primary'}
        onClick={handleButtonClick}
        disabled={isCompleted}
      >
        {isCompleted ? 'Completed' : 'Complete'}
      </button>
    </div>
  )
}

export default AppointmentItem