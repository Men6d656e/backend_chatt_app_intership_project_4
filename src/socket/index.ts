import Messages from "../models/message.js";
import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import config from "../config/index.js";

export const initializeSocketIO = (httpServer: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.WHITELIST_OPIGINS,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // users
  const onlineUsers = new Map();
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);
    // go online
    socket.on("go-online", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is now online with socket ID ${socket.id}}`);
      const allOnlineUsers = Array.from(onlineUsers.keys());
      socket.emit("online-users-list", allOnlineUsers);
      socket.broadcast.emit("user-status-change", { userId, isOnline: true });
    });
    // listen send message event
    socket.on("send-message", async (data) => {
      const { senderId, receiverId, text } = data;
      console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
      try {
        const message = await Messages.create({
          senderId,
          receiverId,
          text,
        });
        // Step 2: Populate the message with user data for the frontend
        const populatedMessage = await Messages.findById(message._id)
          .populate("senderId", "username")
          .populate("receiverId", "username");

        if (!populatedMessage) {
          // Handle error case where population fails
          throw new Error("Failed to populate message");
        }
        // Step 3: Get the socket IDs of the sender and receiver
        const senderSocketId = onlineUsers.get(senderId);
        const receiverSocketId = onlineUsers.get(receiverId);

        // Step 4: Emit the new message to the sender
        if (senderSocketId) {
          io.to(senderSocketId).emit("new-message-saved", populatedMessage);
        }
        // Step 5: Emit the new message to the receiver, if they are online
        if (receiverSocketId && receiverSocketId !== senderSocketId) {
          io.to(receiverSocketId).emit("new-message-saved", populatedMessage);
        }
      } catch (error) {
        console.error("Error saving message to database:", error);
        // Optionally, emit an error back to the sender
        socket.emit("message-error", "Failed to send message.");
      }
      const recipientSockedId = onlineUsers.get(receiverId);
      if (recipientSockedId) {
        io.to(recipientSockedId).emit("receive-message", {
          senderId,
          receiverId,
          text,
        });
      }
      socket.emit("message-sent-conformation", {
        senderId,
        receiverId,
        text,
      });
    });
    socket.on("disconnect", () => {
      const userId = [...onlineUsers.entries()].find(
        ([key, value]) => value === socket.id
      )?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected.`);
        // Broadcast to everyone that this user is now offline
        io.emit("user-status-change", { userId, isOnline: false });
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.IO server initialized.");
  return io;
};
