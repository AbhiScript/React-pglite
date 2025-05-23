import React, { useEffect, useState } from "react";
import PaitentForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import SqlQueryBox from "./components/SqlQueryBox";
import { initializeDB } from "./db/pgliteClient";
import db from "./db/pgliteClient";
import { subscribeToUpdate } from "./utils/broadcast";

const App = () => {
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    const res = await db.exec("select * from patients");
    setPatients(res.rows);
  };

  useEffect(() => {
    (async () => {
      await initializeDB();
      await loadPatients();
    })();

    subscribeToUpdate(loadPatients);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">MediRegister - patients Registration System</h1>
      <PaitentForm onRegister={loadPatients} />
      <PatientList patients={patients} />
      <SqlQueryBox />
    </div>
  );
};
export default App;
