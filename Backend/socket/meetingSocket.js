const setupMeetingSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User Connected : ${socket.id}`);

    // ==========================================
    // Join Meeting Room
    // ==========================================
    socket.on("join-meeting", ({ meetingCode, userName, role }) => {
      socket.join(meetingCode);

      console.log(
        `✅ ${userName} (${role}) joined room : ${meetingCode}`
      );

      // Notify everyone in the room
      io.to(meetingCode).emit("participant-joined", {
        socketId: socket.id,
        userName,
        role,
        message: `${userName} joined the meeting.`,
      });

      // Debug
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
    });

    // ==========================================
    // Disconnect
    // ==========================================
    socket.on("disconnect", () => {
      console.log(`🔴 User Disconnected : ${socket.id}`);
    });
  });
};

module.exports = setupMeetingSocket;