import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Header from '../components/Header.jsx'
import PrescriptionCard from '../components/PrescriptionCard.jsx'
import { prescriptions as initialPrescriptions } from '../data/prescriptions.js'
import { patients } from '../data/patients.js'
import '../styles/prescriptions.css'

const STORAGE_KEY = 'doctorPrescriptions'

function loadPrescriptions() {
  try {
    const savedPrescriptions = localStorage.getItem(STORAGE_KEY)

    if (savedPrescriptions !== null) {
      const parsedPrescriptions = JSON.parse(savedPrescriptions)

      if (Array.isArray(parsedPrescriptions)) {
        return parsedPrescriptions
      }
    }
  } catch (error) {
    console.error('Could not load prescriptions:', error)
  }

  return initialPrescriptions
}

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(loadPrescriptions)

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    patient: '',
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    note: '',
  })

  // Save prescriptions whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(prescriptions)
      )
    } catch (error) {
      console.error('Could not save prescriptions:', error)
    }
  }, [prescriptions])

  function handleSavePrescription() {
    if (!formData.patient || !formData.medicine || !formData.dosage) {
      alert('Please fill all required fields.')
      return
    }

    const selectedPatient = patients.find(
      (patient) => patient.name === formData.patient
    )

    const newPrescription = {
      id: Date.now(),
      initials: selectedPatient?.initials || 'NA',
      patient: formData.patient,
      date: '2026-09-07',
      medicines: [
        {
          name: formData.medicine,
          dosage: formData.dosage,
          frequency: formData.frequency,
          duration: formData.duration,
          note: formData.note,
        },
      ],
    }

    setPrescriptions((previousPrescriptions) => [
      newPrescription,
      ...previousPrescriptions,
    ])

    setFormData({
      patient: '',
      medicine: '',
      dosage: '',
      frequency: '',
      duration: '',
      note: '',
    })

    setShowForm(false)
  }

  return (
    <div>
      <Header pageTitle="Prescriptions" />

      <div className="page-inner">
        {/* Top Section */}
        <div className="prescriptions-top">
          <div>
            <p className="eyebrow-text">MEDICATION MANAGEMENT</p>
            <h1 className="page-heading">Prescriptions</h1>
            <p className="page-subheading">
              Create and review patient prescriptions.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <AiOutlinePlus className="btn-icon" />
            Create Prescription
          </button>
        </div>

        {/* Create Prescription Form */}
        {showForm && (
          <div className="prescription-form">
            <h3>Create New Prescription</h3>

            <div className="form-group">
              <label>Patient</label>

              <select
                value={formData.patient}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    patient: e.target.value,
                  })
                }
              >
                <option value="">Select Patient</option>

                {patients.map((patient) => (
                  <option key={patient.id} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Medicine Name</label>

              <input
                type="text"
                placeholder="Enter medicine"
                value={formData.medicine}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicine: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Dosage</label>

              <input
                type="text"
                placeholder="5mg"
                value={formData.dosage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dosage: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Frequency</label>

              <input
                type="text"
                placeholder="Once daily"
                value={formData.frequency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    frequency: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Duration</label>

              <input
                type="text"
                placeholder="30 days"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Instructions</label>

              <textarea
                rows="3"
                placeholder="Take after food"
                value={formData.note}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    note: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-buttons">
              <button
                className="btn btn-primary"
                onClick={handleSavePrescription}
              >
                Save Prescription
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Previous Prescriptions */}
        <div className="prescriptions-card">
          <h3 className="card-title">Previous Prescriptions</h3>

          <p className="card-subtitle">
            Recently created patient prescriptions.
          </p>

          <div className="prescriptions-list">
            {prescriptions.map((item) => (
              <PrescriptionCard
                key={item.id}
                prescription={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prescriptions