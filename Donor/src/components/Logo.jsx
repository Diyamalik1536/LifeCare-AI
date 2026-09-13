import "./Logo.css";

export default function Logo({ size = 70, className = "" }) {
  return (
    <div className={`logo ${className}`}>
      <img
        src="/Logo.jpeg"
        alt="LifeCare AI"
        className="logo-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
}