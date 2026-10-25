import { createSlice } from '@reduxjs/toolkit'

// Donor registration queue.
// Patient registers -> status "Pending" -> donor team approves ("Approved") or rejects ("Rejected").
const donorsSlice = createSlice({
  name: 'donors',
  initialState: { requests: [] },

  reducers: {
    // Replaces everything with the data coming from the shared storage
    setDonorRequests: (state, action) => {
      state.requests = action.payload
    },

    addDonorRequest: (state, action) => {
      state.requests.push({
        id: `DON-${Date.now()}`,
        status: 'Pending',
        requestedAt: Date.now(),
        ...action.payload,
      })
    },

    updateDonorStatus: (state, action) => {
      const { id, newStatus } = action.payload
      const request = state.requests.find((item) => item.id === id)
      if (request) request.status = newStatus
    },
  },
})

export const { setDonorRequests, addDonorRequest, updateDonorStatus } =
  donorsSlice.actions

export default donorsSlice.reducer
