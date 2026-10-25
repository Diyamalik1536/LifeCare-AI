import { NavLink } from 'react-router-dom'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFileEarmarkText } from 'react-icons/bs'
import '../styles/sidebar.css'


function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo and app name */}
      <div className="sidebar-logo">
        <img src="/logo.png" alt="LifeCare-AI Logo" className="sidebar-logo-img" />
        <h1 className="sidebar-title">
          LifeCare<span className="sidebar-title-accent">-Ai</span>
        </h1>
      </div>

      {/* Section label */}
      <p className="sidebar-section-label">DOCTOR PORTAL</p>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
        >
          <MdOutlineCalendarToday className="sidebar-icon" />
          <span>Schedule</span>
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
        >
          <FaRegUser className="sidebar-icon" />
          <span>Patients</span>
        </NavLink>

        <NavLink
          to="/consultations"
          className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
        >
          <AiOutlinePlus className="sidebar-icon" />
          <span>Consultations</span>
        </NavLink>

        <NavLink
          to="/prescriptions"
          className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
        >
          <BsFileEarmarkText className="sidebar-icon" />
          <span>Prescriptions</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
