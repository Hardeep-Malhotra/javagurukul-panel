// 📄 frontend/src/App.jsx
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import AdminLayout from "./components/Layout/AdminLayout";
import BatchManagement from "./pages/BatchManagement"; // 🌟 1. NEW IMPORT: Batch component ko link kiya

// 🎓 Student Portal Components Imports
import StudentLogin from "./pages/student/StudentLogin";
import PortalHome from "./pages/student/PortalHome";
import StudentNavbar from "./components/StudentPortal/StudentNavbar";
import StudentSidebar from "./components/StudentPortal/StudentSidebar";
import StudentVideoPlayer from "./pages/student/StudentVideoPlayer";
import { useStudentAuth } from "./context/StudentAuthContext";
import socket from "../src/socket"




// ==========================================
// 🛡️ ADMIN PANEL ROUTE GUARD
// ==========================================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminUser");
  return token ? children : <Navigate to="/" />;
};

// ==========================================
// 🛡️ STUDENT PORTAL ROUTE GUARD
// ==========================================
const StudentProtectedRoute = ({ children }) => {
  const { student } = useStudentAuth();
  return student ? children : <Navigate to="/student/login" />;
};

// 📄 frontend/src/App.jsx

// ==========================================
// 🎛️ STUDENT PORTAL STRUCTURE LAYOUT
// ==========================================
const StudentLayout = () => {
  const [activeTab, setActiveTab] = useState("lectures");

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      <StudentNavbar />
      <div className="flex flex-col md:flex-row flex-1">
        <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {/* 🌟 FIXED: activeTab ke saath setActiveTab bhi pass kar diya */}
          <Outlet context={{ activeTab, setActiveTab }} />
        </main>
      </div>
    </div>
  );
};

// ==========================================
// 🚀 MAIN APP ENGINE ROUTER
// ==========================================
const App = () => {


  
   useEffect(() => {

    socket.on("connect", () => {
      console.log("🟢 Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };

  }, []);

  return (
    <Router>
      <Routes>
        {/* ... Admin Routes same rahenge ... */}
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/admin/batches" element={<BatchManagement />} />
        </Route>

        {/* ==================================
            🎓 STUDENT PORTAL ENDPOINTS
           ================================== */}
        <Route path="/student/login" element={<StudentLogin />} />

        <Route
          element={
            <StudentProtectedRoute>
              <StudentLayout />
            </StudentProtectedRoute>
          }
        >
          <Route path="/student/portal" element={<PortalHome />} />
          <Route
            path="/student/watch/:videoId"
            element={<StudentVideoPlayer />}
          />
        </Route>

        {/* 🔄 Wildcard Fallback Router Catch */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
