export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "26px 0", background: "var(--bg-soft)" }}>
      <div className="container flex-between" style={{ flexWrap: "wrap", gap: 12 }}>
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} ApexMotors. Built for the React training final project.
        </span>
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          Made with React + React Router
        </span>
      </div>
    </footer>
  );
}
