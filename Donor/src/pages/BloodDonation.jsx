import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar.jsx";
import BloodInventoryOverview from "../components/BloodInventoryOverview.jsx";
import BloodAvailability from "../components/BloodAvailability.jsx";
import AvailableDonors from "../components/AvailableDonors.jsx";
import EmergencyRequests from "../components/EmergencyRequests.jsx";
import BecomeDonorModal from "../components/BecomeDonorModal.jsx";
import DonorRequests from "../components/DonorRequests.jsx";
import { addDonorRequest } from "../store/donorsSlice.js";

import {
  initialBloodInventory,
  initialDonors,
  initialEmergencyRequests,
} from "../data/mockData.js";

import "./BloodDonation.css";

export default function BloodDonation() {
  const inventory = initialBloodInventory;

  const dispatch = useDispatch();

  // Donors shown = approved registrations from the queue + the existing list
  const donorRequests = useSelector((state) => state.donors.requests);
  const approved = donorRequests.filter((request) => request.status === "Approved");
  const donors = [...approved, ...initialDonors];

  const requests = initialEmergencyRequests;

  const [donorModalOpen, setDonorModalOpen] = useState(false);

  function handleDonorSubmit(donorData) {
    // Goes to the queue first; it appears in the list once approved
    dispatch(addDonorRequest(donorData));

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

              <DonorRequests />

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