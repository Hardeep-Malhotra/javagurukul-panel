// 📄 frontend/src/pages/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { loginStudent } from "../services/studentService";
import { useStudentAuth } from "../context/StudentAuthContext";
import Logo from "../assets/java-gurukul-logo.png"; // Tumhara logo path

axios.defaults.withCredentials = true;

// Pre-configured Demo Credentials
const DEMO_ADMIN = {
  email: import.meta.env.VITE_DEMO_ADMIN_EMAIL || "demo.admin@javagurukul.com",
  password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "12345678",
};

const DEMO_STUDENT = {
  email: import.meta.env.VITE_DEMO_STUDENT_EMAIL || "demo.student@javagurukul.com",
  password: import.meta.env.VITE_DEMO_STUDENT_PASSWORD || "12345678",
};

const Home = () => {
  const navigate = useNavigate();
  const { login: loginStudentContext } = useStudentAuth();

  // 1️⃣ Auto Redirect if already logged in
  useEffect(() => {
    const adminData = localStorage.getItem("adminUser");
    const studentData = localStorage.getItem("studentData");

    if (adminData) {
      navigate("/admin/dashboard");
    } else if (studentData) {
      navigate("/student/portal");
    }
  }, [navigate]);

  // ⚡ DIRECT LAUNCH: Demo Admin (1-Click from Home)
  const handleLaunchDemoAdmin = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin-login`,
        DEMO_ADMIN
      );

      if (response.data.success) {
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
        message.success("Launching Demo Admin Panel...");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Demo Admin Launch Failed!"
      );
    }
  };

  // ⚡ DIRECT LAUNCH: Demo Student (1-Click from Home)
  const handleLaunchDemoStudent = async () => {
    try {
      const data = await loginStudent(
        DEMO_STUDENT.email,
        DEMO_STUDENT.password
      );

      if (data.success) {
        loginStudentContext(data.student);
        localStorage.setItem("studentData", JSON.stringify(data.student));
        message.success("Launching Demo Student Portal...");
        navigate("/student/portal");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Demo Student Launch Failed!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-between p-4 md:p-8">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Logo */}
      <header className="max-w-6xl w-full mx-auto flex justify-between items-center py-4 z-10">
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <img src={Logo} alt="JavaGurukul" className="h-10 w-auto object-contain" />
          <span className="font-bold text-lg tracking-tight">
            Java<span className="text-[#fb991d]">Gurukul</span>
          </span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
          Placement Edition LMS
        </span>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto my-auto py-12 z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            Welcome to <span className="text-[#fb991d]">JavaGurukul</span> Learning Engine
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Select your access portal below or use 1-click Demo Launchers to test the ecosystem instantly.
          </p>
        </div>

        {/* Portal Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Admin Card */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 hover:border-orange-500/50 transition-all shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/40 rounded-xl flex items-center justify-center text-2xl mb-6">
                👨‍🏫
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Instructor dashboard to onboard students, upload lectures, track attendance, and manage course content.
              </p>
              <ul className="text-xs text-gray-300 space-y-2 mb-8">
                <li className="flex items-center gap-2">✓ Student & Batch Management</li>
                <li className="flex items-center gap-2">✓ Course Uploads & Live Class Scheduling</li>
                <li className="flex items-center gap-2">✓ Security & OTP Systems</li>
              </ul>
            </div>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate("/admin/login")}
              className="bg-[#2f8dae] hover:!bg-[#226a84] border-none font-bold h-12 rounded-xl"
            >
              Continue to Admin Login →
            </Button>
          </div>

          {/* Student Card */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 hover:border-[#fb991d]/50 transition-all shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-cyan-500/20 border border-cyan-500/40 rounded-xl flex items-center justify-center text-2xl mb-6">
                🎓
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Student Portal</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Interactive learning hub for students to watch lectures, download AI-assisted notes, and join live classes.
              </p>
              <ul className="text-xs text-gray-300 space-y-2 mb-8">
                <li className="flex items-center gap-2">✓ Video Lectures & Progress Tracker</li>
                <li className="flex items-center gap-2">✓ AI Notes & Resources</li>
                <li className="flex items-center gap-2">✓ Live Class Gateway</li>
              </ul>
            </div>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate("/student/login")}
              className="bg-[#fb991d] hover:!bg-[#e08512] border-none font-bold h-12 rounded-xl text-white"
            >
              Continue to Student Login →
            </Button>
          </div>
        </div>

        {/* 🚀 INSTANT 1-CLICK DEMO LAUNCHER BAR */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-800/80 to-cyan-950/40 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                ⭐ Recruiter & Examiner Shortcuts
              </span>
              <h3 className="text-lg font-bold text-white">Instant 1-Click Demo Access</h3>
              <p className="text-xs text-gray-400">
                Bypass login screens entirely to review the platform immediately.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={handleLaunchDemoAdmin}
                className="bg-orange-500/20 hover:!bg-orange-500/30 text-orange-300 border-orange-500/50 font-bold h-11 px-6 rounded-xl"
              >
                🚀 Launch Demo Admin
              </Button>
              <Button
                onClick={handleLaunchDemoStudent}
                className="bg-cyan-500/20 hover:!bg-cyan-500/30 text-cyan-300 border-cyan-500/50 font-bold h-11 px-6 rounded-xl"
              >
                🎓 Launch Demo Student
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4 z-10">
        JavaGurukul LMS Platform • Built with React, Node.js, Express & MongoDB
      </footer>
    </div>
  );
};

export default Home;