// 📄 src/App.jsx

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./pages/Login";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import BatchManagement from "./pages/BatchManagement";
import VideoManagement from "./pages/VideoManagement";
import MeetingManagement from "./pages/MeetingManagement";
import MeetingRoom from "./pages/MeetingRoom";

import AdminLayout from "./components/Layout/AdminLayout";

// Student Portal
import StudentLogin from "./pages/student/StudentLogin";
import PortalHome from "./pages/student/PortalHome";
import StudentNavbar from "./components/StudentPortal/StudentNavbar";
import StudentSidebar from "./components/StudentPortal/StudentSidebar";
import StudentVideoPlayer from "./pages/student/StudentVideoPlayer";
import StudentMeetingGate from "./pages/student/StudentMeetingGate";

import { useStudentAuth } from "./context/StudentAuthContext";

import socket from "./socket";

// ==========================================
// Admin Protected Route
// ==========================================
const ProtectedRoute = () => {
  const admin = localStorage.getItem("adminUser");

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// ==========================================
// Student Protected Route
// ==========================================
const StudentProtectedRoute = () => {
  const { student } = useStudentAuth();

  if (!student) {
    return <Navigate to="/student/login" replace />;
  }

  return <Outlet />;
};

// ==========================================
// Common Protected Route
// Teacher OR Student
// ==========================================
const CommonProtectedRoute = () => {
  const admin = localStorage.getItem("adminUser");
  const student = localStorage.getItem("studentData");

  if (!admin && !student) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// ==========================================
// Student Layout
// ==========================================
const StudentLayout = () => {
  const [activeTab, setActiveTab] = useState("lectures");

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      <StudentNavbar />

      <div className="flex flex-col md:flex-row flex-1">
        <StudentSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet context={{ activeTab, setActiveTab }} />
        </main>
      </div>
    </div>
  );
};

// ==========================================
// Main App
// ==========================================
const App = () => {

  useEffect(() => {

    socket.on("connect", () => {
      console.log("🟢 Socket Connected :", socket.id);
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

        {/* ========================= */}
        {/* Login */}
        {/* ========================= */}

        <Route path="/" element={<Login />} />

        <Route
          path="/student/login"
          element={<StudentLogin />}
        />

        {/* ========================= */}
        {/* Admin Routes */}
        {/* ========================= */}

        <Route element={<ProtectedRoute />}>

          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/admin/students"
              element={<StudentManagement />}
            />

            <Route
              path="/admin/batches"
              element={<BatchManagement />}
            />

            <Route
              path="/admin/videos"
              element={<VideoManagement />}
            />

            <Route
              path="/admin/meetings"
              element={<MeetingManagement />}
            />

          </Route>

        </Route>

        {/* ========================= */}
        {/* Student Routes */}
        {/* ========================= */}

        <Route element={<StudentProtectedRoute />}>

          <Route element={<StudentLayout />}>

            <Route
              path="/student/portal"
              element={<PortalHome />}
            />

            <Route
              path="/student/watch/:videoId"
              element={<StudentVideoPlayer />}
            />

          </Route>

          <Route
            path="/student/join-meeting"
            element={<StudentMeetingGate />}
          />

        </Route>

        {/* ========================= */}
        {/* Common Meeting Room */}
        {/* Teacher + Student */}
        {/* ========================= */}

        <Route element={<CommonProtectedRoute />}>

          <Route
            path="/meeting/:meetingCode"
            element={<MeetingRoom />}
          />

        </Route>

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </Router>
  );
};

export default App;