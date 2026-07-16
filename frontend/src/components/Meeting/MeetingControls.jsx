// 📄 src/components/Meeting/MeetingControls.jsx
import { Button, Tooltip } from "antd";
import {
  AudioMutedOutlined,
  AudioOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  DisconnectOutlined,
} from "@ant-design/icons"; // ✅ Fixed imports here too

const MeetingControls = ({ 
  isAudioMuted, 
  isVideoMuted, 
  onToggleAudio, 
  onToggleVideo, 
  onLeave 
}) => {
  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl max-w-xl mx-auto px-6 py-4 flex justify-center items-center gap-6 transition-all duration-300">

      {/* 🎙️ Microphone Control */}
      <Tooltip title={isAudioMuted ? "Unmute Mic" : "Mute Mic"}>
        <Button
          shape="circle"
          size="large"
          className={`flex items-center justify-center border-none text-lg w-12 h-12 transition-all duration-200 ${
            isAudioMuted 
              ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" 
              : "bg-slate-700 text-slate-100 hover:bg-slate-600 shadow-md"
          }`}
          icon={isAudioMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
          onClick={onToggleAudio}
        />
      </Tooltip>

      {/* 🎥 Camera Control */}
      <Tooltip title={isVideoMuted ? "Turn Camera On" : "Turn Camera Off"}>
        <Button
          shape="circle"
          size="large"
          className={`flex items-center justify-center border-none text-lg w-12 h-12 transition-all duration-200 ${
            isVideoMuted 
              ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" 
              : "bg-slate-700 text-slate-100 hover:bg-slate-600 shadow-md"
          }`}
          icon={<VideoCameraOutlined />} // ✅ Always use standard icon, state handles color changes
          onClick={onToggleVideo}
        />
      </Tooltip>

      {/* 🖥️ Screen Share */}
      <Tooltip title="Share Screen">
        <Button
          shape="circle"
          size="large"
          className="bg-slate-700 text-slate-100 hover:bg-slate-600 border-none flex items-center justify-center text-lg w-12 h-12 transition-all duration-200"
          icon={<DesktopOutlined />}
          onClick={() => alert("Screen sharing setup logic coming up next!")}
        />
      </Tooltip>

      {/* 🛑 Leave/Disconnect Call Control */}
      <Tooltip title="Leave Classroom">
        <Button
          danger
          type="primary"
          shape="circle"
          size="large"
          className="bg-rose-600 hover:bg-rose-700 flex items-center justify-center text-lg w-12 h-12 border-none shadow-lg shadow-rose-600/20"
          icon={<DisconnectOutlined />}
          onClick={onLeave}
        />
      </Tooltip>

    </div>
  );
};

export default MeetingControls;