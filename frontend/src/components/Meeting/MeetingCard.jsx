import { Button, Tag, message, Tooltip } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  StopOutlined,
  CopyOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { endMeetingAPI } from "../../services/meetingService";

const MeetingCard = ({ meeting, onRefresh }) => {
  // ==========================
  // End Meeting
  // ==========================
  const handleEndMeeting = async () => {
    try {
      const response = await endMeetingAPI(meeting._id);

      if (response.success) {
        message.success(response.message);
        onRefresh();
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to end meeting."
      );
    }
  };

  // ==========================
  // Copy Meeting Code
  // ==========================
  const copyMeetingCode = async () => {
    await navigator.clipboard.writeText(meeting.meetingCode);
    message.success("Meeting code copied.");
  };

  // ==========================
  // Status Tag
  // ==========================
  const getStatus = () => {
    switch (meeting.status) {
      case "scheduled":
        return <Tag color="gold">🟡 SCHEDULED</Tag>;

      case "live":
        return <Tag color="green">🔴 LIVE</Tag>;

      case "ended":
        return <Tag color="red">⛔ ENDED</Tag>;

      default:
        return <Tag>UNKNOWN</Tag>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          {meeting.title}
        </h2>

        {getStatus()}
      </div>

      {/* Body */}
      <div className="space-y-4 text-gray-700">

        <div className="flex items-center gap-3">
          <UserOutlined />
          <span>{meeting.teacherName}</span>
        </div>

        <div className="flex items-center gap-3">
          <TeamOutlined />
          <span>{meeting.batch}</span>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">

          <div className="flex items-center gap-3">
            <VideoCameraOutlined />
            <span className="font-semibold">
              {meeting.meetingCode}
            </span>
          </div>

          <Tooltip title="Copy Meeting Code">
            <Button
              size="small"
              type="text"
              icon={<CopyOutlined />}
              onClick={copyMeetingCode}
            />
          </Tooltip>

        </div>

        <div className="flex items-center gap-3">
          <CalendarOutlined />
          <span>
            {new Date(meeting.scheduledAt).toLocaleString()}
          </span>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-3">

        {/* Join Zoom */}
        <Button
          type="primary"
          block
          size="large"
          href={meeting.zoomMeetingLink}
          target="_blank"
        >
          Join Zoom Meeting
        </Button>

        {/* End Meeting */}
        {meeting.status === "live" && (
          <Button
            danger
            block
            size="large"
            icon={<StopOutlined />}
            onClick={handleEndMeeting}
          >
            End Meeting
          </Button>
        )}

        {/* View AI Notes */}
        {meeting.status === "ended" &&
          meeting.notesStatus === "completed" && (
            <Button
              block
              size="large"
              icon={<FileTextOutlined />}
            >
              View AI Notes
            </Button>
          )}

        {/* Processing */}
        {meeting.status === "ended" &&
          meeting.notesStatus === "processing" && (
            <Button
              block
              disabled
            >
              AI Notes Generating...
            </Button>
          )}

        {/* Ended */}
        {meeting.status === "ended" &&
          meeting.notesStatus === "none" && (
            <Button
              block
              disabled
            >
              Meeting Ended
            </Button>
          )}

      </div>
    </div>
  );
};

export default MeetingCard;