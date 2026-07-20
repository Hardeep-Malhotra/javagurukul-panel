// 📄 src/components/Meeting/VideoGrid.jsx
import { Avatar } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const VideoGrid = ({
  participants = [],
  localStream,
  remoteStreams = {},
  isLocalVideoMuted,
  isScreenSharing = false,
  screenStream = null,
}) => {
  const totalFeeds = participants.length + 1;

  const gridLayoutClass =
    totalFeeds === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : totalFeeds === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // Multi-user dynamic layout adjustment

  // 🔥 FIX: jab screen share on ho, local box me screen dikhani hai;
  // warna camera. Isse teacher ko apni khud ki screen ka preview milta hai.
  const activeLocalStream = isScreenSharing && screenStream ? screenStream : localStream;
  const shouldShowLocalVideo =
    activeLocalStream && (isScreenSharing ? true : !isLocalVideoMuted);

  return (
    <div className={`grid ${gridLayoutClass} gap-4 w-full h-full p-2 overflow-y-auto`}>
      {/* ===========================
          LOCAL USER (TEACHER / YOU)
      ============================ */}
      <div className="bg-slate-900 rounded-2xl aspect-video overflow-hidden relative border border-slate-800">
        {shouldShowLocalVideo ? (
          <video
            // 🔥 FIX: callback ref instead of useRef+useEffect([localStream]).
            // Purane code me jab video element mute hone par unmount hoti thi,
            // wapas mount hone par srcObject kabhi set hi nahi hota tha
            // (effect [localStream] pe hi depend karta tha, jo change nahi hota),
            // isliye camera dobara ON karne par screen black rehti thi.
            // Ab har mount/update par srcObject ko sahi stream se sync kiya jaata hai.
            ref={(el) => {
              if (el && el.srcObject !== activeLocalStream) {
                el.srcObject = activeLocalStream;
              }
            }}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              isScreenSharing ? "" : "transform -scale-x-100"
            }`} // Selfie mirror sirf camera ke liye, screen share ke liye nahi
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Avatar size={80} icon={<UserOutlined />} />
            <h3 className="mt-3 font-semibold text-slate-300">You</h3>
          </div>
        )}

        <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-sm z-10">
          {isScreenSharing ? "You (Screen)" : "You"}
        </div>
      </div>

      {/* ===========================
          REMOTE PARTICIPANTS (STUDENTS)
      ============================ */}
      {participants.map((participant) => {
        const currentRemoteStream = remoteStreams[participant.socketId];

        return (
          <div
            key={participant.socketId}
            className="bg-slate-900 rounded-2xl aspect-video overflow-hidden relative border border-slate-800"
          >
            {currentRemoteStream ? (
              <video
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