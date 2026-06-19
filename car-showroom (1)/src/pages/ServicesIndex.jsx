import { services } from "../data/carData";
import { Link } from "react-router-dom";

export default function ServicesIndex() {
  return (
    <div className="grid grid-2">
      {services.map((s) => (
        <div key={s.slug} className="card">
          <h3>{s.title}</h3>
          <p className="muted">{s.summary}</p>
          <Link to={s.slug} className="btn btn-sm btn-outline mt-8">
            Learn more
          </Link>
        </div>
      ))}
    </div>
  );
}
