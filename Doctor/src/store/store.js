import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer, { setAppointments } from './appointmentsSlice.js'
import { syncWithStore } from '../sharedStorage.js'

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
})

// Same key is used by the Patient app
syncWithStore(store, 'lifecare_appointments', (state) => state.appointments, setAppointments)

export default store
