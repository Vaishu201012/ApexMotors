import { NavLink, Outlet } from "react-router-dom";
import { services } from "../data/carData";

export default function Services() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">
          Select a service below to see the details. This section demonstrates nested
          routing — each service renders inside this page via an Outlet.
        </p>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          <aside style={{ minWidth: 220 }}>
            <div className="card" style={{ padding: 10 }}>
              {services.map((s) => (
                <NavLink
                  key={s.slug}
                  to={s.slug}
                  className={({ isActive }) =>
                    "service-link" + (isActive ? " service-link-active" : "")
                  }
                >
                  {s.title}
                </NavLink>
              ))}
            </div>
          </aside>

          <div style={{ flex: 1, minWidth: 280 }}>
            <Outlet />
          </div>
        </div>

        <style>{`
          .service-link {
            display: block;
            padding: 10px 12px;
            border-radius: 8px;
            color: var(--muted);
            font-size: 0.9rem;
            margin-bottom: 4px;
          }
          .service-link:hover { background: var(--bg-soft); color: var(--text); }
          .service-link-active { background: var(--accent); color: #fff; }
        `}</style>
      </div>
    </div>
  );
}
