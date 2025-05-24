import React, { useState } from "react";
import db from "../db/pgliteClient";

const SqlQueryBox = () => {
  const [query, setQuery] = useState("select * from patients;");
  const [result, setResult] = useState([]);

  const runQuery = async () => {
    try {
      const res = await db.exec(query);
      setResult(res.rows ?? []);
    } catch (err) {
      alert("Invalid SQL");
      setResult([]); // reset result on failure
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Run SQL Querry</h4>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={runQuery} className="btn btn-success mb-3">
        Execute
      </button>
      {Array.isArray(result) && result.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              {Object.keys(result[0]).map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SqlQueryBox;
