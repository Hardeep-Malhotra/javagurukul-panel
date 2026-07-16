import { useEffect, useState } from "react";
import { Card, Typography, Input, Button, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import { verifyMeetingAPI } from "../../services/meetingService";

const { Title, Text } = Typography;

const StudentMeetingGate = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [meetingCode, setMeetingCode] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Auto Fill Meeting Code
  // ==========================================

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      setMeetingCode(code);
    }
  }, []);

  // ==========================================
  // Verify Meeting
  // ==========================================

  const handleVerify = async () => {
    if (!meetingCode.trim()) {
      return message.warning("Please enter meeting code.");
    }

    try {
      setLoading(true);

      const response = await verifyMeetingAPI(meetingCode);

      if (response.success) {
        message.success("Meeting Verified.");

        navigate(`/meeting/${meetingCode}`);
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

      <Card
        className="w-full max-w-lg rounded-2xl shadow-xl"
      >

        <div className="text-center mb-8">

          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="logo"
            className="h-16 mx-auto mb-4"
          />

          <Title level={2}>
            Secure Live Classroom
          </Title>

          <Text type="secondary">
            Verify your Meeting Code to join the live class.
          </Text>

        </div>

        <div className="space-y-5">

          <Input
            size="large"
            placeholder="Enter Meeting Code"
            value={meetingCode}
            onChange={(e) =>
              setMeetingCode(e.target.value.toUpperCase())
            }
          />

          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            className="bg-[#fb991d]"
            onClick={handleVerify}
          >
            Verify & Join Meeting
          </Button>

        </div>

      </Card>

    </div>
  );
};

export default StudentMeetingGate;