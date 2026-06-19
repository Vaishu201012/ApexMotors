import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import CarCard from "../components/CarCard";

export default function Inventory() {
  const { cars, deleteCar } = useInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || "all";
  const query = searchParams.get("q") || "";
  const [localQuery, setLocalQuery] = useState(query);

  const types = ["all", ...new Set(cars.map((c) => c.type))];

  const filtered = cars.filter((car) => {
    const matchesType = type === "all" || car.type === type;
    const matchesQuery =
      query.trim() === "" ||
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.brand.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam("q", localQuery);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between" style={{ flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 className="page-title">Inventory</h1>
            <p className="page-subtitle">
              {filtered.length} of {cars.length} vehicles match your filters.
            </p>
          </div>
          <Link to="/inventory/new" className="btn">+ Add Vehicle</Link>
        </div>

        <div className="card flex gap-12" style={{ flexWrap: "wrap", marginBottom: 24 }}>
          <form onSubmit={handleSearchSubmit} className="flex gap-8" style={{ flex: 1, minWidth: 220 }}>
            <input
              placeholder="Search by name or brand..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
            <button className="btn btn-sm" type="submit">Search</button>
          </form>

          <select value={type} onChange={(e) => updateParam("type", e.target.value)} style={{ width: 180 }}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All types" : t}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No vehicles match your search.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car}>
                <div className="flex gap-8 mt-8">
                  <Link to={`/inventory/${car.id}/edit`} className="btn-ghost btn-sm">Edit</Link>
                  <button
                    className="btn-ghost btn-sm"
                    style={{ color: "var(--accent-soft)" }}
                    onClick={() => {
                      if (confirm(`Delete ${car.name}?`)) deleteCar(car.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </CarCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
