// Sample data for the Prescriptions page
// Each prescription belongs to a patient and has a list of medicines

export const prescriptions = [
  {
    id: 1,
    initials: "SM",
    patient: "Sophia Martinez",
    date: "2026-08-20",
    medicines: [
      {
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        duration: "30 days",
        note: "Take in the morning"
      }
    ]
  },
  {
    id: 2,
    initials: "MH",
    patient: "Marcus Holloway",
    date: "2026-08-25",
    medicines: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "30 days",
        note: "Take after meals"
      }
    ]
  },
  {
    id: 3,
    initials: "LT",
    patient: "Linda Thompson",
    date: "2026-08-15",
    medicines: [
      {
        name: "Naproxen",
        dosage: "250mg",
        frequency: "Twice daily",
        duration: "14 days",
        note: "Take with food"
      }
    ]
  },
  {
    id: 4,
    initials: "RC",
    patient: "Robert Chen",
    date: "2026-09-01",
    medicines: [
      {
        name: "Metoprolol",
        dosage: "25mg",
        frequency: "Once daily",
        duration: "30 days",
        note: "Take at bedtime"
      }
    ]
  }
];
