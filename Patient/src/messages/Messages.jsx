import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import "./Messages.css";

const THREADS = [
  {
    id: 1,
    doctor: "Dr. Rahul Sharma",
    role: "General Physician",
    message: "Please continue the medication for 5 more days.",
    time: "10:40 AM",
    unread: true,
  },
  {
    id: 2,
    doctor: "Dr. Priya Mehta",
    role: "Dermatologist",
    message: "Your allergy test results look normal.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    doctor: "Dr. Amit Verma",
    role: "Cardiologist",
    message: "Let's schedule a follow-up next week.",
    time: "2 days ago",
    unread: false,
  },
];

function Messages() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header title="Messages" />

        <section className="messages-page">

          <div className="page-header">
            <h1>Messages</h1>
            <p>Chat directly with your doctors</p>
          </div>

          <div className="surface-card messages-layout">

            <aside className="thread-list">

              {THREADS.map((t) => (

                <div
                  key={t.id}
                  className="thread-item"
                >

                  <div className="thread-avatar">
                    👨‍⚕️
                  </div>

                  <div className="thread-info">

                    <h4>{t.doctor}</h4>

                    <p>{t.message}</p>

                  </div>

                  {t.unread && (
                    <span className="unread-dot" />
                  )}

                </div>

              ))}

            </aside>

            <div className="chat-panel">

              <div className="chat-header">

                <div className="thread-avatar">
                  👨‍⚕️
                </div>

                <div>
                  <h3>Dr. Rahul Sharma</h3>
                  <p>General Physician</p>
                </div>

              </div>

              <div className="chat-body">

                <div className="msg incoming">
                  <p>
                    Please continue the medication for 5 more days.
                  </p>
                  <span>10:40 AM</span>
                </div>

                <div className="msg incoming">
                  <p>
                    Let me know if the fever comes back.
                  </p>
                  <span>10:45 AM</span>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Messages;