// 📄 src/pages/MeetingRoom.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import Cookies from "js-cookie";

import MeetingHeader from "../components/Meeting/MeetingHeader";
import ParticipantPanel from "../components/Meeting/ParticipantPanel";
import VideoGrid from "../components/Meeting/VideoGrid";
import MeetingControls from "../components/Meeting/MeetingControls";

import { useStudentAuth } from "../context/StudentAuthContext";
import socket from "../socket";

const MeetingRoom = () => {
  const { meetingCode } = useParams();
  const navigate = useNavigate();

  // 👥 States
  const [meetingData, setMeetingData] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // 🖥️ FIX: screen stream ab state me bhi track hota hai taaki
  // local preview (teacher ki apni screen ka thumbnail) render ho sake
  const [screenStream, setScreenStream] = useState(null);

  // 🔄 WebRTC Map References
  const peerConnections = useRef({});
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const videoSenders = useRef({});

  // 🔑 Role Engine
  const { student } = useStudentAuth();
  const adminCookie = Cookies.get("adminUser");
  const adminLocal = localStorage.getItem("adminUser");
  const adminData = adminCookie
    ? JSON.parse(adminCookie)
    : adminLocal
      ? JSON.parse(adminLocal)
      : null;

  const isAdmin =
    !!adminData && (adminData.role === "ADMIN" || adminData.role === "Teacher");

  let role = "Student";
  let userName = student?.name || `Student-${Math.floor(Math.random() * 100)}`;

  if (isAdmin) {
    role = "Teacher";
    userName = meetingData?.teacherName || adminData?.name || "Hardeep Singh";
  }

  useEffect(() => {
    setMeetingData({ meetingCode, teacherName: "Hardeep Singh" });
  }, [meetingCode]);

  // ==========================================
  // 🌐 CORE WEBRTC ENGINE (Handles Video/Audio Flow)
  // ==========================================
  const createPeerConnection = (targetSocketId) => {
    if (peerConnections.current[targetSocketId]) {
      return peerConnections.current[targetSocketId];
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // 🎯 2. Catch incoming tracks (Video & Audio stream for students)
    pc.ontrack = (event) => {
      console.log(`🟢 WebRTC Track Received from ${targetSocketId}`);
      if (event.streams && event.streams[0]) {
        setRemoteStreams((prev) => ({
          ...prev,
          [targetSocketId]: event.streams[0],
        }));
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("send-ice-candidate", {
          meetingCode,
          candidate: event.candidate,
          targetSocketId,
        });
      }
    };

    // Feed current local tracks immediately into this connection pipeline
    const currentStream = localStreamRef.current;
    if (currentStream) {
      currentStream.getTracks().forEach((track) => {
        const sender = pc.addTrack(track, currentStream);
        if (track.kind === "video") {
          videoSenders.current[targetSocketId] = sender;
        }
      });
    }

    peerConnections.current[targetSocketId] = pc;
    return pc;
  };

  // ==========================================
  // 🎥 INITIALIZE MEDIA DEVICES
  // ==========================================
  useEffect(() => {
    const initLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        localStreamRef.current = stream;
      } catch (error) {
        console.error("Camera block bypass triggered:", error);
        // Fallback dummy for multiple tabs on single hardware machine
        const emptyStream = new MediaStream();
        setLocalStream(emptyStream);
        localStreamRef.current = emptyStream;
      }
    };

    initLocalMedia();

    return () => {
      if (localStreamRef.current)
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      if (screenStreamRef.current)
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
      Object.values(peerConnections.current).forEach((pc) => pc.close());
    };
  }, []);

  // ==========================================
  // 🔌 4. SIGNALLING LIFECYCLE (Dono Taraf se Safe Handshake)
  // ==========================================
  useEffect(() => {
    if (!meetingData || !localStream) return;

    socket.emit("join-meeting", { meetingCode, userName, role });

    // Jab aap join karte ho, server batata hai ki pehle se kaun kaun baitha hai
    socket.on("get-existing-users", (users) => {
      users.forEach((user) => {
        if (role === "Student" && user.role === "Teacher") {
          createPeerConnection(user.socketId);
        }
      });
    });

    socket.on("participant-joined", async (data) => {
      setParticipants((prev) => {
        if (prev.find((p) => p.socketId === data.socketId)) return prev;
        return [...prev, data];
      });

      message.success(`${data.userName} joined.`);

      // Rule: Hamesha Teacher automatic call initiate karega incoming student ke liye
      if (role === "Teacher") {
        const pc = createPeerConnection(data.socketId);
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("send-offer", {
            meetingCode,
            offer,
            targetSocketId: data.socketId,
          });
        } catch (err) {
          console.error("Offer initiation structural error:", err);
        }
      }
    });

    socket.on("receive-offer", async ({ offer, senderSocketId }) => {
      const pc = createPeerConnection(senderSocketId);
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("send-answer", {
          meetingCode,
          answer,
          targetSocketId: senderSocketId,
        });
      } catch (err) {
        console.error("Answer negotiation crash:", err);
      }
    });

    socket.on("receive-answer", async ({ answer, senderSocketId }) => {
      const pc = peerConnections.current[senderSocketId];
      if (pc) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (err) {
          console.error("Remote description injection fault:", err);
        }
      }
    });

    socket.on(
      "receive-ice-candidate",
      async ({ candidate, senderSocketId }) => {
        const pc = peerConnections.current[senderSocketId];
        if (pc && candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error("ICE candidate binding failure:", err);
          }
        }
      },
    );

    socket.on("meeting-ended", () => {
      message.warning("The session has been ended by the teacher.");
      handleCleanupAndRedirect("/student/portal");
    });

    socket.on("participant-left", (data) => {
      setParticipants((prev) =>
        prev.filter((p) => p.socketId !== data.socketId),
      );
      setRemoteStreams((prev) => {
        const updated = { ...prev };
        delete updated[data.socketId];
        return updated;
      });
      if (peerConnections.current[data.socketId]) {
        peerConnections.current[data.socketId].close();
        delete peerConnections.current[data.socketId];
      }
      // 🔥 FIX: videoSenders map pehle kabhi clean nahi hoti thi.
      // Stale entry rehne se screen-share replaceTrack loop disconnect ho
      // chuke/reconnect hue socketId ko bhi target kar sakta tha.
      if (videoSenders.current[data.socketId]) {
        delete videoSenders.current[data.socketId];
      }
    });

    return () => {
      socket.emit("leave-meeting", { meetingCode, userName });
      socket.off("get-existing-users");
      socket.off("participant-joined");
      socket.off("participant-left");
      socket.off("receive-offer");
      socket.off("receive-answer");
      socket.off("receive-ice-candidate");
      socket.off("meeting-ended");
    };
  }, [meetingCode, meetingData, localStream]);

  // ==========================================
  // 🎛️ MEETING CONTROLS (Mute / Unmute / Screen Share)
  // ==========================================
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
        message.info(
          audioTrack.enabled ? "Microphone Active" : "Microphone Muted",
        );
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
        message.info(
          videoTrack.enabled ? "Camera Active" : "Camera Turned Off",
        );
      }
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenShare();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      screenStreamRef.current = stream;
      setScreenStream(stream); // 🔥 FIX: state update so local preview re-renders
      const screenTrack = stream.getVideoTracks()[0];

      // Hot-swap tracking pipelines dynamically across all participants
      for (const socketId in videoSenders.current) {
        if (videoSenders.current[socketId]) {
          await videoSenders.current[socketId].replaceTrack(screenTrack);
        }
      }
      setIsScreenSharing(true);
      screenTrack.onended = () => stopScreenShare();
      message.success("Screen sharing started.");
    } catch (error) {
      console.error("Screen Share error:", error);
    }
  };

  const stopScreenShare = async () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
      setScreenStream(null); // 🔥 FIX: clear preview state too
    }
    if (localStreamRef.current) {
      const cameraTrack = localStreamRef.current.getVideoTracks()[0];
      for (const socketId in videoSenders.current) {
        if (videoSenders.current[socketId] && cameraTrack) {
          await videoSenders.current[socketId].replaceTrack(cameraTrack);
        }
      }
    }
    setIsScreenSharing(false);
    message.info("Screen sharing stopped.");
  };

  const handleCleanupAndRedirect = (targetRoute) => {
    if (localStreamRef.current)
      localStreamRef.current.getTracks().forEach((t) => t.stop());
    if (screenStreamRef.current)
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    navigate(targetRoute);
  };

  const handleLeaveMeeting = () => {
    socket.emit("leave-meeting", { meetingCode, userName });
    if (role === "Teacher") {
      handleCleanupAndRedirect("/admin/meetings");
    } else {
      handleCleanupAndRedirect("/student/portal");
    }
  };

  return (
    <div className="p-6 bg-[#0f172a] text-white min-h-screen flex flex-col justify-between">
      <div>
        <MeetingHeader
          meetingCode={meetingCode}
          meetingStatus="LIVE"
          participantCount={participants.length + 1}
          onLeave={handleLeaveMeeting}
        />

        <div className="grid grid-cols-12 gap-5 mt-5 h-[calc(100vh-180px)]">
          <div className="col-span-12 lg:col-span-9 bg-[#1e293b] rounded-2xl p-4 flex items-center justify-center border border-slate-700/50 relative overflow-hidden">
            <VideoGrid
              participants={participants}
              localStream={localStream}
              remoteStreams={remoteStreams}
              isLocalVideoMuted={isVideoMuted}
              isScreenSharing={isScreenSharing}
              screenStream={screenStream}
            />
          </div>

          <div className="col-span-12 lg:col-span-3 bg-[#1e293b] rounded-2xl border border-slate-700/50 overflow-hidden">
            <ParticipantPanel
              participants={participants}
              localUser={{ userName, role, isAudioMuted, isVideoMuted }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <MeetingControls
          isAudioMuted={isAudioMuted}
          isVideoMuted={isVideoMuted}
          isScreenSharing={isScreenSharing}
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onToggleScreenShare={toggleScreenShare}
          onLeave={handleLeaveMeeting}
        />
      </div>
    </div>
  );
};

export default MeetingRoom;