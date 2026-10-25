import { createContext, useContext } from 'react'

const DoctorContext = createContext(null)

const doctorProfile = {
  name: 'Dr. James Carter',
  initials: 'DJ',
  role: 'Doctor',
}

export function DoctorProvider({ children }) {
  return (
    <DoctorContext.Provider value={doctorProfile}>
      {children}
    </DoctorContext.Provider>
  )
}

export function useDoctor() {
  return useContext(DoctorContext)
}