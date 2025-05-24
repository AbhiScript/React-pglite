import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import SqlQueryBox from "./components/SqlQueryBox";
import { subscribeToUpdate } from "./utils/broadcast";
import db, { initializeDB, refreshDB } from "./db/pgliteClient";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [alert, setAlert] = useState(null);

  const loadPatients = async () => {
    const result = await db.exec("SELECT * FROM patients ORDER BY id DESC");
    setPatients(result[0]?.rows ?? []);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    (async () => {
      await initializeDB();
      await loadPatients();
    })();

    subscribeToUpdate(async () => {
      console.log("Sync triggered from another tab");
      const rows = await refreshDB();
      setPatients(rows);
    });
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">🩺 MediRegister</h1>
        <p className="lead text-muted">Streamlined patient onboarding and record viewing</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <PatientForm onRegister={loadPatients} showAlert={showAlert} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <PatientList patients={patients} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <SqlQueryBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
