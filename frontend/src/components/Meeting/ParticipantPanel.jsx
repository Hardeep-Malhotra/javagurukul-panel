// 📄 src/components/Meeting/ParticipantPanel.jsx
import { Avatar, Empty } from "antd";
import { UserOutlined, AudioMutedOutlined, VideoCameraOutlined } from "@ant-design/icons"; // ✅ Fixed icon import

const ParticipantPanel = ({ participants = [], localUser }) => {
  return (
    <div className="h-full flex flex-col text-slate-200">
      
      {/* Dynamic Header */}
      <div className="p-4 border-b border-slate-700/50 font-semibold text-sm tracking-wide text-slate-300 bg-slate-800/20">
        ROSTER ({participants.length + (localUser ? 1 : 0)})
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
        
        {/* 👑 Host/Teacher Row (Local User) */}
        {localUser && (
          <div className="flex items-center gap-3 border border-[#fb991d]/30 bg-[#fb991d]/5 rounded-xl p-3 shadow-inner">
            <Avatar 
              className="bg-slate-700 border border-[#fb991d]/40" 
              icon={<UserOutlined />} 
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-100 truncate">
                {localUser.userName} <span className="text-xs text-[#fb991d] font-normal">(You)</span>
              </p>
              <p className="text-xs text-[#fb991d] tracking-wider uppercase font-medium mt-0.5">
                {localUser.role}
              </p>
            </div>

            {/* Hardware Status Indicators */}
            <div className="flex items-center gap-2 text-slate-400">
              {localUser.isAudioMuted && <AudioMutedOutlined className="text-rose-400 text-xs" />}
              {localUser.isVideoMuted && <VideoCameraOutlined className="text-rose-400 text-xs" />} {/* ✅ Replaced icon here */}
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
            </div>
          </div>
        )}

        {/* 👥 Remote Students List */}
        {participants.length === 0 && !localUser ? (
          <div className="h-full flex items-center justify-center pt-8">
            <Empty description={<span className="text-slate-500 text-xs">No active students</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        ) : (
          participants.map((participant) => (
            <div
              key={participant.socketId}
              className="flex items-center gap-3 border border-slate-700/40 bg-slate-800/40 rounded-xl p-3 hover:bg-slate-800/70 transition-all duration-200"
            >
              <Avatar className="bg-slate-600 border border-slate-500" icon={<UserOutlined />} />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-200 truncate">
                  {participant.userName}
                </p>
                <p className="text-xs text-slate-400 capitalize mt-0.5">
                  {participant.role || "Student"}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-sm"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParticipantPanel;