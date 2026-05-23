import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { logger } from "../utils/logger";

let io: Server;

export const initSocketServer = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust for production
    },
  });

  io.on("connection", (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });

    // Example: Join a room
    socket.on("joinRoom", (room: string) => {
      socket.join(room);
      logger.info(`Socket ${socket.id} joined room ${room}`);
    });
  });

  logger.info("Socket.IO server initialized");
  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

export const broadcastEvent = (room: string, event: string, data: any) => {
  getIo().to(room).emit(event, data);
};
