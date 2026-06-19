import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="container center">
        <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
        <p className="muted">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn mt-16">Back to home</Link>
      </div>
    </div>
  );
}
