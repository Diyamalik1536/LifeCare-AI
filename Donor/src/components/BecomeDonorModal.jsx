import { useState } from "react";
import { X, Droplet } from "lucide-react";

import { BLOOD_GROUPS } from "../data/mockData.js";

import "./BecomeDonorModal.css";

const EMPTY_FORM = {
  name: "",
  bloodGroup: "",
  age: "",
  location: "",
  contact: "",
  availability: "Available",
  lastDonation: "",
  agree: false,
};

export default function BecomeDonorModal({
  open,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validate() {
    const next = {};

    if (!form.name.trim()) {
      next.name = "Name is required";
    }

    if (!form.bloodGroup) {
      next.bloodGroup = "Select a blood group";
    }

    if (
      !form.age ||
      Number(form.age) < 18 ||
      Number(form.age) > 65
    ) {
      next.age = "Age must be between 18 and 65";
    }

    if (!form.location.trim()) {
      next.location = "Location is required";
    }

    if (!/^\+?[0-9\s-]{10,15}$/.test(form.contact.trim())) {
      next.contact = "Enter a valid contact number";
    }

    if (!form.agree) {
      next.agree = "You must agree to be contacted";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
      bloodType: form.bloodGroup,
      age: Number(form.age),
      location: form.location.trim(),

      distanceKm:
        Math.round((Math.random() * 20 + 0.5) * 10) / 10,

      contact: form.contact.trim(),
      availability: form.availability,
      lastDonation: form.lastDonation || null,
      eligible: true,
    });

    setForm(EMPTY_FORM);
    setErrors({});
  }

  return (
    <div className="modal-overlay">
      <div className="modal-panel">

        {/* Header */}
        <div className="modal-panel-header">

          <div className="modal-title-row">
            <div className="modal-icon modal-icon-brand">
              <Droplet size={18} />
            </div>

            <h3 className="modal-title">
              Become a Blood Donor
            </h3>
          </div>

          <button
            onClick={onClose}
            className="modal-close-btn"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="become-donor-form"
        >

          {/* Name */}
          <Field label="Full Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) =>
                update("name", e.target.value)
              }
              type="text"
              placeholder="e.g. Aditi Sharma"
              className={inputClass(errors.name)}
            />
          </Field>

          {/* Blood Group + Age */}
          <div className="field-row">

            <Field
              label="Blood Group"
              error={errors.bloodGroup}
            >
              <select
                value={form.bloodGroup}
                onChange={(e) =>
                  update("bloodGroup", e.target.value)
                }
                className={inputClass(errors.bloodGroup)}
              >
                <option value="">Select</option>

                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Age" error={errors.age}>
              <input
                value={form.age}
                onChange={(e) =>
                  update("age", e.target.value)
                }
                type="number"
                min="18"
                max="65"
                placeholder="18-65"
                className={inputClass(errors.age)}
              />
            </Field>

          </div>

          {/* Location */}
          <Field label="Location" error={errors.location}>
            <input
              value={form.location}
              onChange={(e) =>
                update("location", e.target.value)
              }
              type="text"
              placeholder="City / Locality"
              className={inputClass(errors.location)}
            />
          </Field>

          {/* Contact */}
          <Field
            label="Contact Number"
            error={errors.contact}
          >
            <input
              value={form.contact}
              onChange={(e) =>
                update("contact", e.target.value)
              }
              type="tel"
              placeholder="+91 98765 43210"
              className={inputClass(errors.contact)}
            />
          </Field>

          {/* Availability + Last Donation */}
          <div className="field-row">

            <Field label="Availability">
              <select
                value={form.availability}
                onChange={(e) =>
                  update("availability", e.target.value)
                }
                className={inputClass()}
              >
                <option>Available</option>
                <option>On Call</option>
                <option>Unavailable</option>
              </select>
            </Field>

            <Field label="Last Donation Date">
              <input
                value={form.lastDonation}
                onChange={(e) =>
                  update("lastDonation", e.target.value)
                }
                type="date"
                className={inputClass()}
              />
            </Field>

          </div>

          {/* Agreement */}
          <label className="field-checkbox-label">

            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) =>
                update("agree", e.target.checked)
              }
              className="field-checkbox"
            />

            I agree to be contacted for blood donation requests.

          </label>

          {errors.agree && (
            <p className="field-error">
              {errors.agree}
            </p>
          )}

          {/* Buttons */}
          <div className="modal-actions">

            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
            >
              Register as Donor
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}



function Field({ label, error, children }) {
  return (
    <div className="field">

      <label className="field-label">
        {label}
      </label>

      {children}

      {error && (
        <p className="field-error">
          {error}
        </p>
      )}

    </div>
  );
}



function inputClass(error) {
  return `field-input ${
    error ? "field-input-error" : ""
  }`;
}