import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://gochat-1-vpu4.onrender.com/api"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { io, app, server };
