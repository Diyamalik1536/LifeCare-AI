import { Plus } from "lucide-react";
import "./Navbar.css";
import Logo from "./Logo";

export default function Navbar({ onBecomeDonor }) {
  return (
    <header className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Logo size={70} />
      </div>

      {/* Title */}
      <div className="navbar-content">
        <h1 className="navbar-title">
          Blood Availability & Donation
        </h1>

        <p className="navbar-subtitle">
          Check blood availability and help save lives by becoming a donor.
        </p>
      </div>

      {/* Button */}
      <div className="navbar-actions">
        <button
          onClick={onBecomeDonor}
          className="btn-become-donor"
        >
          <Plus size={15} />
          Become a Donor
        </button>
      </div>

    </header>
  );
}