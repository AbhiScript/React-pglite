import React from "react";

const PatientList = ({ patients = [] }) => {
  return (
    <div className="card p-3 mb-4">
      <h4>All Patients</h4>
      <ul className="list-group">
        {patients.map((p) => (
          <li key={p.id} className="list-group-item">
            {p.name} ({p.age} y/o, {p.gender})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
