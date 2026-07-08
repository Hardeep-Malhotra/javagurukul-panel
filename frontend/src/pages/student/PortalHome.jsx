// 📄 frontend/src/pages/student/PortalHome.jsx
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useStudentAuth } from "../../context/StudentAuthContext";
import { getBatchVideos } from "../../services/studentService";
import VideoPlayCard from "../../components/StudentPortal/VideoPlayCard";

const PortalHome = () => {
  const { student } = useStudentAuth();
  const { activeTab } = useOutletContext(); // 🌟 Layout context se activeTab pull kar liya
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      if (!student || !student.batch) return;
      try {
        setLoading(true);
        setError("");
        // Assigned batch logic verification pipeline trigger
        const response = await getBatchVideos(student.batch);
        if (response.success) {
          setVideos(response.data);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load batch lectures dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "lectures") {
      fetchLectures();
    }
  }, [student, activeTab]);

  // 🛡️ Conditional layout router if tab shifts to material or notices
  if (activeTab !== "lectures") {
    return (
      <div className="bg-white border border-dashed border-gray-200 p-12 text-center rounded-2xl max-w-4xl mx-auto mt-6">
        <span className="text-4xl block mb-3">📚</span>
        <h3 className="text-lg font-extrabold text-[#14212a] mb-1 uppercase tracking-wider">
          Workspace Coming Soon
        </h3>
        <p className="text-gray-400 text-xs">
          Admin is currently preparing documentation and assets modules for this
          segment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* 🎉 Welcome Hero Card Banner */}
      <div className="bg-gradient-to-r from-[#14212a] to-[#1c3242] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-800 mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6 text-9xl font-black select-none pointer-events-none">
          JAVA
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-2">
          Hi, {student?.name}! 👋
        </h1>
        <p className="text-gray-300 max-w-xl text-xs sm:text-sm leading-relaxed">
          Welcome back to your workspace dashboard. Your courses system pipeline
          tracking is completely realigned with the{" "}
          <b>{student?.batch || "Dynamic Cohort"}</b> ecosystem. Keep grinding!
        </p>
      </div>

      {/* 🎥 Video Lectures Header Metadata section */}
      <div className="mb-6 flex justify-between items-center px-1">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#14212a] flex items-center gap-2">
            <span>🎥</span> Your Batch Video Lectures
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            Access your synchronized cohort streams modules parameters safely
          </p>
        </div>
        <span className="bg-[#fb991d]/10 text-[#fb991d] px-3 py-1 text-xs font-black rounded-full border border-[#fb991d]/20 shrink-0">
          {videos.length} Modules Available
        </span>
      </div>

      {/* ==========================================
          STATE VALIDATION RENDER PANELS
         ========================================== */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="bg-white rounded-2xl h-60 animate-pulse border border-[#eef2f5]"
            ></div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 text-red-600 rounded-xl text-sm font-semibold shadow-sm">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="bg-white border border-dashed border-gray-200 p-12 text-center rounded-2xl max-w-xl mx-auto">
          <span className="text-4xl block mb-3">🎬</span>
          <p className="text-gray-500 font-bold">
            No lectures uploaded for your batch yet.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Once administration deploys maps updates to your workspace code,
            they will sync here live.
          </p>
        </div>
      )}

      {/* 🎬 Dynamic Video Grid Wrapper using pure Reusable VideoPlayCard component layout */}
      {!loading && !error && videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoPlayCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalHome;
