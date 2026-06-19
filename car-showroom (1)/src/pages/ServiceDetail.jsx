import { useParams, Link } from "react-router-dom";
import { services } from "../data/carData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="empty-state">
        <p>Service not found.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <span className="badge">{service.slug}</span>
      <h2 className="mt-8">{service.title}</h2>
      <p className="muted">{service.summary}</p>
      <p className="mt-16">{service.details}</p>
      <Link to="/contact" className="btn mt-16">Request this service</Link>
    </div>
  );
}
