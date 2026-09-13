import { useState } from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { AiOutlineClockCircle } from 'react-icons/ai'
import Header from '../components/Header.jsx'
import StatCard from '../components/StatCard.jsx'
import AppointmentItem from '../components/AppointmentItem.jsx'
import { appointments as initialAppointments } from '../data/appointments.js'
import '../styles/schedule.css'

function Schedule() {
  const [appointments, setAppointments] = useState(initialAppointments)

  function updateAppointment(id, newStatus) {
    setAppointments(
      appointments.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    )
  }

  const total = appointments.length
  const completed = appointments.filter(
    (a) => a.status === 'Completed'
  ).length
  const remaining = total - completed

  return (
    <div>
      <Header pageTitle="Schedule" />

      <div className="page-inner">

        <div className="schedule-top">
          <div>
            <p className="eyebrow-text">GOOD MORNING, DOCTOR</p>
            <h1 className="page-heading">Today's Schedule</h1>
            <p className="page-subheading">
              Manage your appointments and patient visits for today.
            </p>
          </div>

          <div className="today-date-card">
            <p className="today-date-label">Today</p>
            <p className="today-date-value">September 7, 2026</p>
          </div>
        </div>

        <div className="stats-row">
          <StatCard
            icon={<MdOutlineCalendarToday />}
            number={total}
            label="Total Appointments"
            iconBg="#EEF7FD"
          />

          <StatCard
            icon={<FaRegCircleCheck />}
            number={completed}
            label="Completed"
            iconBg="#EEF7FD"
          />

          <StatCard
            icon={<AiOutlineClockCircle />}
            number={remaining}
            label="Remaining"
            iconBg="#EEF7FD"
          />
        </div>

        <div className="appointments-card">
          <h3 className="card-title">Appointments</h3>
          <p className="card-subtitle">Today's patient appointments</p>

          <div className="appointments-list">
            {appointments.map((item) => (
              <AppointmentItem
                key={item.id}
                appointment={item}
                onStatusChange={updateAppointment}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Schedule