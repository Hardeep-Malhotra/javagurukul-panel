// 📄 src/components/Meeting/MeetingHeader.jsx
import { Button, Tag } from "antd";
import {
  VideoCameraOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";

const MeetingHeader = ({
  meetingCode,
  meetingStatus = "LIVE",
  participantCount = 0,
  onLeave,
}) => {
  return (
    <div className="bg-[#1e293b]/90 backdrop-blur-md rounded-2xl border border-slate-700/50 px-6 py-4 flex justify-between items-center shadow-lg transition-all duration-300">

      {/* Left Section */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
          <VideoCameraOutlined className="text-[#fb991d]" />
          JavaGuruKul Meet
        </h2>

        <div className="mt-1.5 flex gap-3 items-center">
          <span className="text-slate-400 text-sm">
            Meeting Code:
          </span>
          <span className="font-mono font-semibold text-slate-200 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700 text-sm">
            {meetingCode}
          </span>
          <Tag color="error" className="font-semibold border-none animate-pulse">
            {meetingStatus}
          </Tag>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <div className="text-slate-300 font-medium text-sm flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-slate-700/30">
          <span>👨‍🎓</span> 
          <span>{participantCount} In Class</span>
        </div>

        <Button
          danger
          type="primary"
          icon={<DisconnectOutlined />}
          onClick={onLeave}
          className="bg-rose-600 hover:bg-rose-700 border-none font-medium px-4 h-9 flex items-center gap-1"
        >
          Leave Class
        </Button>
      </div>

    </div>
  );
};

export default MeetingHeader;