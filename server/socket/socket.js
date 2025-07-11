import { Server } from "socket.io";
import socketAuth from "../middleware/socketAuth.js";
import { updateAnswer, submitVote } from "./socketController.js";

export default (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on('join-room', (roomId, ack) => {
      try {
        socket.join(roomId);
        console.log(`[${new Date().toISOString()}] ${socket.id} joined room ${roomId}`);
        if (ack) ack({ status: 'ok', message: `Joined room ${roomId}` });
      } catch (err) {
        console.error('join-room error:', err);
        if (ack) ack({ status: 'error', message: 'Failed to join room' });
      }
    });

    socket.on('start-quiz', ({ roomId, question }, ack) => {
      try {
        io.to(roomId).emit('quiz-question', question);
        console.log(`[${new Date().toISOString()}] Quiz started in room ${roomId}`);
        if (ack) ack({ status: 'ok', message: 'Quiz started' });
      } catch (err) {
        console.error('start-quiz error:', err);
        if (ack) ack({ status: 'error', message: 'Failed to start quiz' });
      }
    });

    socket.on('submit-answer', ({ roomId, answer, student }, ack) => {
      try {
        io.to(roomId).emit('receive-answer', { student, answer });
        console.log(`[${new Date().toISOString()}] Answer submitted in room ${roomId} by ${student}`);
        if (ack) ack({ status: 'ok', message: 'Answer submitted' });
      } catch (err) {
        console.error('submit-answer error:', err);
        if (ack) ack({ status: 'error', message: 'Failed to submit answer' });
      }
    });
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      socket.emit("success", {msg: "Session Joined", status: "success"});
    }
  );

    socket.on('submit-answer', async({ data }) => {
        updateAnswer(data, socket);
    });

    socket.on('submit-vote', async(data)=> {
       submitVote(data, socket);
    })

    socket.on("send-message", ({ room, message }, ack) => {
      try {
        io.to(room).emit("receive-message", message);
        console.log(`[${new Date().toISOString()}] Message sent in room ${room}`);
        if (ack) ack({ status: 'ok', message: 'Message sent' });
      } catch (err) {
        console.error('send-message error:', err);
        if (ack) ack({ status: 'error', message: 'Failed to send message' });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
