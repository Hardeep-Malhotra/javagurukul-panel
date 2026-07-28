import { useEffect, useState } from "react";
import { Button, Empty, message, Spin } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import { getAllMeetingsAPI } from "../services/meetingService";
import MeetingCard from "../components/Meeting/MeetingCard";
import CreateMeetingModal from "../components/Meeting/CreateMeetingModal";

const MeetingManagement = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ==========================
  // Fetch Live Classes
  // ==========================
  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const response = await getAllMeetingsAPI();

      if (response.success) {
        setMeetings(response.data);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to load live classes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="p-5">

      {/* ==========================
          Header
      ========================== */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <VideoCameraOutlined className="text-[#fb991d]" />
            Live Classes
          </h1>

          <p className="text-gray-500 mt-1">
            Schedule and manage Zoom live classes.
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          className="bg-[#fb991d] border-none"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Schedule Live Class
        </Button>

      </div>

      {/* ==========================
          Live Class Cards
      ========================== */}

      <Spin spinning={loading}>

        {meetings.length === 0 ? (

          <Empty description="No Live Classes Found" />

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                onRefresh={fetchMeetings}
              />
            ))}

          </div>

        )}

      </Spin>

      {/* ==========================
          Create Live Class Modal
      ========================== */}

      <CreateMeetingModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onRefresh={fetchMeetings}
      />

    </div>
  );
};

export default MeetingManagement;