import React, { useState } from "react";
import db from "../db/pgliteClient";
import { broadcastUpdate } from "../utils/broadcast";
import { refreshDB } from "../db/pgliteClient";

const PatientForm = ({ onRegister }) => {
  const [form, setForm] = useState({ name: "", age: "", gender: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const { name, age, gender } = form;
    if (!name || !age || !gender) return alert("Fill all fields");

    const safeName = name.replace(/'/g, "''");
    const safeGender = gender.replace(/'/g, "''");

    // 🔁 Ensure latest state is loaded before writing
    await refreshDB(); // read to sync with disk

    await db.exec(`
      INSERT INTO patients (name, age, gender)
      VALUES ('${safeName}', ${parseInt(age)}, '${safeGender}');
    `);

    setForm({ name: "", age: "", gender: "" });
    await onRegister();
    setTimeout(() => broadcastUpdate(), 100);
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Register Patients</h4>
      <input
        name="name"
        className="form-control my-2"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="age"
        className="form-control my-2"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <input
        name="gender"
        className="form-control my-2"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
      />
      <button onClick={register} className="btn btn-primary">
        Register
      </button>
    </div>
  );
};

export default PatientForm;
