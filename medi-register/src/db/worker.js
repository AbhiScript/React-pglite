import initSqlJs from '@electric-sql/pglite/dist/sql-wasm.js';

initSqlJs().then((SQL) => {
  self.postMessage({ ready: true, SQL });
});
