// 📄 src/pages/MeetingRoom.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

import MeetingHeader from "../components/Meeting/MeetingHeader";
import ParticipantPanel from "../components/Meeting/ParticipantPanel";
import VideoGrid from "../components/Meeting/VideoGrid";
import MeetingControls from "../components/Meeting/MeetingControls";

import socket from "../socket";

const MeetingRoom = () => {
  const { meetingCode } = useParams();
  const navigate = useNavigate();

  // 👥 States
  const [participants, setParticipants] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  // 🔑 User Identity
  const userName = "Hardeep Singh";
  const role = "Teacher";

  // ==========================================
  // 🎥 1. WebRTC: Camera & Mic Init
  // ==========================================
  useEffect(() => {
    const initLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        message.error("Could not access camera/microphone. Check permissions!");
      }
    };

    initLocalMedia();

    // Clean up local media stream tracks when leaving room
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // ==========================================
  // 🔌 2. Socket Connection & Synchronization
  // ==========================================
  useEffect(() => {
    // Join Meeting Socket Sync
    socket.emit("join-meeting", {
      meetingCode,
      userName,
      role,
    });

    // Participant Joined Listener
    socket.on("participant-joined", (data) => {
      setParticipants((prev) => {
        const exists = prev.find((item) => item.socketId === data.socketId);
        if (exists) return prev;
        return [...prev, data];
      });
      message.success(`${data.userName} joined the classroom.`);
    });

    // Participant Left Listener
    socket.on("participant-left", (data) => {
      setParticipants((prev) =>
        prev.filter((item) => item.socketId !== data.socketId)
      );
    });

    // Clean up connections on unmount
    return () => {
      socket.emit("leave-meeting", {
        meetingCode,
        userName,
      });
      socket.off("participant-joined");
      socket.off("participant-left");
    };
  }, [meetingCode]);

  // ==========================================
  // 🎛️ 3. Media Controls Handlers
  // ==========================================
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
      }
    }
  };

  const handleLeaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop()); // Stop camera light instantly
    }
    socket.emit("leave-meeting", {
      meetingCode,
      userName,
    });
    navigate(-1); // Back to meeting management dashboard
  };

  return (
    <div className="p-6 bg-[#0f172a] text-white min-h-screen flex flex-col justify-between">
      <div>
        {/* Header Layer */}
        <MeetingHeader
          meetingCode={meetingCode}
          meetingStatus="LIVE"
          participantCount={participants.length + 1} // +1 including the teacher
          onLeave={handleLeaveMeeting}
        />

        {/* Main Interface Grid */}
        <div className="grid grid-cols-12 gap-5 mt-5 h-[calc(100vh-180px)]">
          {/* Video Feed Workspace */}
          <div className="col-span-12 lg:col-span-9 bg-[#1e293b] rounded-2xl p-4 flex items-center justify-center border border-slate-700/50 shadow-inner relative overflow-hidden">
            <VideoGrid 
              participants={participants} 
              localStream={localStream}
              isLocalVideoMuted={isVideoMuted}
            />
          </div>

          {/* Real-time Side Roster Panel */}
          <div className="col-span-12 lg:col-span-3 bg-[#1e293b] rounded-2xl border border-slate-700/50 shadow-md overflow-hidden">
            <ParticipantPanel 
              participants={participants}
              localUser={{ userName, role, isAudioMuted, isVideoMuted }}
            />
          </div>
        </div>
      </div>

      {/* Docked Action Controller Area */}
      <div className="mt-5">
        <MeetingControls
          isAudioMuted={isAudioMuted}
          isVideoMuted={isVideoMuted}
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onLeave={handleLeaveMeeting}
        />
      </div>
    </div>
  );
};

export default MeetingRoom;