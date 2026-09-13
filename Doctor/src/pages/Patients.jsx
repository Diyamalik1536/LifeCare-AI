import Header from '../components/Header.jsx'
import PatientCard from '../components/PatientCard.jsx'
import { patients } from '../data/patients.js'
import '../styles/patients.css'

function Patients() {
  return (
    <div>
      <Header pageTitle="Patients" />

      <div className="page-inner">
        <div className="patients-top">
          <div>
            <p className="eyebrow-text">PATIENT MANAGEMENT</p>
            <h1 className="page-heading">Patients</h1>
            <p className="page-subheading">
              View and manage patient information and medical history.
            </p>
          </div>

          <p className="total-patients-text">
            <span className="total-patients-number">{patients.length}</span>{' '}
            Total Patients
          </p>
        </div>

        <div className="patients-records-card">
          <div className="patients-records-header">
            <div>
              <h3 className="card-title">Patient Records</h3>
              <p className="card-subtitle">
                View patient details and medical history.
              </p>
            </div>
          </div>

          <div className="patients-grid">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Patients