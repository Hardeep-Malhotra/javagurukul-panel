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

const fetchMeetings = async () => {
    try {
      setLoading(true); 
      const response = await getAllMeetingsAPI();

      if (response.success) {
        setMeetings(response.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load meetings.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchMeetings();
  }, []);

  return (
    <div className="p-1">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <VideoCameraOutlined className="text-[#fb991d]" />
            Live Meetings
          </h1>

          <p className="text-gray-500 text-sm">
            Manage all live classroom meetings.
          </p>
        </div>

        <Button
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#fb991d]"
        >
          + Create Meeting
        </Button>

      </div>

      <Spin spinning={loading}>

        {meetings.length === 0 ? (

          <Empty description="No Meetings Found" />

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

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

      <CreateMeetingModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onRefresh={fetchMeetings}
      />

    </div>
  );
};

export default MeetingManagement;