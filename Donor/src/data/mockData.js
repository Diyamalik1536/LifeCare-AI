export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']


export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
}

export const initialBloodInventory = [
  { bloodType: 'A+', totalCapacity: 250, units: 180 },
  { bloodType: 'A-', totalCapacity: 150, units: 34 },
  { bloodType: 'B+', totalCapacity: 220, units: 141 },
  { bloodType: 'B-', totalCapacity: 120, units: 21 },
  { bloodType: 'AB+', totalCapacity: 100, units: 58 },
  { bloodType: 'AB-', totalCapacity: 80, units: 9 },
  { bloodType: 'O+', totalCapacity: 300, units: 233 },
  { bloodType: 'O-', totalCapacity: 230, units: 42 },
]

export function getInventoryStatus(percentage) {
  if (percentage < 20) return 'Critical'
  if (percentage < 40) return 'Low'
  if (percentage < 70) return 'Moderate'
  return 'Stable'
}

export const initialDonors = [
  { id: 'd1', name: 'Sarah Johnson', bloodType: 'O+', location: 'Noida, Sector 62', distanceKm: 2.4, availability: 'Available', contact: '+91 98111 22334', lastDonation: '2026-04-12', eligible: true },
  { id: 'd2', name: 'Michael Chen', bloodType: 'O+', location: 'Indirapuram', distanceKm: 5.1, availability: 'Available', contact: '+91 98222 33445', lastDonation: '2026-02-20', eligible: true },
  { id: 'd3', name: 'Priya Nair', bloodType: 'A+', location: 'Vaishali, Ghaziabad', distanceKm: 3.7, availability: 'Available', contact: '+91 97333 44556', lastDonation: '2026-05-01', eligible: true },
  { id: 'd4', name: 'Arjun Mehta', bloodType: 'B-', location: 'Rajouri Garden', distanceKm: 11.2, availability: 'Unavailable', contact: '+91 96444 55667', lastDonation: '2025-11-08', eligible: true },
  { id: 'd5', name: 'Fatima Sheikh', bloodType: 'AB+', location: 'Dwarka Sector 12', distanceKm: 14.8, availability: 'Available', contact: '+91 95555 66778', lastDonation: '2026-01-15', eligible: true },
  { id: 'd6', name: 'Rohan Kapoor', bloodType: 'O-', location: 'Saket', distanceKm: 8.3, availability: 'Available', contact: '+91 94666 77889', lastDonation: '2025-12-30', eligible: true },
  { id: 'd7', name: 'Ananya Iyer', bloodType: 'A-', location: 'Karol Bagh', distanceKm: 6.6, availability: 'On Call', contact: '+91 93777 88990', lastDonation: '2026-03-22', eligible: true },
  { id: 'd8', name: 'Vikram Singh', bloodType: 'B+', location: 'Lajpat Nagar', distanceKm: 4.0, availability: 'Available', contact: '+91 92888 99001', lastDonation: '2026-04-29', eligible: true },
  { id: 'd9', name: 'Neha Gupta', bloodType: 'AB-', location: 'Noida, Sector 18', distanceKm: 1.9, availability: 'Available', contact: '+91 91999 00112', lastDonation: '2025-10-02', eligible: true },
  { id: 'd10', name: 'Karan Malhotra', bloodType: 'O+', location: 'Greater Kailash', distanceKm: 9.5, availability: 'Unavailable', contact: '+91 90000 11223', lastDonation: '2026-05-18', eligible: false },
  { id: 'd11', name: 'Simran Kaur', bloodType: 'B+', location: 'Preet Vihar', distanceKm: 12.6, availability: 'Available', contact: '+91 89111 22334', lastDonation: '2026-03-05', eligible: true },
  { id: 'd12', name: 'Aditya Rao', bloodType: 'A+', location: 'Mayur Vihar', distanceKm: 17.3, availability: 'Available', contact: '+91 88222 33445', lastDonation: '2026-02-14', eligible: true },
]

export const initialEmergencyRequests = [
  { id: 'r1', bloodType: 'O-', unitsRequired: 2, hospital: 'Metro General Hospital', location: 'Sector 34, Noida', distanceKm: 4.2, urgency: 'Critical', requestedAt: '2026-08-12T07:20:00', status: 'In Progress', notes: 'Trauma patient, immediate transfusion needed.' },
  { id: 'r2', bloodType: 'A+', unitsRequired: 4, hospital: 'Sunrise Multispeciality', location: 'Vasundhara, Ghaziabad', distanceKm: 9.8, urgency: 'High', requestedAt: '2026-08-12T05:45:00', status: 'Open', notes: 'Scheduled surgery, buffer stock required.' },
  { id: 'r3', bloodType: 'B-', unitsRequired: 1, hospital: 'Apex Care Hospital', location: 'Rohini', distanceKm: 15.1, urgency: 'Medium', requestedAt: '2026-08-11T22:10:00', status: 'Open', notes: 'Elective procedure, flexible on timing.' },
  { id: 'r4', bloodType: 'AB-', unitsRequired: 3, hospital: 'Fortis Wellness Center', location: 'Vasant Kunj', distanceKm: 18.4, urgency: 'Critical', requestedAt: '2026-08-12T06:55:00', status: 'In Progress', notes: 'ICU patient, rare blood type shortage.' },
  { id: 'r5', bloodType: 'O+', unitsRequired: 2, hospital: 'City Hope Hospital', location: 'Sector 62, Noida', distanceKm: 2.1, urgency: 'Normal', requestedAt: '2026-08-11T18:30:00', status: 'Fulfilled', notes: 'Routine top-up for blood bank.' },
]

export function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}



export async function getBloodInventory() {
  return initialBloodInventory
}

export async function getDonors() {
  return initialDonors
}

export async function createDonor(donor) {
  return { id: generateId('d'), ...donor }
}

export async function getBloodRequests() {
  return initialEmergencyRequests
}

export async function createBloodRequest(request) {
  return { id: generateId('r'), ...request }
}
