const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend URL
        // methods: ["GET", "POST"],
    },
});

const userSocketMap = {};

function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

// Handle Socket.IO events
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // Example: Handle a custom event
    // socket.on("message", (data) => {
    //     console.log(`Message received: ${data}`);
    //     // Broadcast the message to all connected clients
    //     socket.broadcast.emit("message", data);
    // });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
});

// Export app, server, and io
module.exports = { app, server, io,  getReceiverSocketId};
