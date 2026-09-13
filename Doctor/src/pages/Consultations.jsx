import { useState } from 'react'
import Header from '../components/Header.jsx'
import ConsultationItem from '../components/ConsultationItem.jsx'
import { consultations as initialConsultations } from '../data/consultations.js'
import '../styles/consultations.css'

function Consultations() {
  const [consultations, setConsultations] = useState(initialConsultations)
  const [selectedId, setSelectedId] = useState(initialConsultations[0].id)

  const selectedConsultation = consultations.find(
    (c) => c.id === selectedId
  )

  function updateField(field, value) {
    const updatedList = consultations.map((c) => {
      if (c.id === selectedId) {
        return { ...c, [field]: value }
      }
      return c
    })

    setConsultations(updatedList)
  }

  function handleSave() {
    alert("Consultation saved for " + selectedConsultation.patient)
  }

  return (
    <div>
      <Header pageTitle="Consultations" />

      <div className="page-inner">
        <p className="eyebrow-text">PATIENT CARE</p>
        <h1 className="page-heading">Consultations</h1>
        <p className="page-subheading">
          Record diagnosis, treatment plans and consultation notes.
        </p>

        <div className="consultations-main">
          <div className="consultation-list-card">
            <h3 className="card-title">Consultation List</h3>
            <p className="card-subtitle">Select a patient to continue.</p>

            <div className="consultation-list">
              {consultations.map((item) => (
                <ConsultationItem
                  key={item.id}
                  consultation={item}
                  isActive={item.id === selectedId}
                  onClick={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="current-patient-card">
            <div className="current-patient-header">
              <div className="current-patient-avatar">
                {selectedConsultation.initials}
              </div>

              <div className="current-patient-info">
                <p className="current-patient-label">Current Patient</p>
                <h3 className="current-patient-name">
                  {selectedConsultation.patient}
                </h3>
                <p className="current-patient-symptoms-preview">
                  {selectedConsultation.symptoms}
                </p>
              </div>

              <span className="consultation-status">
                {selectedConsultation.status}
              </span>
            </div>

            <div className="form-field">
              <label className="form-label">Symptoms</label>
              <textarea
                value={selectedConsultation.symptoms}
                onChange={(e) => updateField("symptoms", e.target.value)}
                placeholder="Enter symptoms..."
              />
            </div>

            <div className="form-field">
              <label className="form-label">Diagnosis</label>
              <textarea
                value={selectedConsultation.diagnosis}
                onChange={(e) => updateField("diagnosis", e.target.value)}
                placeholder="Enter diagnosis..."
              />
            </div>

            <div className="form-field">
              <label className="form-label">Treatment Plan</label>
              <textarea
                value={selectedConsultation.treatmentPlan}
                onChange={(e) => updateField("treatmentPlan", e.target.value)}
                placeholder="Enter treatment plan..."
              />
            </div>

            <div className="form-field">
              <label className="form-label">Consultation Notes</label>
              <textarea
                value={selectedConsultation.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Enter consultation notes..."
              />
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={handleSave}
            >
              Save Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultations