// const setupMeetingSocket = (io) => {
//   io.on("connection", (socket) => {
//     console.log(`🟢 User Connected : ${socket.id}`);

//     // ==========================================
//     // Join Meeting Room
//     // ==========================================
//     socket.on("join-meeting", ({ meetingCode, userName, role }) => {
//       socket.join(meetingCode);

//       // Save user info for disconnect event
//       socket.data.meetingCode = meetingCode;
//       socket.data.userName = userName;
//       socket.data.role = role;

//       console.log(`✅ ${userName} (${role}) joined room : ${meetingCode}`);

//       // Notify everyone in room
//       socket.to(meetingCode).emit("participant-joined", {
//         socketId: socket.id,
//         userName,
//         role,
//         message: `${userName} joined the meeting.`,
//       });

//       // Debug Room Count
//       const room = io.sockets.adapter.rooms.get(meetingCode);

//       console.log(`👥 Participants in ${meetingCode}:`, room ? room.size : 0);
//     });

//     // ==========================================
//     // Leave Meeting
//     // ==========================================
//     socket.on("leave-meeting", ({ meetingCode, userName }) => {
//       socket.leave(meetingCode);

//       console.log(`❌ ${userName} left room : ${meetingCode}`);

//       io.to(meetingCode).emit("participant-left", {
//         socketId: socket.id,
//         userName,
//         message: `${userName} left the meeting.`,
//       });

//       const room = io.sockets.adapter.rooms.get(meetingCode);

//       console.log(`👥 Participants in ${meetingCode}:`, room ? room.size : 0);

//       // Clear socket data
//       socket.data.meetingCode = null;
//       socket.data.userName = null;
//       socket.data.role = null;
//     });

//     // ==========================================
//     // Disconnect
//     // ==========================================
//     socket.on("disconnect", () => {
//       const { meetingCode, userName } = socket.data;

//       if (meetingCode && userName) {
//         io.to(meetingCode).emit("participant-left", {
//           socketId: socket.id,
//           userName,
//           message: `${userName} disconnected.`,
//         });

//         const room = io.sockets.adapter.rooms.get(meetingCode);

//         console.log(`👥 Participants in ${meetingCode}:`, room ? room.size : 0);
//       }

//       console.log(`🔴 User Disconnected : ${socket.id}`);
//     });

//     // ==========================================
//     // WebRTC Signaling Events
//     // ==========================================

//     // Offer
//     socket.on("offer", ({ meetingCode, offer }) => {
//       socket.to(meetingCode).emit("offer", {
//         offer,
//         socketId: socket.id,
//       });
//     });

//     // Answer
//     socket.on("answer", ({ meetingCode, answer }) => {
//       socket.to(meetingCode).emit("answer", {
//         answer,
//         socketId: socket.id,
//       });
//     });

//     // ICE Candidate
//     socket.on("ice-candidate", ({ meetingCode, candidate }) => {
//       socket.to(meetingCode).emit("ice-candidate", {
//         candidate,
//         socketId: socket.id,
//       });
//     });
//   });
// };

// module.exports = setupMeetingSocket;


// 📄 backend/socket/meetingSocket.js
const setupMeetingSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User Connected : ${socket.id}`);

    // ==========================================
    // 🚪 Join Meeting Room
    // ==========================================
    socket.on("join-meeting", ({ meetingCode, userName, role }) => {
      socket.join(meetingCode);

      // Save user info for disconnect/leave events
      socket.data.meetingCode = meetingCode;
      socket.data.userName = userName;
      socket.data.role = role;

      console.log(`✅ ${userName} (${role}) joined room : ${meetingCode}`);

      // Notify everyone in the room that a new participant joined
      socket.to(meetingCode).emit("participant-joined", {
        socketId: socket.id,
        userName,
        role,
        message: `${userName} joined the meeting.`,
      });

      // Debug Room Count
      const room = io.sockets.adapter.rooms.get(meetingCode);
      console.log(`👥 Participants in ${meetingCode}:`, room ? room.size : 0);
    });

    // ==========================================
    // 🌐 WebRTC P2P Targeted Signaling Events
    // ==========================================

    // 🚀 1. Handle & Forward Offer (Directly to the Target Peer)
    socket.on("send-offer", ({ meetingCode, offer, targetSocketId }) => {
      console.log(`⚡ Forwarding Offer from [${socket.id}] to Target [${targetSocketId}]`);
      io.to(targetSocketId).emit("receive-offer", {
        offer,
        senderSocketId: socket.id,
      });
    });

    // 🚀 2. Handle & Forward Answer (Directly to the Target Peer)
    socket.on("send-answer", ({ meetingCode, answer, targetSocketId }) => {
      console.log(`⚡ Forwarding Answer from [${socket.id}] to Target [${targetSocketId}]`);
      io.to(targetSocketId).emit("receive-answer", {
        answer,
        senderSocketId: socket.id,
      });
    });

    // 🚀 3. Handle & Forward ICE Candidates (Directly to the Target Peer)
    socket.on("send-ice-candidate", ({ meetingCode, candidate, targetSocketId }) => {
      console.log(`🧊 Forwarding ICE Candidate from [${socket.id}] to Target [${targetSocketId}]`);
      io.to(targetSocketId).emit("receive-ice-candidate", {
        candidate,
        senderSocketId: socket.id,
      });
    });

    // ==========================================
    // ❌ Leave Meeting
    // ==========================================
    socket.on("leave-meeting", ({ meetingCode, userName }) => {
      socket.leave(meetingCode);
      console.log(`❌ ${userName} left room : ${meetingCode}`);

      io.to(meetingCode).emit("participant-left", {
        socketId: socket.id,
        userName,
        message: `${userName} left the meeting.`,
      });

      const room = io.sockets.adapter.rooms.get(meetingCode);
      console.log(`👥 Participants in ${meetingCode}:`, room ? room.size : 0);

      // Clear socket session data data safely
      socket.data.meetingCode = null;
      socket.data.userName = null;
      socket.data.role = null;
    });

    // ==========================================
    // 🔴 Disconnect
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
        console.log(`👥 Participants in ${meetingCode}:`, room ? room.size : 0);
      }

      console.log(`🔴 User Disconnected : ${socket.id}`);
    });
  });
};

module.exports = setupMeetingSocket;