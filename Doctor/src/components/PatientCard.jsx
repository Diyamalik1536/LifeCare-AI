import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import '../styles/cards.css'

function PatientCard({ patient }) {
  return (
    <div className="patient-card">
      {/* Header */}
      <div className="patient-card-header">
        <div className="patient-avatar">{patient.initials}</div>

        <div>
          <h3 className="patient-name">{patient.name}</h3>
          <p className="patient-basic-info">
            {patient.age} yrs • {patient.gender}
          </p>
        </div>
      </div>

      {/* Condition Badge */}
      <span className="patient-condition-tag">{patient.condition}</span>

      {/* Details */}
      <div className="patient-details-grid">
        <div className="detail-item">
          <span className="detail-label">Blood Group</span>
          <strong>{patient.bloodGroup}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Height</span>
          <strong>{patient.height}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Weight</span>
          <strong>{patient.weight}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Last Visit</span>
          <strong>{patient.lastVisit}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Allergies</span>
          <strong>{patient.allergies}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Medication</span>
          <strong>{patient.medication}</strong>
        </div>
      </div>

      <hr className="patient-divider" />

      {/* Contact */}
      <div className="patient-contact">
        <p>
          <FaPhoneAlt />
          {patient.phone}
        </p>

        <p>
          <FaEnvelope />
          {patient.email}
        </p>

        <p>
          <FaMapMarkerAlt />
          {patient.address}
        </p>
      </div>

      {/* Next Appointment */}
      <div className="next-appointment-box">
        Next Appointment: <strong>{patient.nextAppointment}</strong>
      </div>
    </div>
  )
}

export default PatientCard