import { createSlice } from "@reduxjs/toolkit";

// Donor registration queue: patient registers -> Donor app approves / rejects
const donorsSlice = createSlice({
  name: "donors",
  initialState: { requests: [] },
  reducers: {
    setDonorRequests: (state, action) => {
      state.requests = action.payload;
    },
    addDonorRequest: (state, action) => {
      state.requests.push({
        id: `DON-${Date.now()}`,
        status: "Pending",
        requestedAt: Date.now(),
        ...action.payload,
      });
    },
  },
});

export const { setDonorRequests, addDonorRequest } = donorsSlice.actions;
export default donorsSlice.reducer;
