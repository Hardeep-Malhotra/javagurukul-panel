const setupMeetingSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User Connected : ${socket.id}`);

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`🔴 User Disconnected : ${socket.id}`);
    });
  });
};

module.exports = setupMeetingSocket;