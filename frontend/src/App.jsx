// 📄 frontend/src/App.jsx
import { useState } from "react";
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

// 🎓 Student Portal Components Imports
import StudentLogin from "./pages/student/StudentLogin";
import PortalHome from "./pages/student/PortalHome";
import StudentNavbar from "./components/StudentPortal/StudentNavbar";
import StudentSidebar from "./components/StudentPortal/StudentSidebar";
import StudentVideoPlayer from "./pages/student/StudentVideoPlayer";
import { useStudentAuth } from "./context/StudentAuthContext";

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
  // Agar student state null hai (Logged out), toh direct login panel par bhej do
  return student ? children : <Navigate to="/student/login" />;
};

// ==========================================
// 🎛️ STUDENT PORTAL STRUCTURE LAYOUT
// ==========================================
const StudentLayout = () => {
  const [activeTab, setActiveTab] = useState("lectures");

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      {/* Fixed Top Grid Navbar */}
      <StudentNavbar />

      {/* Main Body content with responsive panel sidebar */}
      <div className="flex flex-col md:flex-row flex-1">
        <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {/* React Router Context helps relaying state variables to nested PortalHome views */}
          <Outlet context={{ activeTab }} />
        </main>
      </div>
    </div>
  );
};

// ==========================================
// 🚀 MAIN APP ENGINE ROUTER
// ==========================================
const App = () => {
  return (
    <Router>
      <Routes>
        {/* ==================================
            🔒 ADMIN PANEL ENDPOINTS
           ================================== */}
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
        </Route>

        {/* ==================================
            🎓 STUDENT PORTAL ENDPOINTS
           ================================== */}
        {/* Public Login Gateway Gate */}
        <Route path="/student/login" element={<StudentLogin />} />

        {/* Protected Inner System Interface View Elements */}
        <Route
          element={
            <StudentProtectedRoute>
              <StudentLayout />
            </StudentProtectedRoute>
          }
        >
          {/* Mapped inside Layout context view index element */}
          <Route path="/student/portal" element={<PortalHome />} />
        </Route>

        <Route
          path="/student/watch/:videoId"
          element={<StudentVideoPlayer />}
        />
        {/* 🔄 Wildcard Fallback Router Catch */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
