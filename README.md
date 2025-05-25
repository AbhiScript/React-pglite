# MediRegister

A modern, frontend-only **Patient Registration System** built using **React**, **Bootstrap**, and **PGlite**. This project enables browser-based SQL data storage, live sync between tabs, and SQL querying — all without a backend.

---

## Features

-  Register new patients (name, age, gender)
-  Query patient records using **raw SQL**
-  Data persistence using **IndexedDB** via PGlite
-  Real-time sync between browser tabs via **BroadcastChannel**
-  Responsive and clean **Bootstrap 5** UI
-  Built with React + Vite for a fast development experience

---

##  Project Structure & Explanation

```
medi-register/
├── public/
│   └── vendor/
│       └── pglite.wasm          # WebAssembly binary for PGlite DB engine
│
├── src/
│   ├── components/
│   │   ├── PatientForm.jsx      # Form UI to register new patients
│   │   ├── PatientList.jsx      # Component to display the patient list
│   │   └── SqlQueryBox.jsx      # Interface to input and execute raw SQL queries
│   │
│   ├── db/
│   │   └── pgliteClient.js      # PGlite DB config, initialization, refresh logic
│   │
│   ├── utils/
│   │   └── broadcast.js         # Sync logic using BroadcastChannel
│   │
│   └── App.jsx                  # Main application entry — integrates all components
│
├── index.html                  # HTML template used by Vite
├── package.json                # Project metadata and scripts
├── vite.config.js              # Vite configuration file
└── README.md                   # This file
```

---

## Setup Instructions

### 1. Clone and Navigate
```bash
git clone https://github.com/YOUR_USERNAME/medi-register.git
cd medi-register
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development
```bash
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

---

##  Build and Deployment

###  Local Production Build
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

### Deploy on Vercel
1. Push code to GitHub.
2. Visit [vercel.com](https://vercel.com), import the repository.
3. Ensure build command is set to `vite build` and output directory is `dist`

---

## File Explanations

### `App.jsx`
- Main UI component
- Loads patients from DB
- Hooks up `BroadcastChannel` sync
- Integrates the PatientForm, PatientList, and SQL query box

### `PatientForm.jsx`
- Bootstrap-powered form
- Lets users enter name, age, and gender
- Inserts new records into DB and triggers update sync

### `PatientList.jsx`
- Reads patient list from state
- Displays patient info using Bootstrap list group

### `SqlQueryBox.jsx`
- User-friendly SQL editor
- Executes any valid SQL using `db.exec`
- Displays results in a responsive table

### `broadcast.js`
- Uses `BroadcastChannel` API
- Notifies all tabs to reload patient data on update

### `pgliteClient.js`
- Initializes PGlite DB instance using WASM
- Configures DB to use `IndexedDB` for persistence
- Handles table creation, data fetch, and refresh logic

### `pglite.wasm`
- The PGlite WebAssembly binary required to run SQL natively in the browser


---

##  Known Limitations

### Limitations of PGlite

While PGlite is a powerful in-browser database based on SQLite, it has several **known limitations**:

1. **Multi-tab Sync Isolated**: Each tab runs an **independent copy** of the database, even though they share the same IndexedDB storage. Writes in one tab **do not instantly reflect** in others unless reloaded.

2. **No True Shared Memory**: Unlike server-based databases, PGlite lacks real-time coordination between instances. Broadcast messages can trigger re-fetching, but they don't guarantee **actual data sync** due to isolated memory.

3. **Data Overwrite Risk**: If two tabs write data at the same time, **only one tab's context** is considered active. There’s no conflict resolution.

4. **Schema Must Be Recreated**: Each new instance (e.g., opened tab) must **manually recreate the schema** to query or read data.

5. **Limited Write Performance**: PGlite is best for light, simple tasks. Complex relational logic or massive inserts may lead to performance issues.

###  Workaround Used
- Used `BroadcastChannel` to at least **trigger data reloads** across tabs.
- `refreshDB()` creates a temporary instance to read the latest state.

>  Despite these workarounds, true multi-tab database syncing is not currently supported due to PGlite’s in-browser design constraints.

We recommend using PGlite for **lightweight offline-friendly apps**, not real-time collaborative applications.

---

## Author

**Abhijeet Shastri**

- GitHub: [@AbhiScript](https://github.com/AbhiScript)
- Email: abhijeetshastri08@gmail.com

---

## License

This project is open-sourced under the **MIT License**.
