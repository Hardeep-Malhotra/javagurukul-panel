// 📄 src/components/Meeting/VideoGrid.jsx
import { useEffect, useRef } from "react";
import { Avatar } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons"; // ✅ Fixed: Removed 'VideoCameraMinusOutlined'

const VideoGrid = ({ participants = [], localStream, isLocalVideoMuted }) => {
  const localVideoRef = useRef(null);

  // ==========================================
  // 🎥 Local Stream Hookup
  // ==========================================
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Dynamic Grid Class matching total users (Teacher + Remote Students)
  const totalFeeds = participants.length + 1;
  const gridLayoutClass = totalFeeds === 1 
    ? "grid-cols-1 max-w-2xl mx-auto" 
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridLayoutClass} gap-4 w-full h-full p-2 overflow-y-auto`}>

      {/* ==========================================
          👤 TEACHER FEED (LOCAL USER)
         ========================================== */}
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl aspect-video md:h-full flex flex-col justify-center items-center text-white relative overflow-hidden shadow-lg group">
        
        {/* Render Video Element if Stream exists and isn't muted */}
        {localStream && !isLocalVideoMuted ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted // ⚠️ Keeps teacher from hearing their own loopback echo
            className="w-full h-full object-cover rounded-2xl transform scale-x-[-1]" // Mirror effect
          />
        ) : (
          /* Fallback Avatar UI when camera is turned off */
          <div className="flex flex-col items-center">
            <Avatar
              size={80}
              className="bg-slate-700 border-2 border-[#fb991d]/40 shadow-md"
              icon={<UserOutlined />}
            />
            <h3 className="mt-4 text-lg font-semibold text-slate-200">
              Hardeep Singh (You)
            </h3>
            <span className="text-xs bg-[#fb991d]/20 text-[#fb991d] px-2.5 py-0.5 rounded-full mt-2 font-medium tracking-wide">
              TEACHER
            </span>
          </div>
        )}

        {/* Dynamic Status Overlay Ribbon */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 transition-all duration-300">
          {localStream && !isLocalVideoMuted ? (
            <>
              <VideoCameraOutlined className="text-green-400" />
              <span className="text-xs text-slate-300 font-medium">Camera Active</span>
            </>
          ) : (
            <>
              {/* ✅ Fixed: Replaced with standard icon + custom rose styling */}
              <VideoCameraOutlined className="text-rose-400" /> 
              <span className="text-xs text-rose-400 font-medium">Camera Off</span>
            </>
          )}
        </div>
      </div>

      {/* ==========================================
          👥 REMOTE PARTICIPANTS FEEDS (STUDENTS)
         ========================================== */}
      {participants.map((participant) => (
        <div
          key={participant.socketId}
          className="bg-slate-800/90 border border-slate-700/40 rounded-2xl aspect-video md:h-full flex flex-col justify-center items-center text-white relative overflow-hidden shadow-md"
        >
          <div className="flex flex-col items-center">
            <Avatar
              size={70}
              className="bg-slate-600 border border-slate-500"
              icon={<UserOutlined />}
            />
            <h3 className="mt-3 font-semibold text-slate-200">
              {participant.userName}
            </h3>
            <p className="text-xs text-slate-400 capitalize mt-0.5">
              {participant.role || "Student"}
            </p>
          </div>

          {/* Bottom Status Layer */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-700/50">
            <VideoCameraOutlined className="text-slate-400" />
            <span className="text-xs text-slate-400">Connecting media...</span>
          </div>
        </div>
      ))}

    </div>
  );
};

export default VideoGrid;