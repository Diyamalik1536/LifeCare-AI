import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { AiOutlineClockCircle } from 'react-icons/ai'

import Header from '../components/Header.jsx'
import StatCard from '../components/StatCard.jsx'
import AppointmentItem from '../components/AppointmentItem.jsx'

import { updateAppointmentStatus } from '../store/appointmentsSlice.js'
import '../styles/schedule.css'

function Schedule() {
  const dispatch = useDispatch()

  const appointments = useSelector(
    (state) => state.appointments
  )

  function updateAppointment(id, newStatus) {
    dispatch(
      updateAppointmentStatus({ id, newStatus })
    )
  }

  const total = appointments.length

  const completed = appointments.filter(
    (appointment) => appointment.status === 'Completed'
  ).length

  const remaining = appointments.filter(
    (appointment) => appointment.status === 'Pending'
  ).length

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
          <p className="card-subtitle">
            Today's patient appointments
          </p>

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