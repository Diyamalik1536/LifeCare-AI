import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header.jsx'
import ConsultationItem from '../components/ConsultationItem.jsx'
import { useDoctor } from '../context/DoctorContext.jsx'
import { sortQueue, getInitials } from '../queue/queueUtils.js'
import { saveConsultation } from '../store/appointmentsSlice.js'
import '../styles/consultations.css'

function Consultations() {
  const dispatch = useDispatch()
  const doctor = useDoctor()
  const items = useSelector((state) => state.appointments.items)

  // Every patient who booked this doctor (cancelled ones excluded), in queue order
  const consultations = useMemo(
    () => sortQueue(items.filter((i) => i.doctor === doctor.name && i.status !== 'Cancelled')),
    [items, doctor.name]
  )

  const [selectedId, setSelectedId] = useState(null)
  const [draft, setDraft] = useState(null)

  const selectedConsultation =
    consultations.find((c) => c.id === selectedId) || consultations[0] || null

  // Load the form whenever another patient is selected
  const currentId = selectedConsultation?.id
  useEffect(() => {
    if (selectedConsultation) {
      setDraft({
        symptoms: selectedConsultation.symptoms || '',
        diagnosis: selectedConsultation.diagnosis || '',
        treatmentPlan: selectedConsultation.treatmentPlan || '',
        notes: selectedConsultation.notes || '',
      })
    } else {
      setDraft(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId])

  function updateField(field, value) {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  function handleSave() {
    dispatch(saveConsultation({ id: selectedConsultation.id, ...draft }))
    alert('Consultation saved for ' + selectedConsultation.patientName)
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

        {!selectedConsultation || !draft ? (
          <div className="consultation-list-card">
            <p className="card-subtitle">
              No patients yet. When a patient books an appointment with {doctor.name}, they appear here.
            </p>
          </div>
        ) : (
        <div className="consultations-main">
          <div className="consultation-list-card">
            <h3 className="card-title">Consultation List</h3>
            <p className="card-subtitle">Select a patient to continue.</p>

            <div className="consultation-list">
              {consultations.map((item) => (
                <ConsultationItem
                  key={item.id}
                  consultation={item}
                  isActive={item.id === selectedConsultation.id}
                  onClick={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="current-patient-card">
            <div className="current-patient-header">
              <div className="current-patient-avatar">
                {getInitials(selectedConsultation.patientName)}
              </div>

              <div className="current-patient-info">
                <p className="current-patient-label">Current Patient</p>
                <h3 className="current-patient-name">
                  {selectedConsultation.patientName}
                </h3>
                <p className="current-patient-symptoms-preview">
                  {draft.symptoms || 'No symptoms provided'}
                </p>
              </div>

              <span className="consultation-status">
                {selectedConsultation.queueStatus === 'In Consultation' ? 'In Consultation' : selectedConsultation.status}
              </span>
            </div>

            <div className="form-field">
              <label className="form-label">Symptoms</label>
              <textarea
                value={draft.symptoms}
                onChange={(e) => updateField("symptoms", e.target.value)}
                placeholder="Enter symptoms..."
              />
            </div>

            <div className="form-field">
              <label className="form-label">Diagnosis</label>
              <textarea
                value={draft.diagnosis}
                onChange={(e) => updateField("diagnosis", e.target.value)}
                placeholder="Enter diagnosis..."
              />
            </div>

            <div className="form-field">
              <label className="form-label">Treatment Plan</label>
              <textarea
                value={draft.treatmentPlan}
                onChange={(e) => updateField("treatmentPlan", e.target.value)}
                placeholder="Enter treatment plan..."
              />
            </div>

            <div className="form-field">
              <label className="form-label">Consultation Notes</label>
              <textarea
                value={draft.notes}
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
        )}
      </div>
    </div>
  )
}

export default Consultations