import { PGlite } from "@electric-sql/pglite";

export const createNewInstance = () => new PGlite({
  wasmUrl: "/vendor/pglite.wasm",
  storage: "indexeddb",
  dbName: "mediregister",
});

const db = createNewInstance();

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

export const refreshDB = async () => {
  const tempDb = createNewInstance();
  await tempDb.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT,
      age INTEGER,
      gender TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  const result = await tempDb.exec("SELECT * FROM patients ORDER BY id DESC");
  return result[0]?.rows ?? [];
};

export default db;
