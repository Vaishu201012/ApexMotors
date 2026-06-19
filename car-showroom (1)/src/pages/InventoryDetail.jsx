import { useParams, Link, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

export default function InventoryDetail() {
  const { id } = useParams();
  const { cars, deleteCar } = useInventory();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));

  if (!car) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <p>Vehicle not found.</p>
            <Link to="/inventory" className="btn mt-16">Back to inventory</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <Link to="/inventory" className="muted">← Back to inventory</Link>
        <div className="grid grid-2 mt-16" style={{ alignItems: "start" }}>
          <img src={car.image} alt={car.name} style={{ width: "100%", borderRadius: 14 }} />
          <div className="card">
            <span className="badge">{car.type}</span>
            <h1 style={{ margin: "12px 0 4px" }}>{car.name}</h1>
            <p className="muted">{car.brand} · {car.year} · {car.fuel}</p>
            <h2 style={{ color: "var(--accent)" }}>${car.price.toLocaleString()}</h2>
            <p className="mt-16">{car.description}</p>
            <div className="flex gap-12 mt-24">
              <Link to={`/inventory/${car.id}/edit`} className="btn btn-outline">Edit</Link>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (confirm(`Delete ${car.name}?`)) {
                    deleteCar(car.id);
                    navigate("/inventory");
                  }
                }}
              >
                Delete vehicle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
