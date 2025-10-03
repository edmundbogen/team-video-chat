// Simple Signaling Server for WebRTC
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(__dirname));

// Store rooms
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room
    socket.on('join-room', (roomId, userName) => {
        socket.join(roomId);
        socket.userName = userName;
        socket.roomId = roomId;

        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket.id);

        // Notify others in the room
        socket.to(roomId).emit('user-joined', {
            userId: socket.id,
            userName: userName
        });

        // Send existing users to the new user
        const usersInRoom = Array.from(rooms.get(roomId)).filter(id => id !== socket.id);
        socket.emit('existing-users', usersInRoom);

        console.log(`${userName} joined room ${roomId}`);
    });

    // WebRTC signaling
    socket.on('offer', (data) => {
        socket.to(data.target).emit('offer', {
            offer: data.offer,
            sender: socket.id
        });
    });

    socket.on('answer', (data) => {
        socket.to(data.target).emit('answer', {
            answer: data.answer,
            sender: socket.id
        });
    });

    socket.on('ice-candidate', (data) => {
        socket.to(data.target).emit('ice-candidate', {
            candidate: data.candidate,
            sender: socket.id
        });
    });

    // Whiteboard data relay
    socket.on('whiteboard-data', (data) => {
        socket.to(socket.roomId).emit('whiteboard-data', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        if (socket.roomId && rooms.has(socket.roomId)) {
            rooms.get(socket.roomId).delete(socket.id);

            // Notify others in the room
            socket.to(socket.roomId).emit('user-left', {
                userId: socket.id,
                userName: socket.userName
            });

            // Clean up empty rooms
            if (rooms.get(socket.roomId).size === 0) {
                rooms.delete(socket.roomId);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Team Video Chat Server running on http://localhost:${PORT}`);
    console.log(`📹 Open the app in multiple browser windows to test`);
});
