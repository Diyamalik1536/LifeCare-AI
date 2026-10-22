import { useState } from "react";
import "./Header.css";

function Header({ title = "Patient Dashboard", search, setSearch }) {
  // Pages don't control the search box, so fall back to local state.
  // (Previously typing here called an undefined setSearch and crashed.)
  const [localSearch, setLocalSearch] = useState("");
  const value = search !== undefined ? search : localSearch;
  const handleChange = (event) => {
    if (typeof setSearch === "function") setSearch(event.target.value);
    else setLocalSearch(event.target.value);
  };

  return (
    <header className="app-header">
      <h1>{title}</h1>

      <div className="app-header-search">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Search doctors, appointments..."
          aria-label="Search doctors and appointments"
          value={value}
          onChange={handleChange}
        />
      </div>

      <div className="app-header-profile">
        <div className="profile-avatar">👤</div>
        <div className="profile-text">
          <p className="profile-name">User</p>
          <p className="profile-role">Patient</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
