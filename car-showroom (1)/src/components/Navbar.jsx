import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/inventory", label: "Inventory" },
  { to: "/contact", label: "Contact" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-soft)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container flex-between"
        style={{ height: 64 }}
      >
        <NavLink to="/" className="flex gap-8" style={{ fontWeight: 800, fontSize: "1.15rem" }}>
          <span style={{ color: "var(--accent)" }}>Apex</span>Motors
        </NavLink>

        <nav
          className={`flex gap-16 ${open ? "nav-open-wrapper" : ""}`}
          id="primary-nav"
        >
          <ul className={`nav-list ${open ? "nav-list-open" : ""}`}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-12">
          <button className="btn-ghost" onClick={toggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            className="btn-ghost nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <style>{`
        .nav-list {
          display: flex;
          gap: 22px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link {
          color: var(--muted);
          font-weight: 500;
          font-size: 0.92rem;
          padding: 6px 2px;
          border-bottom: 2px solid transparent;
        }
        .nav-link:hover { color: var(--text); }
        .nav-link.active { color: var(--text); border-color: var(--accent); }
        .nav-burger { display: none; font-size: 1.1rem; }

        @media (max-width: 800px) {
          .nav-burger { display: inline-flex; }
          #primary-nav {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background: var(--bg-soft);
            border-bottom: 1px solid var(--border);
          }
          #primary-nav.nav-open-wrapper { display: block; }
          .nav-list {
            flex-direction: column;
            padding: 16px 20px;
            gap: 14px;
          }
        }
      `}</style>
    </header>
  );
}
