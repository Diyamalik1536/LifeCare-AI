import { createSlice } from '@reduxjs/toolkit'
import { appointments as initialAppointments } from '../data/appointments.js'

const STORAGE_KEY = 'doctorAppointments'

function loadAppointments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved !== null) {
      const parsed = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Could not load appointments:', error)
  }

  return initialAppointments
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: loadAppointments(),

  reducers: {
    updateAppointmentStatus: (state, action) => {
      const { id, newStatus } = action.payload

      const appointment = state.find(
        (item) => item.id === id
      )

      if (appointment) {
        appointment.status = newStatus
      }
    },
  },
})

export const { updateAppointmentStatus } =
  appointmentsSlice.actions

export default appointmentsSlice.reducer