import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'

import Header from '../components/Header.jsx'
import StatCard from '../components/StatCard.jsx'
import AppointmentItem from '../components/AppointmentItem.jsx'
import { useDoctor } from '../context/DoctorContext.jsx'
import { getLocalDateString, sortQueue, getDoctorQueue } from '../queue/queueUtils.js'

import {
  acceptAppointment,
  startConsultation,
  completeAppointment,
  cancelAppointment,
} from '../store/appointmentsSlice.js'
import '../styles/schedule.css'

function Schedule() {
  const dispatch = useDispatch()
  const doctor = useDoctor()
  const items = useSelector((state) => state.appointments.items)
  const today = getLocalDateString()
  const [date, setDate] = useState(today)

  // Everything booked for THIS doctor on the chosen date (patient bookings arrive here live)
  const dayAppointments = useMemo(
    () => sortQueue(items.filter((i) => i.doctor === doctor.name && i.date === date)),
    [items, doctor.name, date]
  )
  const activeQueue = useMemo(
    () => getDoctorQueue(items, doctor.name, date),
    [items, doctor.name, date]
  )

  const total = dayAppointments.length
  const completed = dayAppointments.filter((i) => i.status === 'Completed').length
  const waiting = activeQueue.filter((i) => i.queueStatus === 'Waiting').length
  const serving = activeQueue.find((i) => i.queueStatus === 'In Consultation')
  const nextInLine = activeQueue.find((i) => i.queueStatus === 'Waiting')
  const pendingRequests = items.filter(
    (i) => i.doctor === doctor.name && i.status === 'Pending' && i.date !== date
  ).length

  const prettyDate = new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div>
      <Header pageTitle="Schedule" />

      <div className="page-inner">
        <div className="schedule-top">
          <div>
            <p className="eyebrow-text">{date === today ? "TODAY'S QUEUE" : 'QUEUE'}</p>
            <h1 className="page-heading">{date === today ? "Today's Schedule" : 'Schedule'}</h1>
            <p className="page-subheading">
              Patients who book with {doctor.name} join this queue automatically.
            </p>
          </div>

          <div className="today-date-card">
            <p className="today-date-label">{date === today ? 'Today' : 'Viewing'}</p>
            <p className="today-date-value">{prettyDate}</p>
          </div>
        </div>

        <div className="stats-row stats-row-4">
          <StatCard icon={<MdOutlineCalendarToday />} number={total} label="Total Appointments" iconBg="#EEF7FD" />
          <StatCard icon={<FaRegCircleCheck />} number={completed} label="Completed" iconBg="#EEF7FD" />
          <StatCard icon={<FiUsers />} number={waiting} label="Waiting in Queue" iconBg="#EEF7FD" />
          <StatCard icon={<AiOutlineClockCircle />} number={serving ? `#${serving.token}` : '—'} label="Now Serving" iconBg="#EEF7FD" />
        </div>

        <div className="appointments-card">
          <div className="queue-toolbar">
            <div>
              <h3 className="card-title">Patient Queue</h3>
              <p className="card-subtitle">First come, first served — ordered by token number.</p>
            </div>

            <div className="queue-date-picker">
              <label>
                Date{' '}
                <input type="date" value={date} onChange={(e) => setDate(e.target.value || today)} />
              </label>
              {date !== today && (
                <button className="btn btn-outline" onClick={() => setDate(today)}>Today</button>
              )}
              <button
                className="btn btn-primary"
                disabled={!!serving || !nextInLine}
                title={serving ? 'Complete the current consultation first' : 'Call the next patient'}
                onClick={() => nextInLine && dispatch(startConsultation(nextInLine.id))}
              >
                Call Next
              </button>
            </div>
          </div>

          {serving && (
            <div className="now-serving-card">
              Now serving: <strong>#{serving.token} {serving.patientName}</strong>
              {nextInLine && <> · Next: #{nextInLine.token} {nextInLine.patientName}</>}
            </div>
          )}

          {pendingRequests > 0 && (
            <p className="card-subtitle">
              {pendingRequests} pending request{pendingRequests === 1 ? '' : 's'} on other dates — change the date to view them.
            </p>
          )}

          <div className="appointments-list">
            {dayAppointments.map((item) => {
              const idx = activeQueue.findIndex((q) => q.id === item.id)
              return (
                <AppointmentItem
                  key={item.id}
                  appointment={item}
                  position={idx === -1 ? null : idx + 1}
                  doctorBusy={!!serving}
                  onAccept={(id) => dispatch(acceptAppointment(id))}
                  onStart={(id) => dispatch(startConsultation(id))}
                  onComplete={(id) => dispatch(completeAppointment(id))}
                  onCancel={(id) => {
                    if (window.confirm('Remove this patient from the queue?')) dispatch(cancelAppointment(id))
                  }}
                />
              )
            })}

            {dayAppointments.length === 0 && (
              <div className="queue-empty">
                No patients in the queue for this date yet. New bookings from the patient portal appear here instantly.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
