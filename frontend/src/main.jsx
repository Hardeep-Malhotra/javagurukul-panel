// 📄 frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Agar tumhari CSS file ka naam alag hai to wo check kar lena

// 🌟 CRITICAL FIX: Sahi Provider file (.jsx extension) se wrapper import kiya
import { StudentAuthProvider } from "./context/StudentAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentAuthProvider>
      <App />
    </StudentAuthProvider>
  </React.StrictMode>,
);
