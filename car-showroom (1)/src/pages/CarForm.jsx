import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { useFormValidation } from "../hooks/useFormValidation";

const emptyCar = {
  name: "",
  brand: "",
  type: "Sedan",
  price: "",
  year: "",
  fuel: "Petrol",
  image: "",
  description: "",
};

function validateCar(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.brand.trim()) errors.brand = "Brand is required.";
  if (!values.price || Number(values.price) <= 0) errors.price = "Enter a valid price.";
  if (!values.year || Number(values.year) < 1990 || Number(values.year) > 2027) {
    errors.year = "Enter a year between 1990 and 2027.";
  }
  if (!values.description.trim() || values.description.trim().length < 10) {
    errors.description = "Description should be at least 10 characters.";
  }
  if (values.image && !/^https?:\/\//.test(values.image)) {
    errors.image = "Image must be a valid URL starting with http(s)://";
  }
  return errors;
}

export default function CarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, addCar, updateCar } = useInventory();
  const isEdit = Boolean(id);
  const existing = isEdit ? cars.find((c) => c.id === Number(id)) : null;

  const { values, errors, submitted, handleChange, handleSubmit, setValues } =
    useFormValidation(emptyCar, validateCar);

  useEffect(() => {
    if (existing) setValues(existing);
  }, [existing, setValues]);

  if (isEdit && !existing) {
    return (
      <div className="page">
        <div className="container empty-state">Vehicle not found.</div>
      </div>
    );
  }

  const onValid = (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      year: Number(data.year),
      image:
        data.image ||
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
    };
    if (isEdit) {
      updateCar({ ...payload, id: existing.id });
      navigate(`/inventory/${existing.id}`);
    } else {
      addCar(payload);
      navigate("/inventory");
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 className="page-title">{isEdit ? "Edit Vehicle" : "Add New Vehicle"}</h1>
        <p className="page-subtitle">
          {isEdit ? "Update the details for this listing." : "Fill in the details to add a vehicle to the inventory."}
        </p>

        <form className="card" onSubmit={handleSubmit(onValid)} noValidate>
          <div className="grid grid-2">
            <div className="field">
              <label>Name</label>
              <input name="name" value={values.name} onChange={handleChange} placeholder="e.g. Velocia GT" />
              {submitted && errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Brand</label>
              <input name="brand" value={values.brand} onChange={handleChange} placeholder="e.g. Auralis" />
              {submitted && errors.brand && <span className="error-text">{errors.brand}</span>}
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label>Type</label>
              <select name="type" value={values.type} onChange={handleChange}>
                {["Sedan", "SUV", "Sports", "Electric", "Truck", "Convertible"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Fuel</label>
              <select name="fuel" value={values.fuel} onChange={handleChange}>
                {["Petrol", "Diesel", "Hybrid", "Electric"].map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label>Price (USD)</label>
              <input name="price" type="number" value={values.price} onChange={handleChange} placeholder="e.g. 42000" />
              {submitted && errors.price && <span className="error-text">{errors.price}</span>}
            </div>
            <div className="field">
              <label>Year</label>
              <input name="year" type="number" value={values.year} onChange={handleChange} placeholder="e.g. 2025" />
              {submitted && errors.year && <span className="error-text">{errors.year}</span>}
            </div>
          </div>

          <div className="field">
            <label>Image URL (optional)</label>
            <input name="image" value={values.image} onChange={handleChange} placeholder="https://..." />
            {submitted && errors.image && <span className="error-text">{errors.image}</span>}
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              name="description"
              rows={4}
              value={values.description}
              onChange={handleChange}
              placeholder="A short description of the vehicle..."
            />
            {submitted && errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="flex gap-12 mt-16">
            <button type="submit" className="btn">{isEdit ? "Save Changes" : "Add Vehicle"}</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
