import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, List, message } from "antd";

import socket from "../socket";

const { Title, Text } = Typography;

const MeetingRoom = () => {
  const { meetingCode } = useParams();

  const [participants, setParticipants] = useState([]);

  // Temporary user
  const userName = "Hardeep Singh";
  const role = "Teacher";

  useEffect(() => {
    // Join Room
    socket.emit("join-meeting", {
      meetingCode,
      userName,
      role,
    });

    // Someone Joined
    socket.on("participant-joined", (data) => {
      message.success(data.message);

      setParticipants((prev) => {
        const exists = prev.find((p) => p.socketId === data.socketId);

        if (exists) return prev;

        return [...prev, data];
      });
    });

    // Someone Left
    socket.on("participant-left", (data) => {
      message.info(data.message);

      setParticipants((prev) =>
        prev.filter((p) => p.socketId !== data.socketId)
      );
    });

    return () => {
      socket.emit("leave-meeting", {
        meetingCode,
        userName,
      });

      socket.off("participant-joined");
      socket.off("participant-left");
    };
  }, []);

  return (
    <div className="p-8">

      <Card>

        <Title level={3}>
          Live Meeting
        </Title>

        <Text strong>
          Meeting Code :
        </Text>

        <Text> {meetingCode}</Text>

        <br />
        <br />

        <Title level={5}>
          Participants ({participants.length})
        </Title>

        <List
          bordered
          dataSource={participants}
          renderItem={(participant) => (
            <List.Item>
              {participant.userName} ({participant.role})
            </List.Item>
          )}
        />

      </Card>

    </div>
  );
};

export default MeetingRoom;