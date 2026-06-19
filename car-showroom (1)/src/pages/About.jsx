const team = [
  { name: "Rhea Kapoor", role: "Founder & CEO", years: 18 },
  { name: "Marcus Lin", role: "Head of Sales", years: 11 },
  { name: "Sofia Alvarez", role: "Lead Technician", years: 9 },
  { name: "Daniel Obi", role: "Finance Manager", years: 7 },
];

export default function About() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">About ApexMotors</h1>
        <p className="page-subtitle">
          We've been connecting drivers with the right vehicle since 2007 — starting as a
          single showroom and growing into a full-service automotive group.
        </p>

        <div className="grid grid-2">
          <div className="card">
            <h3>Our story</h3>
            <p className="muted">
              ApexMotors started in a small lot with twelve cars and a promise: no hidden
              fees, no pressure, just honest advice. That promise is still the core of how
              we operate today, across sales, service, and financing.
            </p>
          </div>
          <div className="card">
            <h3>Our mission</h3>
            <p className="muted">
              To make buying, financing, and maintaining a car feel as easy as it should
              be — backed by transparent pricing and technicians who treat every car like
              their own.
            </p>
          </div>
        </div>

        <h2 className="mt-32">Leadership team</h2>
        <div className="grid grid-4 mt-16">
          {team.map((person) => (
            <div key={person.name} className="card center">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  margin: "0 auto 10px",
                  color: "#fff",
                }}
              >
                {person.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <strong>{person.name}</strong>
              <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>
                {person.role}
              </p>
              <span className="tag mt-8" style={{ display: "inline-block" }}>
                {person.years} yrs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
