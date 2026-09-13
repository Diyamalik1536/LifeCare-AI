import "./App.css";

function App() {
  return (
    <div className="role-page">
      <div className="role-container">

        <h1>Welcome to LifeCare AI</h1>
        <p className="subtitle">
          How would you like to continue?
        </p>

        <div className="role-cards">

          <div className="role-card">
            <div className="role-icon">👤</div>
            <h2>Patient</h2>
            <p>
              Book appointments, view health information and manage your care.
            </p>
            <button onClick={() => window.location.href = "http://localhost:5174/"}>
              Continue
            </button>
          </div>

          <div className="role-card">
            <div className="role-icon">👨‍⚕️</div>
            <h2>Doctor</h2>
            <p>
              Manage appointments and provide better care to your patients.
            </p>
            <button onClick={() => window.location.href = "http://localhost:5175/"}>
              Continue
            </button>
          </div>

          <div className="role-card">
            <div className="role-icon">🩸</div>
            <h2>Blood Donor</h2>
            <p>
              Help patients by registering as a blood donor.
            </p>
            <button onClick={() => window.location.href = "http://localhost:5176/"}>Continue as Donor</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;