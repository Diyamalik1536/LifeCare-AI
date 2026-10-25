import "./Header.css";

function Header({ title = "Patient Dashboard", search, setSearch }) {
  return (
    <header className="app-header">
      <h1>{title}</h1>

      <div className="app-header-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search doctors, appointments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="app-header-profile">
        <div className="profile-avatar">👤</div>
        <div>
          <p className="profile-name">User</p>
          <p className="profile-role">Patient</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
