import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import BloodInventoryOverview from "../components/BloodInventoryOverview.jsx";
import BloodAvailability from "../components/BloodAvailability.jsx";
import AvailableDonors from "../components/AvailableDonors.jsx";
import EmergencyRequests from "../components/EmergencyRequests.jsx";
import BecomeDonorModal from "../components/BecomeDonorModal.jsx";

import {
  initialBloodInventory,
  initialDonors,
  initialEmergencyRequests,
  generateId,
} from "../data/mockData.js";

import "./BloodDonation.css";

export default function BloodDonation() {
  const inventory = initialBloodInventory;

  const [donors, setDonors] = useState(initialDonors);

  const requests = initialEmergencyRequests;

  const [donorModalOpen, setDonorModalOpen] = useState(false);

  function handleDonorSubmit(donorData) {
    const newDonor = {
      id: generateId("d"),
      ...donorData,
    };

    setDonors((prev) => [newDonor, ...prev]);

    setDonorModalOpen(false);
  }

  return (
    <div className="page-shell">

      <div className="page-content">

        <Navbar
          onBecomeDonor={() => setDonorModalOpen(true)}
        />

        <main className="page-main">

          {/* Blood Inventory */}
          <section id="blood-inventory">
            <BloodInventoryOverview
              inventory={inventory}
            />
          </section>

          {/* Blood Availability + Donors */}
          <div className="dashboard-grid">

            <div className="dashboard-grid-primary">

              <BloodAvailability
                inventory={inventory}
              />

              <EmergencyRequests
                requests={requests}
              />

            </div>

            <div className="dashboard-grid-secondary">

              <AvailableDonors
                donors={donors}
              />

              <button
                onClick={() => setDonorModalOpen(true)}
                className="btn-become-donor-mobile"
              >
                + Become a Blood Donor
              </button>

            </div>

          </div>

        </main>
      </div>

      {/* Become Donor Modal */}
      <BecomeDonorModal
        open={donorModalOpen}
        onClose={() => setDonorModalOpen(false)}
        onSubmit={handleDonorSubmit}
      />

    </div>
  );
}