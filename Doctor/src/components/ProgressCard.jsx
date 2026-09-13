import { FaRegCircleCheck } from 'react-icons/fa6'
import '../styles/cards.css'

// ProgressCard component
// Shows the doctor's progress for today as a percentage bar
// percent is passed in as a prop

function ProgressCard({ percent }) {
  return (
    <div className="progress-card">
      <p className="progress-title">
        <FaRegCircleCheck className="progress-icon" />
        Today's Progress
      </p>
      <p className="progress-percent">{percent}%</p>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: percent + "%" }}></div>
      </div>
      <p className="progress-caption">Appointments completed so far today</p>
    </div>
  )
}

export default ProgressCard
