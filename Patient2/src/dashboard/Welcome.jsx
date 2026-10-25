import "./Welcome.css";

function Welcome({ name }) {
  return (
    <div className="welcome-card">
      <h2>
        Welcome back, {name}! <span className="wave">👋</span>
      </h2>
      <p>How are you feeling today?</p>
    </div>
  );
}

export default Welcome;
