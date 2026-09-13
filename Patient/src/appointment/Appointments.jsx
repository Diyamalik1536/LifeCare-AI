import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./Appointments.css";

function Appointments({
  appointments,
  addAppointment
}) {

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header title="Appointments" />

        <section className="appointments-page">

          {/* Page Header */}
          <div className="page-header">

            <div>
              <h1>Appointments</h1>
              <p>View your appointments</p>
            </div>

            <br />

            {/* Book Appointment Button */}
            <button
              className="btn btn-primary"
              onClick={() => {

                addAppointment({
                  date: "20 Aug",
                  doctor: "Dr. New Doctor",
                  specialization: "General Physician",
                  time: "10:00 AM",
                  mode: "Online Consultation"
                });

              }}
            >
              + Book Appointment
            </button>

          </div>


          {/* Appointments List */}
          <div className="appointments-list">

            {appointments.map((appt) => (

              <div
                className="surface-card appt-card"
                key={appt.id}
              >

                <div className="appt-main">

                  <div className="appt-info">

                    <h3>{appt.doctor}</h3>

                    <p>
                      {appt.specialization || "General Consultation"}
                    </p>

                    <span className="appt-datetime">
                      {appt.date} &nbsp; {appt.time}
                    </span>

                  </div>


                  {/* Status */}
                  <span className="status-pill">
                    {appt.status}
                  </span>

                </div>

              </div>

            ))}


            

          </div>

        </section>

      </main>

    </div>
  );
}

export default Appointments;