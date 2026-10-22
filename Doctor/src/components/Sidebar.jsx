import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MdOutlineCalendarToday, MdMenu, MdClose } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFileEarmarkText } from 'react-icons/bs'
import '../styles/sidebar.css'

// Must match the breakpoint used in sidebar.css / global.css
const DESKTOP_MIN_WIDTH = 901

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the drawer whenever the page changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // While the drawer is open: lock page scroll, close on Escape,
  // and close automatically if the window grows to desktop size
  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    function handleResize() {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  const linkClass = ({ isActive }) =>
    'sidebar-link' + (isActive ? ' sidebar-link-active' : '')

  return (
    <>
      {/* Top bar - only visible on tablets and phones */}
      <div className="mobile-topbar">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="doctor-sidebar"
          onClick={() => setIsOpen(true)}
        >
          <MdMenu />
        </button>
        <img src="/logo.png" alt="" className="mobile-topbar-logo" />
        <span className="mobile-topbar-title">
          LifeCare<span className="sidebar-title-accent">-Ai</span>
        </span>
      </div>

      {/* Dark overlay behind the open drawer */}
      <div
        className={'sidebar-overlay' + (isOpen ? ' sidebar-overlay-visible' : '')}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="doctor-sidebar"
        className={'sidebar' + (isOpen ? ' sidebar-open' : '')}
      >
        {/* Logo and app name */}
        <div className="sidebar-logo">
          <img src="/logo.png" alt="LifeCare-AI Logo" className="sidebar-logo-img" />
          <h1 className="sidebar-title">
            LifeCare<span className="sidebar-title-accent">-Ai</span>
          </h1>

          <button
            type="button"
            className="sidebar-close-btn"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          >
            <MdClose />
          </button>
        </div>

        {/* Section label */}
        <p className="sidebar-section-label">DOCTOR PORTAL</p>

        {/* Navigation links */}
        <nav className="sidebar-nav">
          <NavLink to="/" end className={linkClass}>
            <MdOutlineCalendarToday className="sidebar-icon" />
            <span>Schedule</span>
          </NavLink>

          <NavLink to="/patients" className={linkClass}>
            <FaRegUser className="sidebar-icon" />
            <span>Patients</span>
          </NavLink>

          <NavLink to="/consultations" className={linkClass}>
            <AiOutlinePlus className="sidebar-icon" />
            <span>Consultations</span>
          </NavLink>

          <NavLink to="/prescriptions" className={linkClass}>
            <BsFileEarmarkText className="sidebar-icon" />
            <span>Prescriptions</span>
          </NavLink>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
