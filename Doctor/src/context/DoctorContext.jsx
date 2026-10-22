import { createContext, useContext, useState } from 'react'

// Same doctors the patient can book with
export const DOCTORS = [
  { name: 'Dr. Rahul Sharma', specialization: 'General Physician' },
  { name: 'Dr. Priya Mehta', specialization: 'Dermatologist' },
  { name: 'Dr. Amit Verma', specialization: 'Cardiologist' },
  { name: 'Dr. Neha Kapoor', specialization: 'Pediatrician' },
  { name: 'Dr. Arjun Singh', specialization: 'Orthopedic' },
]

const KEY = 'lifecare_doctor_profile'
const DoctorContext = createContext(null)

function initialsOf(name) {
  return name.replace('Dr. ', '').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

function loadDoctor() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && DOCTORS.some((d) => d.name === saved)) return saved
  } catch {
    /* ignore */
  }
  return DOCTORS[0].name
}

export function DoctorProvider({ children }) {
  const [name, setName] = useState(loadDoctor)

  function selectDoctor(newName) {
    setName(newName)
    try {
      localStorage.setItem(KEY, newName)
    } catch {
      /* ignore */
    }
  }

  const value = {
    name,
    initials: initialsOf(name),
    role: DOCTORS.find((d) => d.name === name)?.specialization || 'Doctor',
    selectDoctor,
    doctors: DOCTORS,
  }

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
}

export function useDoctor() {
  return useContext(DoctorContext)
}
