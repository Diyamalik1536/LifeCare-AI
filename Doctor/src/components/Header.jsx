import { MdOutlineCalendarToday } from 'react-icons/md'
import { useDoctor } from '../context/DoctorContext.jsx'
import '../styles/header.css'

function Header({ pageTitle }) {
  const doctor = useDoctor()

  return (
    <div className="header">
      <div className="header-left">
        <h2 className="header-title">{pageTitle}</h2>
        <p className="header-subtitle">
          LifeCare-Ai Doctor Dashboard
        </p>
      </div>

      <div className="header-right">
        <div className="header-date">
          <MdOutlineCalendarToday className="header-date-icon" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <div className="header-doctor">
          <div className="header-avatar">
            {doctor.initials}
          </div>
          <div>
            <select
              className="header-doctor-select"
              value={doctor.name}
              onChange={(e) => doctor.selectDoctor(e.target.value)}
              aria-label="Select doctor"
            >
              {doctor.doctors.map((d) => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>
            <p className="header-doctor-role">
              {doctor.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header