// import { Button, Tag, message, Tooltip } from "antd";
// import {
//   CalendarOutlined,
//   UserOutlined,
//   TeamOutlined,
//   VideoCameraOutlined,
//   PlayCircleOutlined,
//   StopOutlined,
//   CopyOutlined,
// } from "@ant-design/icons";

// import { startMeetingAPI, endMeetingAPI } from "../../services/meetingService";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
// const MeetingCard = ({ meeting, onRefresh }) => {
//   // ==========================
//   // Start Meeting
//   // ==========================
//   const handleStartMeeting = async () => {
//     try {
//       const response = await startMeetingAPI(meeting._id);

//       if (response.success) {
//         message.success(response.message);
//         onRefresh();
//         navigate(`/meeting/${meeting.meetingCode}`);
//       }
//     } catch (error) {
//       message.error(
//         error.response?.data?.message || "Failed to start meeting.",
//       );
//     }
//   };

//   // ==========================
//   // End Meeting
//   // ==========================
//   const handleEndMeeting = async () => {
//     try {
//       const response = await endMeetingAPI(meeting._id);

//       if (response.success) {
//         message.success(response.message);
//         onRefresh();
//       }
//     } catch (error) {
//       message.error(error.response?.data?.message || "Failed to end meeting.");
//     }
//   };

//   // ==========================
//   // Copy Meeting Code
//   // ==========================
//   const copyMeetingCode = async () => {
//     await navigator.clipboard.writeText(meeting.meetingCode);
//     message.success("Meeting code copied.");
//   };

//   // ==========================
//   // Status Badge
//   // ==========================
//   const getStatus = () => {
//     switch (meeting.status) {
//       case "waiting":
//         return <Tag color="gold">🟡 WAITING</Tag>;

//       case "live":
//         return <Tag color="green">🔴 LIVE</Tag>;

//       case "ended":
//         return <Tag color="red">⛔ ENDED</Tag>;

//       default:
//         return <Tag>UNKNOWN</Tag>;
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between">
//       <div>
//         {/* Header */}

//         <div className="flex justify-between items-start mb-5">
//           <h2 className="text-xl font-bold text-gray-800">{meeting.title}</h2>

//           {getStatus()}
//         </div>

//         {/* Body */}

//         <div className="space-y-4 text-gray-700">
//           <div className="flex items-center gap-3">
//             <UserOutlined />
//             <span>{meeting.teacherName}</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <TeamOutlined />
//             <span>{meeting.batch}</span>
//           </div>

//           <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
//             <div className="flex items-center gap-3">
//               <VideoCameraOutlined />
//               <span className="font-semibold">{meeting.meetingCode}</span>
//             </div>

//             <Tooltip title="Copy Meeting Code">
//               <Button
//                 size="small"
//                 type="text"
//                 icon={<CopyOutlined />}
//                 onClick={copyMeetingCode}
//               />
//             </Tooltip>
//           </div>

//           <div className="flex items-center gap-3">
//             <CalendarOutlined />
//             <span>{new Date(meeting.createdAt).toLocaleString()}</span>
//           </div>

//           <div className="flex items-center gap-3">
//             👨‍🎓
//             <span>Participants : {meeting.participants.length}</span>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}

//       <div className="mt-6">
//         {meeting.status === "waiting" && (
//           <Button
//             type="primary"
//             icon={<PlayCircleOutlined />}
//             block
//             size="large"
//             onClick={handleStartMeeting}
//             className="bg-green-600"
//           >
//             Start Meeting
//           </Button>
//         )}

//         {meeting.status === "live" && (
//           <Button
//             danger
//             block
//             size="large"
//             icon={<StopOutlined />}
//             onClick={handleEndMeeting}
//           >
//             End Meeting
//           </Button>
//         )}

//         {meeting.status === "ended" && (
//           <Button disabled block size="large">
//             Meeting Ended
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MeetingCard;



// 📄 src/components/Meeting/MeetingCard.jsx
import { Button, Tag, message, Tooltip } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  StopOutlined,
  CopyOutlined,
  EnterOutlined,
} from "@ant-design/icons";

import { startMeetingAPI, endMeetingAPI } from "../../services/meetingService";
import { useNavigate } from "react-router-dom";

const MeetingCard = ({ meeting, onRefresh }) => {
  const navigate = useNavigate(); // ✅ Hook properly initialized inside the component scope

  // ==========================
  // Start Meeting
  // ==========================
  const handleStartMeeting = async () => {
    try {
      const response = await startMeetingAPI(meeting._id);

      if (response.success) {
        message.success(response.message);
        onRefresh();
        navigate(`/meeting/${meeting.meetingCode}`);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to start meeting.",
      );
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
  // Copy Meeting Code
  // ==========================
  const copyMeetingCode = async () => {
    await navigator.clipboard.writeText(meeting.meetingCode);
    message.success("Meeting code copied.");
  };

  // ==========================
  // Status Badge
  // ==========================
  const getStatus = () => {
    switch (meeting.status) {
      case "waiting":
        return <Tag color="gold">🟡 WAITING</Tag>;
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
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <h2 className="text-xl font-bold text-gray-800">{meeting.title}</h2>
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
              <span className="font-semibold">{meeting.meetingCode}</span>
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
            <span>{new Date(meeting.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-3">
            👨‍🎓
            <span>Participants : {meeting.participants?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Footer Controls Layer */}
      <div className="mt-6">
        {meeting.status === "waiting" && (
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            block
            size="large"
            onClick={handleStartMeeting}
            className="bg-green-600 hover:bg-green-700 border-none"
          >
            Start Meeting
          </Button>
        )}

        {meeting.status === "live" && (
          <div className="flex flex-col gap-2">
            {/* 🚀 Add Join Room button if meeting is live so teacher can rejoin seamlessly */}
            <Button
              type="primary"
              icon={<EnterOutlined />}
              block
              size="large"
              className="bg-[#fb991d] border-none"
              onClick={() => navigate(`/meeting/${meeting.meetingCode}`)}
            >
              Join Room
            </Button>
            <Button
              danger
              block
              size="large"
              icon={<StopOutlined />}
              onClick={handleEndMeeting}
            >
              End Meeting
            </Button>
          </div>
        )}

        {meeting.status === "ended" && (
          <Button disabled block size="large">
            Meeting Ended
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;