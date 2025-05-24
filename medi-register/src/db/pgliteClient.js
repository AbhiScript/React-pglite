// src/db/pgliteClient.js
import { PGlite } from '@electric-sql/pglite';

const db = new PGlite({
  wasmUrl: '/vendor/pglite.wasm',
});

export const initializeDB = async () => {
  await db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    gender TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
};

export default db;
