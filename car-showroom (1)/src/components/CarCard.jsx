import { Link } from "react-router-dom";

export default function CarCard({ car, children }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12, padding: 0, overflow: "hidden" }}>
      <img
        src={car.image}
        alt={car.name}
        style={{ width: "100%", height: 170, objectFit: "cover" }}
        loading="lazy"
      />
      <div style={{ padding: "0 18px 18px" }}>
        <div className="flex-between">
          <h3 style={{ margin: "10px 0 4px" }}>{car.name}</h3>
          <span className="badge">{car.type}</span>
        </div>
        <p className="muted" style={{ fontSize: "0.88rem", margin: "0 0 10px" }}>
          {car.brand} · {car.year} · {car.fuel}
        </p>
        <div className="flex-between">
          <strong style={{ color: "var(--accent)" }}>${car.price.toLocaleString()}</strong>
          <Link to={`/inventory/${car.id}`} className="btn btn-sm btn-outline">
            View details
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
