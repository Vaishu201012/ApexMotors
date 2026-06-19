import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import CarCard from "../components/CarCard";

export default function Home() {
  const { cars } = useInventory();
  const featured = cars.slice(0, 3);

  return (
    <div className="page">
      <div className="container">
        <section
          className="card"
          style={{
            padding: "50px 36px",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, var(--card), var(--bg-soft))",
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <span className="badge">Showroom open today</span>
            <h1 style={{ fontSize: "2.4rem", margin: "14px 0 10px" }}>
              Find the car that fits your road.
            </h1>
            <p className="muted">
              ApexMotors brings together sports cars, SUVs, electric vehicles and trucks
              in one curated showroom — with transparent pricing, real inspections, and a
              team that's actually fun to talk to.
            </p>
            <div className="flex gap-12 mt-24">
              <Link to="/inventory" className="btn">Browse Inventory</Link>
              <Link to="/services" className="btn btn-outline">Our Services</Link>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=520&auto=format&fit=crop"
            alt="Featured car"
            style={{ width: 320, borderRadius: 12, maxWidth: "100%" }}
          />
        </section>

        <section className="mt-32">
          <div className="flex-between">
            <h2>Featured vehicles</h2>
            <Link to="/inventory" className="muted">See all →</Link>
          </div>
          <div className="grid grid-3 mt-16">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        <section className="grid grid-4 mt-32">
          {[
            { label: "Cars in stock", value: cars.length + "+" },
            { label: "Years in business", value: "18" },
            { label: "Service centers", value: "6" },
            { label: "Happy customers", value: "12k+" },
          ].map((stat) => (
            <div key={stat.label} className="card center">
              <h2 style={{ margin: 0, color: "var(--accent)" }}>{stat.value}</h2>
              <p className="muted" style={{ margin: "6px 0 0" }}>{stat.label}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
