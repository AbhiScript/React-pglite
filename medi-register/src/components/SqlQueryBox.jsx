import React, { useState } from "react";
import db from "../db/pgliteClient";

const SqlQueryBox = () => {
  const [query, setQuery] = useState("SELECT * FROM patients;");
  const [result, setResult] = useState([]);

  const runQuery = async () => {
    try {
      const res = await db.exec(query);
      setResult(res[0]?.rows ?? []);
    } catch (err) {
      alert("Invalid SQL");
      setResult([]);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="mb-3">Run SQL Query</h4>
      <div className="mb-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
          rows={4}
        />
      </div>
      <button onClick={runQuery} className="btn btn-success mb-4">
        Execute
      </button>

      <div>
        <h5 className="mb-3">Query Results</h5>
        {Array.isArray(result) && result.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
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
                      <td key={j}>
                        {val instanceof Date
                          ? val.toLocaleString()
                          : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-muted">No results to display</div>
        )}
      </div>
    </div>
  );
};

export default SqlQueryBox;
