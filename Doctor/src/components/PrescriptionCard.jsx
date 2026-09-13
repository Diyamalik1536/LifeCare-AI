import '../styles/cards.css'

// PrescriptionCard component
// Shows one patient's prescription with a list of medicines
// prescription data is passed in as a prop

function PrescriptionCard({ prescription }) {
  return (
    <div className="prescription-card">
      <div className="prescription-header">
        <div className="prescription-header-left">
          <div className="prescription-avatar">{prescription.initials}</div>
          <div>
            <p className="prescription-name">{prescription.patient}</p>
            <p className="prescription-date">{prescription.date}</p>
          </div>
        </div>
        <span className="prescription-tag">Prescription</span>
      </div>

      {/* List every medicine inside this prescription */}
      {prescription.medicines.map((med, index) => (
        <div className="medicine-row" key={index}>
          <div className="medicine-number">{index + 1}</div>
          <div>
            <p className="medicine-name">{med.name}</p>
            <p className="medicine-details">
              {med.dosage} • {med.frequency} • {med.duration}
            </p>
            <p className="medicine-note">{med.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PrescriptionCard
