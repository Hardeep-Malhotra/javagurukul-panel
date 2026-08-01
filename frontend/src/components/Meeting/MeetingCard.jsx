import { Button, Tag, message, Tooltip, Popconfirm } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  CopyOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
} from "@ant-design/icons";

import { deleteMeetingAPI } from "../../services/meetingService";

const MeetingCard = ({ meeting, onRefresh, onEdit }) => {
  // ==========================
  // Delete Meeting
  // ==========================
  const handleDeleteMeeting = async () => {
    try {
      const response = await deleteMeetingAPI(meeting._id);

      if (response.success) {
        message.success(response.message || "Meeting deleted successfully.");
        onRefresh();
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to delete meeting."
      );
    }
  };

  // ==========================
  // Copy Meeting Details
  // ==========================
  const copyMeetingCode = async () => {
    await navigator.clipboard.writeText(meeting.meetingCode);
    message.success("Meeting code copied!");
  };

  const copyPasscode = async () => {
    if (!meeting.zoomPasscode) return;
    await navigator.clipboard.writeText(meeting.zoomPasscode);
    message.success("Zoom Passcode copied!");
  };

  // ==========================
  // Status Tag
  // ==========================
  const getStatus = () => {
    switch (meeting.status) {
      case "scheduled":
        return <Tag color="gold" className="m-0 font-medium">🟡 SCHEDULED</Tag>;

      case "live":
        return <Tag color="green" className="m-0 font-medium animate-pulse">🔴 LIVE</Tag>;

      case "ended":
        return <Tag color="red" className="m-0 font-medium">⛔ ENDED</Tag>;

      default:
        return <Tag className="m-0">UNKNOWN</Tag>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between relative group hover:-translate-y-1">
      
      {/* Header Section */}
      <div>
        <div className="flex justify-between items-start gap-3 mb-3">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#fb991d] transition-colors">
            {meeting.title}
          </h2>

          {/* Quick Action Icons (Top-Right) */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100 shrink-0">
            <Tooltip title="Edit Meeting">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined className="text-gray-500 hover:text-blue-600" />}
                onClick={() => onEdit(meeting)}
              />
            </Tooltip>

            <Popconfirm
              title="Delete Live Class?"
              description="Are you sure you want to delete this?"
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={handleDeleteMeeting}
              placement="topRight"
            >
              <Tooltip title="Delete Meeting">
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined className="hover:text-red-600" />}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        </div>

        {/* Status Tag */}
        <div className="mb-4">
          {getStatus()}
        </div>

        {/* Body Info */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2.5">
            <UserOutlined className="text-gray-400" />
            <span className="font-medium text-gray-700">{meeting.teacherName}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <TeamOutlined className="text-gray-400" />
            <span>{meeting.batch}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <CalendarOutlined className="text-gray-400" />
            <span>{new Date(meeting.scheduledAt).toLocaleString()}</span>
          </div>

          {/* Meeting Code & Passcode Section */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100">
              <div className="flex items-center gap-1.5 min-w-0">
                <VideoCameraOutlined className="text-gray-400 text-xs" />
                <span className="font-semibold text-xs text-gray-700 truncate">
                  {meeting.meetingCode || meeting.zoomMeetingId || "N/A"}
                </span>
              </div>
              <Tooltip title="Copy Code">
                <Button
                  size="small"
                  type="text"
                  className="h-6 w-6 p-0"
                  icon={<CopyOutlined className="text-xs" />}
                  onClick={copyMeetingCode}
                />
              </Tooltip>
            </div>

            {meeting.zoomPasscode && (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100">
                <div className="flex items-center gap-1.5 min-w-0">
                  <KeyOutlined className="text-gray-400 text-xs" />
                  <span className="font-semibold text-xs text-gray-700 truncate">
                    {meeting.zoomPasscode}
                  </span>
                </div>
                <Tooltip title="Copy Passcode">
                  <Button
                    size="small"
                    type="text"
                    className="h-6 w-6 p-0"
                    icon={<CopyOutlined className="text-xs" />}
                    onClick={copyPasscode}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-5 pt-3 border-t border-gray-100 flex flex-col gap-2">
        {/* Join Zoom */}
        <Button
          type="primary"
          block
          size="middle"
          href={meeting.zoomMeetingLink}
          target="_blank"
          className="bg-[#fb991d] hover:!bg-[#e08412] border-none font-medium shadow-sm"
        >
          Join Zoom Meeting
        </Button>

        {/* AI Notes Options */}
        {meeting.status === "ended" && meeting.notesStatus === "completed" && (
          <Button
            block
            size="middle"
            icon={<FileTextOutlined />}
            className="border-gray-200 hover:border-[#fb991d] hover:text-[#fb991d]"
          >
            View AI Notes
          </Button>
        )}

        {meeting.status === "ended" && meeting.notesStatus === "processing" && (
          <Button block size="middle" disabled className="bg-gray-50 text-xs">
            AI Notes Generating...
          </Button>
        )}
      </div>

    </div>
  );
};

export default MeetingCard;