import { Siren } from "lucide-react";
import EmergencyRequestCard from "./EmergencyRequestCard.jsx";
import "./EmergencyRequests.css";

export default function EmergencyRequests({ requests }) {

  const sorted = [...requests].sort((a, b) => {
    const order = {
      Critical: 0,
      High: 1,
      Medium: 2,
      Normal: 3,
    };

    return order[a.urgency] - order[b.urgency];
  });

  return (
    <section id="emergency-requests" className="emergency-section">

      <div className="emergency-header">

        <div className="emergency-icon">
          <Siren size={18} />
        </div>

        <div>
          <h2 className="emergency-title">
            Emergency Blood Requests
          </h2>

          <p className="emergency-subtitle">
            {sorted.length} hospitals currently coordinating emergency requests
          </p>
        </div>

      </div>

      <div className="emergency-grid">

        {sorted.map((request) => (
          <EmergencyRequestCard
            key={request.id}
            request={request}
          />
        ))}

      </div>

    </section>
  );
}

