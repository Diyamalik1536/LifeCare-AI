import { createSlice, current } from '@reduxjs/toolkit'
import { loadLocalQueue } from '../queue/sharedStorage.js'
import { mergeQueues } from '../queue/queueUtils.js'

const now = () => Date.now()

function findItem(state, id) {
  return state.items.find((item) => item.id === id)
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: { items: loadLocalQueue() },

  reducers: {
    // Doctor accepts the patient's request
    acceptAppointment: (state, action) => {
      const item = findItem(state, action.payload)
      if (item && item.status === 'Pending') {
        item.status = 'Confirmed'
        item.updatedAt = now()
      }
    },

    // Doctor calls the patient in (only one patient per doctor at a time)
    startConsultation: (state, action) => {
      const item = findItem(state, action.payload)
      if (!item || item.queueStatus !== 'Waiting') return

      const busy = state.items.some(
        (other) =>
          other.id !== item.id &&
          other.doctor === item.doctor &&
          other.date === item.date &&
          other.queueStatus === 'In Consultation'
      )
      if (busy) return

      item.status = 'Confirmed'
      item.queueStatus = 'In Consultation'
      item.updatedAt = now()
    },

    completeAppointment: (state, action) => {
      const item = findItem(state, action.payload)
      if (item) {
        item.status = 'Completed'
        item.queueStatus = 'Completed'
        item.updatedAt = now()
      }
    },

    // Reject / no-show: leaves the queue
    cancelAppointment: (state, action) => {
      const item = findItem(state, action.payload)
      if (item) {
        item.status = 'Cancelled'
        item.queueStatus = 'Cancelled'
        item.updatedAt = now()
      }
    },

    saveConsultation: (state, action) => {
      const { id, symptoms, diagnosis, treatmentPlan, notes } = action.payload
      const item = findItem(state, id)
      if (item) {
        Object.assign(item, { symptoms, diagnosis, treatmentPlan, notes })
        item.updatedAt = now()
      }
    },

    // Data arriving from the patient portal / other tab
    hydrateQueue: (state, action) => {
      const merged = mergeQueues(current(state).items, action.payload)
      if (JSON.stringify(merged) !== JSON.stringify(current(state).items)) {
        state.items = merged
      }
    },
  },
})

export const {
  acceptAppointment,
  startConsultation,
  completeAppointment,
  cancelAppointment,
  saveConsultation,
  hydrateQueue,
} = appointmentsSlice.actions

export default appointmentsSlice.reducer
