import { createSlice } from '@reduxjs/toolkit'

// Appointments come from the Patient app (through the shared storage).
// Patient books -> status "Pending" -> doctor accepts ("Confirmed") or rejects ("Rejected").
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: [],

  reducers: {
    // Replaces everything with the data coming from the shared storage
    setAppointments: (state, action) => action.payload,

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

export const { setAppointments, updateAppointmentStatus } =
  appointmentsSlice.actions

export default appointmentsSlice.reducer
