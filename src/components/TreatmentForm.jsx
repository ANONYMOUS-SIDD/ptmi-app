import { useState } from "react";

const EMPTY_FORM = { id: "", type: "Physiotherapy", name: "", startDate: "" };

function TreatmentForm({ types, onSubmit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.id.trim() || !formData.name.trim() || !formData.startDate) {
      setError("Please complete all four fields before submitting.");
      return;
    }

    setError("");
    onSubmit({
      ...formData,
      id: formData.id.trim(),
      name: formData.name.trim(),
    });
    setFormData(EMPTY_FORM);
  }

  return (
    <form className="treatment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="treatment-id">Treatment ID</label>
        <input
          id="treatment-id"
          name="id"
          type="text"
          value={formData.id}
          onChange={handleChange}
          placeholder="TRT-007"
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label htmlFor="treatment-type">Treatment Type</label>
        <div className="select-wrap">
          <select
            id="treatment-type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="treatment-name">Treatment Name</label>
        <input
          id="treatment-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Weekly physiotherapy review"
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label htmlFor="treatment-date">Start Date</label>
        <input
          id="treatment-date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="submit-button">
        <span>Display Entered Treatment</span>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}

export default TreatmentForm;
