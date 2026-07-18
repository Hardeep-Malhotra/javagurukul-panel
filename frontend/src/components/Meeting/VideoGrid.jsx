// 📄 src/components/Meeting/VideoGrid.jsx
import { useEffect, useRef } from "react";
import { Avatar } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const VideoGrid = ({
  participants = [],
  localStream,
  remoteStreams = {}, // 🔥 FIX: `remoteStream` ki jagah object map liya
  isLocalVideoMuted,
}) => {
  const localVideoRef = useRef(null);

  // ==========================================
  // 🎥 Local Stream Setup
  // ==========================================
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const totalFeeds = participants.length + 1;

  const gridLayoutClass =
    totalFeeds === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : totalFeeds === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // Multi-user dynamic layout adjustment

  return (
    <div className={`grid ${gridLayoutClass} gap-4 w-full h-full p-2 overflow-y-auto`}>
      {/* ===========================
          LOCAL USER (TEACHER / YOU)
      ============================ */}
      <div className="bg-slate-900 rounded-2xl aspect-video overflow-hidden relative border border-slate-800">
        {localStream && !isLocalVideoMuted ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100" // 🔥 Selfie mirror adjustment
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Avatar size={80} icon={<UserOutlined />} />
            <h3 className="mt-3 font-semibold text-slate-300">You</h3>
          </div>
        )}

        <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-sm z-10">
          You
        </div>
      </div>

      {/* ===========================
          REMOTE PARTICIPANTS (STUDENTS)
      ============================ */}
      {participants.map((participant) => {
        // 🔥 FIX: unique socketId ke basis par map se stream nikali
        const currentRemoteStream = remoteStreams[participant.socketId];

        return (
          <div
            key={participant.socketId}
            className="bg-slate-900 rounded-2xl aspect-video overflow-hidden relative border border-slate-800"
          >
            {currentRemoteStream ? (
              <video
                // 🔥 FIX: Loop me common ref hata kar dynamic inner allocation hook use kiya
                ref={(el) => {
                  if (el && el.srcObject !== currentRemoteStream) {
                    el.srcObject = currentRemoteStream;
                  }
                }}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Avatar size={70} icon={<UserOutlined />} />
                <h3 className="mt-3 text-slate-300">{participant.userName}</h3>
                <p className="text-sm text-gray-500 animate-pulse">
                  Connecting media...
                </p>
              </div>
            )}

            <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-sm flex items-center gap-2 z-10">
              <VideoCameraOutlined />
              {participant.userName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;