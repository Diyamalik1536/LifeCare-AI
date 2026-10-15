import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import Welcome from "./Welcome";
import StatCard from "./StatCard";
import HealthOverview from "./HealthOverview";
import QuickActions from "./QuickActions";
import RecentAppointments from "./RecentAppointments";
import "./Dashboard.css";

function Dashboard({ appointments }) {
  const activeAppointments = appointments.filter((appointment) =>
    ["Pending", "Confirmed", "Upcoming"].includes(appointment.status)
  ).length;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title="Patient Dashboard" />
        <section className="dashboard">
          <div className="dashboard-welcome">
            <Welcome name="User" />
          </div>

          <div className="stats">
            <StatCard
              icon="📅"
              iconBg="rgba(6, 182, 212, 0.12)"
              title="Appointments"
              value={activeAppointments}
              text="Active / upcoming"
            />
            <StatCard
              icon="📋"
              iconBg="rgba(6, 182, 212, 0.12)"
              title="Health Records"
              value="5"
              text="Total records"
            />
            <StatCard
              icon="🩸"
              iconBg="rgba(6, 182, 212, 0.12)"
              title="Blood Requests"
              value="1"
              text="Active request"
            />
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <HealthOverview />
            </div>
            <div className="dashboard-card">
              <QuickActions />
            </div>
          </div>

          <div className="dashboard-card recent-section">
            <RecentAppointments appointments={appointments} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
