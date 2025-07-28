import { Server as IOServer } from "socket.io";
import http from "http";
import { registerSocketHandlers } from "./handlers";

let io: IOServer;

const CORS_ORIGIN = process.env.CORS_ORIGIN;

export const initSocketServer = (server: http.Server) => {
  io = new IOServer(server, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    registerSocketHandlers(socket);
  });

  return io;
};

export const getIO = (): IOServer => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized. Call initSocketServer(server) first."
    );
  }
  return io;
};
