import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Profile() {
  const [userId, setUserId] = useState(1);
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="page-title">Customer Profile</h1>
        <p className="page-subtitle">
          This page calls a live public API (JSONPlaceholder) through a custom{" "}
          <code>useFetch</code> hook to demonstrate API integration, loading and error
          states.
        </p>

        <div className="card">
          <div className="flex gap-12 mt-8" style={{ marginBottom: 18 }}>
            <label className="muted" style={{ fontSize: "0.85rem" }}>Customer ID:</label>
            <select value={userId} onChange={(e) => setUserId(Number(e.target.value))} style={{ width: 120 }}>
              {[1, 2, 3, 4, 5].map((id) => (
                <option key={id} value={id}>#{id}</option>
              ))}
            </select>
          </div>

          {loading && <p className="muted">Loading customer data...</p>}
          {error && <p className="error-text">Could not load profile: {error}</p>}

          {!loading && !error && user && (
            <div className="flex gap-16" style={{ alignItems: "flex-start" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  flexShrink: 0,
                }}
              >
                {user.name?.[0]}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{user.name}</h2>
                <p className="muted" style={{ margin: "2px 0 12px" }}>@{user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Company:</strong> {user.company?.name}</p>
                <p><strong>City:</strong> {user.address?.city}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
