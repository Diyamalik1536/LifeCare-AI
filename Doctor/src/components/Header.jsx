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
          <span>September 7, 2026</span>
        </div>

        <div className="header-doctor">
          <div className="header-avatar">
            {doctor.initials}
          </div>
          <div>
            <p className="header-doctor-name">
              {doctor.name}
            </p>
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