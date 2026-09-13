import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Schedule from './pages/Schedule.jsx'
import Patients from './pages/Patients.jsx'
import Consultations from './pages/Consultations.jsx'
import Prescriptions from './pages/Prescriptions.jsx'

// Main App component
// It shows the Sidebar on the left and the page content on the right
function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
