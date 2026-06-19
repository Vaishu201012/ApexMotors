import { useRef, useState } from "react";
import { useFormValidation } from "../hooks/useFormValidation";

const initial = { name: "", email: "", subject: "Sales", message: "" };

function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim() || values.message.trim().length < 15) {
    errors.message = "Message should be at least 15 characters.";
  }
  return errors;
}

export default function Contact() {
  const { values, errors, submitted, handleChange, handleSubmit, reset } =
    useFormValidation(initial, validateContact);
  const [sent, setSent] = useState(false);
  const nameInputRef = useRef(null);

  const onValid = () => {
    setSent(true);
    reset();
    nameInputRef.current?.focus();
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          Have a question about a vehicle, service booking, or financing? Send us a
          message and our team will get back to you within one business day.
        </p>

        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <form className="card" onSubmit={handleSubmit(onValid)} noValidate>
            {sent && (
              <div
                className="badge mt-8"
                style={{ display: "block", marginBottom: 14, background: "rgba(46,160,67,0.15)", color: "#7ee08a" }}
              >
                Message sent! We'll be in touch soon.
              </div>
            )}
            <div className="field">
              <label>Full name</label>
              <input ref={nameInputRef} name="name" value={values.name} onChange={handleChange} />
              {submitted && errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Email</label>
              <input name="email" value={values.email} onChange={handleChange} />
              {submitted && errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="field">
              <label>Subject</label>
              <select name="subject" value={values.subject} onChange={handleChange}>
                {["Sales", "Maintenance", "Insurance", "Other"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Message</label>
              <textarea name="message" rows={5} value={values.message} onChange={handleChange} />
              {submitted && errors.message && <span className="error-text">{errors.message}</span>}
            </div>
            <button type="submit" className="btn">Send message</button>
          </form>

          <div className="card">
            <h3>Visit our showroom</h3>
            <p className="muted">123 Drive Lane, Motor City, MC 10101</p>
            <p className="muted">Open Mon–Sat, 9am – 7pm</p>
            <h3 className="mt-24">Reach us directly</h3>
            <p className="muted">sales@apexmotors.example</p>
            <p className="muted">+1 (555) 010-2030</p>
          </div>
        </div>
      </div>
    </div>
  );
}
