import { Button, Tag, message } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

import {
  startMeetingAPI,
  endMeetingAPI,
} from "../../services/meetingService";

const MeetingCard = ({ meeting, onRefresh }) => {
  // ==========================
  // Start Meeting
  // ==========================
  const handleStartMeeting = async () => {
    try {
      const response = await startMeetingAPI(meeting._id);

      if (response.success) {
        message.success(response.message);
        onRefresh();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to start meeting.");
    }
  };

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
      message.error(error.response?.data?.message || "Failed to end meeting.");
    }
  };

  // ==========================
  // Status Color
  // ==========================
  const getStatusColor = () => {
    switch (meeting.status) {
      case "waiting":
        return "gold";

      case "live":
        return "green";

      case "ended":
        return "red";

      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">

      <div>

        <div className="flex justify-between items-start mb-4">

          <h2 className="text-lg font-bold text-gray-800">
            {meeting.title}
          </h2>

          <Tag color={getStatusColor()}>
            {meeting.status.toUpperCase()}
          </Tag>

        </div>

        <div className="space-y-3 text-gray-600">

          <p className="flex items-center gap-2">
            <UserOutlined />
            {meeting.teacherName}
          </p>

          <p className="flex items-center gap-2">
            <TeamOutlined />
            {meeting.batch}
          </p>

          <p className="flex items-center gap-2">
            <VideoCameraOutlined />
            {meeting.meetingCode}
          </p>

          <p className="flex items-center gap-2">
            <CalendarOutlined />
            {new Date(meeting.createdAt).toLocaleString()}
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        {meeting.status === "waiting" && (
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            className="flex-1 bg-green-600"
            onClick={handleStartMeeting}
          >
            Start
          </Button>
        )}

        {meeting.status === "live" && (
          <Button
            danger
            icon={<StopOutlined />}
            className="flex-1"
            onClick={handleEndMeeting}
          >
            End
          </Button>
        )}

        {meeting.status === "ended" && (
          <Button disabled className="flex-1">
            Meeting Ended
          </Button>
        )}

      </div>

    </div>
  );
};

export default MeetingCard;