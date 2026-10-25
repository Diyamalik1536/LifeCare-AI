import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { AiOutlineClockCircle } from 'react-icons/ai'

import Header from '../components/Header.jsx'
import StatCard from '../components/StatCard.jsx'
import AppointmentItem from '../components/AppointmentItem.jsx'

import { DOCTORS } from '../data/appointments.js'
import { updateAppointmentStatus } from '../store/appointmentsSlice.js'
import '../styles/schedule.css'

function Schedule() {
  const dispatch = useDispatch()
  const [doctor, setDoctor] = useState('All')

  const allAppointments = useSelector(
    (state) => state.appointments
  )

  // Only the selected doctor's appointments
  const appointments = allAppointments.filter(
    (item) => doctor === 'All' || item.doctor === doctor
  )

  // Queue = pending requests, first come first served
  const queue = appointments
    .filter((item) => item.status === 'Pending')
    .sort((a, b) => (a.requestedAt || 0) - (b.requestedAt || 0))

  // Everything else (accepted, rejected, completed...)
  const others = appointments
    .filter((item) => item.status !== 'Pending')
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))

  function updateAppointment(id, newStatus) {
    dispatch(
      updateAppointmentStatus({ id, newStatus })
    )
  }

  const total = appointments.length

  const completed = appointments.filter(
    (appointment) => appointment.status === 'Completed'
  ).length

  const remaining = queue.length

  return (
    <div>
      <Header pageTitle="Schedule" />

      <div className="page-inner">
        <div className="schedule-top">
          <div>
            <p className="eyebrow-text">GOOD MORNING, DOCTOR</p>
            <h1 className="page-heading">Today's Schedule</h1>
            <p className="page-subheading">
              Accept or reject new appointment requests from your queue.
            </p>
          </div>

          <div className="today-date-card">
            <p className="today-date-label">Showing requests for</p>
            <select
              className="today-date-value"
              value={doctor}
              onChange={(event) => setDoctor(event.target.value)}
            >
              <option value="All">All Doctors</option>
              {DOCTORS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
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
            label="Waiting in Queue"
            iconBg="#EEF7FD"
          />
        </div>

        <div className="appointments-card">
          <h3 className="card-title">Appointment Requests (Queue)</h3>
          <p className="card-subtitle">
            New requests from patients, oldest first
          </p>

          <div className="appointments-list">
            {queue.map((item, index) => (
              <AppointmentItem
                key={item.id}
                appointment={item}
                queueNumber={index + 1}
                onStatusChange={updateAppointment}
              />
            ))}

            {queue.length === 0 && (
              <p className="card-subtitle">No pending requests.</p>
            )}
          </div>
        </div>

        <div className="appointments-card" style={{ marginTop: 22 }}>
          <h3 className="card-title">Appointments</h3>
          <p className="card-subtitle">
            Accepted, completed and rejected appointments
          </p>

          <div className="appointments-list">
            {others.map((item) => (
              <AppointmentItem
                key={item.id}
                appointment={item}
                onStatusChange={updateAppointment}
              />
            ))}

            {others.length === 0 && (
              <p className="card-subtitle">Nothing here yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
