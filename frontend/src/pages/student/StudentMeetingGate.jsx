import { useState } from "react";
import { Card, Typography, Input, Button, message } from "antd";

import { getMeetingByIdAPI } from "../../services/meetingService";

const { Title, Text } = Typography;

const StudentMeetingGate = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!meetingCode.trim()) {
      return message.warning("Please enter meeting code.");
    }

    try {
      setLoading(true);

      const response = await getMeetingByIdAPI(meetingCode);

      if (response.success) {
        const meeting = response.data;

        if (!meeting.zoomMeetingLink) {
          return message.error("Zoom Meeting Link not found.");
        }

        window.open(meeting.zoomMeetingLink, "_blank");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Invalid Meeting Code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex justify-center items-center p-6">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="logo"
            className="h-16 mx-auto mb-4"
          />

          <Title level={2}>Join Live Class</Title>

          <Text type="secondary">
            Enter your Meeting Code to join the Zoom Live Class.
          </Text>
        </div>

        <div className="space-y-5">
          <Input
            size="large"
            placeholder="Enter Meeting Code"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value.toUpperCase())}
          />

          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            className="bg-[#fb991d]"
            onClick={handleJoin}
          >
            Join Live Class
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StudentMeetingGate;