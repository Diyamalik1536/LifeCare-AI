import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer from './appointmentsSlice.js'

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
})

store.subscribe(() => {
  try {
    localStorage.setItem(
      'doctorAppointments',
      JSON.stringify(store.getState().appointments)
    )
  } catch (error) {
    console.error('Could not save appointments:', error)
  }
})

export default store