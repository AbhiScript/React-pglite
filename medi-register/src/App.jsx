import React, { useEffect, useState } from "react";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import SqlQueryBox from "./components/SqlQueryBox";
import db, { initializeDB } from "./db/pgliteClient";
import { subscribeToUpdate } from "./utils/broadcast";

const App = () => {
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    const result = await db.exec("SELECT * FROM patients ORDER BY id DESC");
    console.log("Loaded patients:", result[0]?.rows);
    setPatients(result[0]?.rows ?? []);
  };

  useEffect(() => {
    (async () => {
      await initializeDB();
      await loadPatients();
    })();

    // listen to cross-tab sync
    subscribeToUpdate(loadPatients);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">MediRegister - Patient Registration System</h1>
      <PatientForm onRegister={loadPatients} />
      <PatientList patients={patients} />
      <SqlQueryBox />
    </div>
  );
};

export default App;
