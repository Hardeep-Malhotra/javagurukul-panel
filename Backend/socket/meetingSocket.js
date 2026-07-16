const setupMeetingSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User Connected : ${socket.id}`);

    // ==========================================
    // Join Meeting Room
    // ==========================================
    socket.on("join-meeting", ({ meetingCode, userName, role }) => {
      socket.join(meetingCode);

      // Save user info for disconnect event
      socket.data.meetingCode = meetingCode;
      socket.data.userName = userName;
      socket.data.role = role;

      console.log(
        `✅ ${userName} (${role}) joined room : ${meetingCode}`
      );

      // Notify everyone in room
      io.to(meetingCode).emit("participant-joined", {
        socketId: socket.id,
        userName,
        role,
        message: `${userName} joined the meeting.`,
      });

      // Debug Room Count
      const room = io.sockets.adapter.rooms.get(meetingCode);

      console.log(
        `👥 Participants in ${meetingCode}:`,
        room ? room.size : 0
      );
    });

    // ==========================================
    // Leave Meeting
    // ==========================================
    socket.on("leave-meeting", ({ meetingCode, userName }) => {
      socket.leave(meetingCode);

      console.log(
        `❌ ${userName} left room : ${meetingCode}`
      );

      io.to(meetingCode).emit("participant-left", {
        socketId: socket.id,
        userName,
        message: `${userName} left the meeting.`,
      });

      const room = io.sockets.adapter.rooms.get(meetingCode);

      console.log(
        `👥 Participants in ${meetingCode}:`,
        room ? room.size : 0
      );

      // Clear socket data
      socket.data.meetingCode = null;
      socket.data.userName = null;
      socket.data.role = null;
    });

    // ==========================================
    // Disconnect
    // ==========================================
    socket.on("disconnect", () => {
      const { meetingCode, userName } = socket.data;

      if (meetingCode && userName) {
        io.to(meetingCode).emit("participant-left", {
          socketId: socket.id,
          userName,
          message: `${userName} disconnected.`,
        });

        const room = io.sockets.adapter.rooms.get(meetingCode);

        console.log(
          `👥 Participants in ${meetingCode}:`,
          room ? room.size : 0
        );
      }

      console.log(`🔴 User Disconnected : ${socket.id}`);
    });

    // ==========================================
    // WebRTC Signaling Events
    // (Next Phase)
    // ==========================================
  });
};

module.exports = setupMeetingSocket;