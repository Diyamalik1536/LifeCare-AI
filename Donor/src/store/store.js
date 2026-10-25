import { configureStore } from '@reduxjs/toolkit'
import donorsReducer, { setDonorRequests } from './donorsSlice.js'
import { syncWithStore } from '../sharedStorage.js'

const store = configureStore({
  reducer: {
    donors: donorsReducer,
  },
})

// Same key is used by the Patient app
syncWithStore(store, 'lifecare_donor_requests', (state) => state.donors.requests, setDonorRequests)

export default store
